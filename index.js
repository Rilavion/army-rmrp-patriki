require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Events } = require("discord.js");
const { createClient } = require("@supabase/supabase-js");
const { parseDiscordMessage } = require("./parser");

const REQUIRED = ["DISCORD_TOKEN","GUILD_ID","CHANNEL_INCOMING_ID","CHANNEL_RESULTS_ID","SUPABASE_URL","SUPABASE_SERVICE_ROLE"];
const missing = REQUIRED.filter(k=>!process.env[k]);
if(missing.length){
  console.error("[ENV] Не заданы переменные:", missing.join(", "));
  console.error("Скопируй .env.example в .env и заполни значения.");
  process.exit(1);
}

const {
  DISCORD_TOKEN, GUILD_ID, CHANNEL_INCOMING_ID, CHANNEL_RESULTS_ID,
  SUPABASE_URL, SUPABASE_SERVICE_ROLE,
  SITE_APPS_URL, BACKFILL_ON_START, BACKFILL_LIMIT
} = process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { params: { eventsPerSecond: 10 } }
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel]
});

function log(...a){ console.log("["+new Date().toISOString()+"]", ...a); }

function buildMessageLink(guildId, channelId, messageId){
  return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

function pickText(msg){
  const parts = [];
  if(msg.content && msg.content.trim()) parts.push(msg.content);
  if(msg.embeds && msg.embeds.length){
    for(const e of msg.embeds){
      if(e.title) parts.push("**"+e.title+"**");
      if(e.description) parts.push(e.description);
      if(Array.isArray(e.fields)){
        for(const f of e.fields){
          parts.push("**"+f.name+":**");
          parts.push(f.value);
        }
      }
    }
  }
  return parts.join("\n");
}

async function saveApplication(msg){
  const text = pickText(msg);
  if(!text || !text.trim()){
    log("SKIP: пустое сообщение", msg.id);
    return null;
  }

  const parsed = parseDiscordMessage(text);
  const fieldCount = Object.keys(parsed.fields || {}).length;
  if(fieldCount < 2){
    log("SKIP: не похоже на заявление (распознано полей:", fieldCount, ")", msg.id);
    return null;
  }

  const authorTag = msg.author ? (msg.author.tag || msg.author.username || "") : "";
  const authorAvatar = msg.author && msg.author.displayAvatarURL ? msg.author.displayAvatarURL({ size: 128, extension: "png" }) : null;

  const row = {
    source: "discord",
    external_id: msg.id,
    message_link: buildMessageLink(msg.guildId || GUILD_ID, msg.channelId, msg.id),
    app_type: parsed.app_type,
    fields: parsed.fields,
    raw_text: parsed.raw_text,
    submitter_name: parsed.submitter_name || null,
    submitter_discord: parsed.submitter_discord || authorTag || null,
    submitter_avatar: authorAvatar,
    status: "new"
  };

  const { data, error } = await supabase
    .from("applications")
    .upsert(row, { onConflict: "external_id" })
    .select()
    .single();

  if(error){
    log("ERR upsert", msg.id, error.message);
    return null;
  }
  log("SAVED", data.id, "|", data.app_type, "|", data.submitter_name || data.submitter_discord || "?");
  return data;
}

async function backfill(){
  const limit = Math.max(1, Math.min(100, parseInt(BACKFILL_LIMIT||"50",10)));
  log("BACKFILL: загружаю последние", limit, "сообщений из #incoming");
  try{
    const ch = await client.channels.fetch(CHANNEL_INCOMING_ID);
    if(!ch || !ch.isTextBased()){
      log("BACKFILL: канал не найден или не текстовый");
      return;
    }
    const messages = await ch.messages.fetch({ limit });
    const arr = Array.from(messages.values()).reverse();
    log("BACKFILL: получено", arr.length, "сообщений");
    for(const m of arr){
      try{ await saveApplication(m); }catch(e){ log("BACKFILL err", e.message); }
    }
    log("BACKFILL: готово");
  }catch(e){
    log("BACKFILL fail:", e.message);
  }
}

function statusLabel(status){
  if(status === "approved") return "✅ Одобрено";
  if(status === "rejected") return "❌ Отказано";
  if(status === "archived") return "🗄️ Архив";
  return status;
}

function buildResultText(row){
  const link = row.message_link || (SITE_APPS_URL || "");
  const who = row.responded_by_name || "СС";
  const status = statusLabel(row.status);
  const type = row.app_type || "Заявление";
  const submitter = row.submitter_name || row.submitter_discord || "неизвестно";

  const lines = [
    "📋 **Электронное заявление рассмотрено**",
    "",
    `• Тип: **${type}**`,
    `• Заявитель: **${submitter}**`,
    `• Ссылка: ${link}`,
    `• Рассмотрел: **${who}**`,
    `• Статус: **${status}**`
  ];
  if(row.status === "rejected" && row.reject_reason){
    lines.push(`• Причина отказа: ${row.reject_reason}`);
  }
  if(SITE_APPS_URL){
    lines.push("");
    lines.push(`Панель СС: ${SITE_APPS_URL}`);
  }
  return lines.join("\n");
}

async function sendResult(row){
  if(row.status === "archived"){
    log("RESULT skip: архив (по ТЗ ответ не шлём)", row.id);
    return;
  }
  if(row.status !== "approved" && row.status !== "rejected"){
    return;
  }
  try{
    const ch = await client.channels.fetch(CHANNEL_RESULTS_ID);
    if(!ch || !ch.isTextBased()){
      log("RESULT ERR: канал результатов не найден");
      return;
    }
    const text = buildResultText(row);
    const sent = await ch.send({ content: text, allowedMentions: { parse: [] } });
    log("RESULT sent", row.id, "→", sent.id);

    await supabase
      .from("applications")
      .update({ result_message_id: sent.id, result_sent_at: new Date().toISOString() })
      .eq("id", row.id);
  }catch(e){
    log("RESULT ERR:", e.message);
  }
}

function subscribeRealtime(){
  const channel = supabase.channel("apps-updates")
    .on("postgres_changes",
      { event: "UPDATE", schema: "public", table: "applications" },
      async (payload) => {
        const oldRow = payload.old || {};
        const newRow = payload.new || {};
        if(oldRow.status === newRow.status) return;
        if(newRow.result_message_id) return;
        log("REALTIME status change", newRow.id, oldRow.status, "→", newRow.status);
        await sendResult(newRow);
      })
    .subscribe((status)=>{
      log("REALTIME channel status:", status);
    });
  return channel;
}

client.once(Events.ClientReady, async (c) => {
  log("BOT READY as", c.user.tag);
  log("Guild:", GUILD_ID, "| Incoming:", CHANNEL_INCOMING_ID, "| Results:", CHANNEL_RESULTS_ID);

  subscribeRealtime();

  if(String(BACKFILL_ON_START).toLowerCase() === "true"){
    await backfill();
  }
});

client.on(Events.MessageCreate, async (msg) => {
  try{
    if(!msg.guildId || msg.guildId !== GUILD_ID) return;
    if(msg.channelId !== CHANNEL_INCOMING_ID) return;
    if(msg.author && msg.author.id === client.user.id) return;
    await saveApplication(msg);
  }catch(e){
    log("MSG handler err:", e.message);
  }
});

client.on(Events.Error, (e)=>log("CLIENT ERR:", e.message));
process.on("unhandledRejection", (e)=>log("UNHANDLED:", e && e.message ? e.message : e));

client.login(DISCORD_TOKEN).catch(e=>{
  log("LOGIN FAIL:", e.message);
  process.exit(1);
});
