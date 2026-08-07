window.VSRF_STATS=(function(){
  function pad(s,n,align){
    s=String(s==null?"":s);
    if(s.length>=n) return s;
    const pad=" ".repeat(n-s.length);
    return align==="right"?pad+s:s+pad;
  }
  function toClipboard(text){
    if(!text) return Promise.resolve({ok:false,error:"пусто"});
    if(navigator.clipboard&&navigator.clipboard.writeText){
      return navigator.clipboard.writeText(text).then(()=>({ok:true})).catch(e=>({ok:false,error:e.message}));
    }
    try{
      const ta=document.createElement("textarea");
      ta.value=text;ta.style.position="fixed";ta.style.left="-9999px";
      document.body.appendChild(ta);ta.select();
      const ok=document.execCommand("copy");
      document.body.removeChild(ta);
      return Promise.resolve({ok});
    }catch(e){ return Promise.resolve({ok:false,error:e.message}); }
  }
  function ruDT(d){try{return new Date(d).toLocaleString("ru-RU",{timeZone:"Europe/Moscow",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch(e){return String(d||"")}}
  function ruDate(d){try{return new Date(d).toLocaleDateString("ru-RU",{timeZone:"Europe/Moscow",day:"2-digit",month:"2-digit",year:"numeric"})}catch(e){return String(d||"")}}
  function nowStamp(){
    const d=new Date();
    return d.toLocaleString("ru-RU",{timeZone:"Europe/Moscow",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});
  }
  function pct(a,b){if(!b) return "0%"; return Math.round(a*100/b)+"%";}

  function buildDiscordText(sections){
    const parts=[];
    for(const s of sections){
      if(s.title) parts.push("**"+s.title+"**");
      if(s.subtitle) parts.push("_"+s.subtitle+"_");
      if(Array.isArray(s.rows)){
        const maxK=Math.max(...s.rows.map(r=>String(r[0]||"").length),8);
        const maxV=Math.max(...s.rows.map(r=>String(r[1]||"").length),4);
        const lines=["```"];
        for(const r of s.rows){
          lines.push(pad(r[0],maxK)+"  "+pad(r[1],maxV,"right"));
        }
        lines.push("```");
        parts.push(lines.join("\n"));
      }
      if(s.text) parts.push(s.text);
      parts.push("");
    }
    parts.push("_Сгенерировано: "+nowStamp()+" МСК · 1-я МСБр в/ч 12132_");
    return parts.join("\n").trim();
  }

  function buildMarkdown(sections){
    const parts=[];
    for(const s of sections){
      if(s.title) parts.push("## "+s.title);
      if(s.subtitle) parts.push("*"+s.subtitle+"*\n");
      if(Array.isArray(s.rows)){
        parts.push("| Показатель | Значение |");
        parts.push("|---|---:|");
        for(const r of s.rows) parts.push("| "+r[0]+" | "+r[1]+" |");
        parts.push("");
      }
      if(s.text) parts.push(s.text+"\n");
    }
    parts.push("");
    parts.push("---");
    parts.push("*Сгенерировано: "+nowStamp()+" МСК · 1-я МСБр в/ч 12132*");
    return parts.join("\n").trim();
  }

  async function copyPNG(node,filename,scale){
    if(!window.VSRF_PNG||!node) return {ok:false,error:"PNG модуль не готов"};
    try{
      const canvas=await window.VSRF_PNG.toCanvas(node,{scale:scale||2,backgroundColor:"#15241d"});
      if(!canvas) return {ok:false,error:"canvas пуст"};
      const res=await window.VSRF_PNG.copyToClipboard(canvas);
      return res;
    }catch(e){ return {ok:false,error:e.message}; }
  }
  async function downloadPNG(node,filename,scale){
    if(!window.VSRF_PNG||!node) return {ok:false,error:"PNG модуль не готов"};
    try{
      const canvas=await window.VSRF_PNG.toCanvas(node,{scale:scale||2,backgroundColor:"#15241d"});
      if(!canvas) return {ok:false,error:"canvas пуст"};
      window.VSRF_PNG.download(canvas,filename||"stats.png");
      return {ok:true};
    }catch(e){ return {ok:false,error:e.message}; }
  }

  function bindCopyButtons(cfg){
    const btnText=document.getElementById(cfg.textBtnId);
    const btnMd=document.getElementById(cfg.mdBtnId);
    const btnPng=document.getElementById(cfg.pngBtnId);
    const btnPngDl=cfg.pngDownloadBtnId?document.getElementById(cfg.pngDownloadBtnId):null;
    const msg=cfg.msgId?document.getElementById(cfg.msgId):null;
    function say(t,cls){
      if(!msg) return;
      msg.textContent=t;
      msg.className="stats-copy-msg "+(cls||"");
      setTimeout(()=>{if(msg.textContent===t){msg.textContent="";msg.className="stats-copy-msg"}},2500);
    }
    if(btnText) btnText.addEventListener("click",async()=>{
      const secs=cfg.getSections();
      const r=await toClipboard(buildDiscordText(secs));
      say(r.ok?"✓ Скопировано для Discord":"✗ Ошибка: "+(r.error||""),r.ok?"ok":"err");
    });
    if(btnMd) btnMd.addEventListener("click",async()=>{
      const secs=cfg.getSections();
      const r=await toClipboard(buildMarkdown(secs));
      say(r.ok?"✓ Скопировано в Markdown":"✗ Ошибка: "+(r.error||""),r.ok?"ok":"err");
    });
    if(btnPng) btnPng.addEventListener("click",async()=>{
      const node=cfg.getPngNode();
      say("⏳ Готовим PNG…","info");
      const r=await copyPNG(node,cfg.pngFilename,cfg.pngScale);
      say(r.ok?"✓ PNG в буфере":"✗ "+(r.error||"ошибка"),r.ok?"ok":"err");
    });
    if(btnPngDl) btnPngDl.addEventListener("click",async()=>{
      const node=cfg.getPngNode();
      say("⏳ Готовим PNG…","info");
      const r=await downloadPNG(node,cfg.pngFilename,cfg.pngScale);
      say(r.ok?"✓ Скачано":"✗ "+(r.error||"ошибка"),r.ok?"ok":"err");
    });
  }

  function parseDate(v){
    if(!v) return null;
    const d=new Date(v);
    return isNaN(d.getTime())?null:d;
  }
  function inRange(dt,from,to){
    if(!dt) return false;
    const d=dt instanceof Date?dt:new Date(dt);
    if(from && d<from) return false;
    if(to){
      const toEnd=new Date(to.getTime()); toEnd.setHours(23,59,59,999);
      if(d>toEnd) return false;
    }
    return true;
  }
  function groupCount(list,keyFn){
    const m={};
    for(const x of list){
      const k=keyFn(x);
      if(k==null||k==="") continue;
      m[k]=(m[k]||0)+1;
    }
    return m;
  }
  function topN(mapObj,n){
    return Object.entries(mapObj).sort((a,b)=>b[1]-a[1]).slice(0,n||10);
  }

  return { toClipboard, buildDiscordText, buildMarkdown, copyPNG, downloadPNG, bindCopyButtons, ruDT, ruDate, nowStamp, pct, pad, parseDate, inRange, groupCount, topN };
})();
