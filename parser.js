function stripFormatting(s){
  return String(s||"")
    .replace(/\*\*\*(.+?)\*\*\*/g,"$1")
    .replace(/\*\*(.+?)\*\*/g,"$1")
    .replace(/__(.+?)__/g,"$1")
    .replace(/\+\+(.+?)\+\+/g,"$1")
    .replace(/~~(.+?)~~/g,"$1")
    .replace(/`([^`]+)`/g,"$1")
    .replace(/\*(.+?)\*/g,"$1")
    .trim();
}

function parseDiscordMessage(text){
  const raw=String(text||"").replace(/\r/g,"");
  const lines=raw.split("\n");
  const fields={};
  const order=[];
  let currentKey=null;
  let buffer=[];
  const keyRe=/^\s*\*\*(.+?):?\*\*\s*:?\s*$/;
  const inlineRe=/^\s*\*\*(.+?):?\*\*\s*:?\s*(.+)$/;

  function commit(){
    if(currentKey){
      const val=stripFormatting(buffer.join("\n")).trim();
      if(!/^вчера|^сегодня|^\d{1,2}[.:/]\d{1,2}/i.test(currentKey.trim())){
        fields[currentKey]=val;
        order.push(currentKey);
      }
      buffer=[];
    }
  }
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(/^`{3,}/.test(line.trim())) continue;
    if(!line.trim()) continue;
    let m=line.match(keyRe);
    if(m){
      commit();
      currentKey=stripFormatting(m[1]).replace(/:\s*$/,"").trim();
      continue;
    }
    m=line.match(inlineRe);
    if(m){
      commit();
      currentKey=stripFormatting(m[1]).replace(/:\s*$/,"").trim();
      buffer.push(m[2]);
      continue;
    }
    if(currentKey) buffer.push(line);
  }
  commit();

  let appType=null;
  for(const key of Object.keys(fields)){
    if(/выберите\s*тип|^\s*тип\s*$/i.test(key)){appType=fields[key];delete fields[key]}
  }
  let submitterName="",submitterDiscord="";
  for(const key of Object.keys(fields)){
    if(/имя\s*фамилия|фио|персонаж/i.test(key)&&!submitterName) submitterName=fields[key];
    if(/дискорд|discord/i.test(key)&&!submitterDiscord) submitterDiscord=fields[key];
  }
  return {
    app_type:appType||"Заявление",
    fields,
    submitter_name:submitterName,
    submitter_discord:submitterDiscord,
    raw_text:text
  };
}

module.exports = { stripFormatting, parseDiscordMessage };
