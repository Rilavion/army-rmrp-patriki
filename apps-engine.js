window.VSRF_APPS=(function(){

  function waitReady(){return new Promise(resolve=>{
    const deadline=Date.now()+5000;
    function ck(){const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;if(s&&s.ready){resolve(s);return true}return false}
    if(ck()) return;
    const t=setInterval(()=>{if(ck()){clearInterval(t)}else if(Date.now()>deadline){clearInterval(t);resolve(null)}},80);
  })}

  async function fetchByStatus(status,limit){
    await waitReady();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!s||!s.client) return [];
    try{
      let q=s.client.from("applications").select("*").order("created_at",{ascending:false}).limit(limit||100);
      if(status&&status!=="all") q=q.eq("status",status);
      const {data,error}=await q;
      if(error){console.warn("[VSRF_APPS]",error.message);return []}
      return data||[];
    }catch(e){console.warn("[VSRF_APPS]",e.message);return []}
  }

  async function counts(){
    await waitReady();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!s||!s.client) return {new:0,approved:0,rejected:0,archived:0};
    const out={new:0,approved:0,rejected:0,archived:0};
    try{
      // Один запрос на все статусы через .head+count
      const stats=["new","approved","rejected","archived"];
      await Promise.all(stats.map(async st=>{
        const {count}=await s.client.from("applications").select("id",{count:"exact",head:true}).eq("status",st);
        if(count!=null) out[st]=count;
      }));
    }catch(e){}
    return out;
  }

  async function updateStatus(id,status,reason){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!s||!s.client||!s.user) return {ok:false,error:"Не авторизован"};
    const displayName=(function(){
      try{return localStorage.getItem("vsrf-my-display-name")||s.user.email||"admin"}catch(e){return s.user.email||"admin"}
    })();
    const patch={
      status,
      responded_by:s.user.id,
      responded_by_name:displayName,
      responded_at:new Date().toISOString()
    };
    if(status==="rejected") patch.reject_reason=reason||"";
    if(status==="archived") patch.reject_reason=null;
    try{
      const {data,error}=await s.client.from("applications").update(patch).eq("id",id).select().maybeSingle();
      if(error) return {ok:false,error:error.message};
      return {ok:true,row:data};
    }catch(e){return {ok:false,error:e.message}}
  }

  async function createManual(payload){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!s||!s.client) return {ok:false,error:"Не авторизован"};
    try{
      const row={
        source:payload.source||"manual",
        external_id:payload.external_id||null,
        message_link:payload.message_link||null,
        app_type:payload.app_type||"",
        fields:payload.fields||{},
        raw_text:payload.raw_text||null,
        submitter_name:payload.submitter_name||"",
        submitter_discord:payload.submitter_discord||"",
        status:"new"
      };
      const {data,error}=await s.client.from("applications").insert(row).select().maybeSingle();
      if(error) return {ok:false,error:error.message};
      return {ok:true,row:data};
    }catch(e){return {ok:false,error:e.message}}
  }

  // ==== Парсер сообщения бота — вытаскивает поля из discord-сообщения ====
  function parseDiscordMessage(text){
    // Ищем пары **Ключ:** значение
    const lines=String(text||"").replace(/\r/g,"").split("\n");
    const fields={};
    let currentKey=null;
    let appType=null;
    const buffer=[];
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      // Разделитель ```
      if(/^`{3,}/.test(line.trim())) continue;
      const m=line.match(/^\s*\*\*([^*]+?):\*\*\s*(.*)$/);
      if(m){
        if(currentKey){fields[currentKey]=buffer.join("\n").trim();buffer.length=0}
        currentKey=m[1].trim();
        if(m[2]) buffer.push(m[2]);
      }else if(currentKey){
        buffer.push(line);
      }
    }
    if(currentKey) fields[currentKey]=buffer.join("\n").trim();

    // "Выберите тип:" → app_type
    for(const key of Object.keys(fields)){
      if(/выберите\s*тип/i.test(key)){appType=fields[key];delete fields[key]}
    }
    // Пытаемся найти submitter
    let submitterName="",submitterDiscord="";
    for(const key of Object.keys(fields)){
      if(/имя\s*фамилия/i.test(key)&&!submitterName) submitterName=fields[key];
      if(/дискорд/i.test(key)&&!submitterDiscord) submitterDiscord=fields[key];
    }
    return {app_type:appType||"Заявление",fields,submitter_name:submitterName,submitter_discord:submitterDiscord,raw_text:text};
  }

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function niceDate(d){
    try{const dt=new Date(d);return dt.toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}
    catch(e){return String(d||"")}
  }

  return {fetchByStatus,counts,updateStatus,createManual,parseDiscordMessage,esc,niceDate};
})();
