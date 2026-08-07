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

  async function withVisibleNode(node, fn){
    if(!node) return await fn(node);
    const prev={
      position:node.style.position, left:node.style.left, top:node.style.top,
      opacity:node.style.opacity, zIndex:node.style.zIndex,
      pointerEvents:node.style.pointerEvents, visibility:node.style.visibility
    };
    node.style.position="fixed";
    node.style.left="0px";
    node.style.top="0px";
    node.style.opacity="0.01";
    node.style.zIndex="-1";
    node.style.pointerEvents="none";
    node.style.visibility="visible";
    await new Promise(r=>setTimeout(r,50));
    try{
      return await fn(node);
    } finally {
      node.style.position=prev.position||"";
      node.style.left=prev.left||"";
      node.style.top=prev.top||"";
      node.style.opacity=prev.opacity||"";
      node.style.zIndex=prev.zIndex||"";
      node.style.pointerEvents=prev.pointerEvents||"";
      node.style.visibility=prev.visibility||"";
    }
  }

  const PNG_STYLE_OVERRIDE=`
    .stats-png-canvas,.stats-png-canvas *{color:#f5ecd6 !important;font-family:'Inter',Arial,sans-serif !important}
    .stats-png-canvas{background:#15241d !important;border:2px solid #cda85a !important}
    .stats-png-canvas .stats-png-title{color:#f0d89b !important;font-family:'Cormorant Garamond',Georgia,serif !important}
    .stats-png-canvas .stats-png-sub,.stats-png-canvas .stats-png-foot{color:#c8bea4 !important}
    .stats-png-canvas .stats-block-title{color:#cda85a !important}
    .stats-png-canvas .stats-card{background:#0f1e17 !important;border:1px solid rgba(205,168,90,.35) !important}
    .stats-png-canvas .stats-card-label{color:#a8a08a !important}
    .stats-png-canvas .stats-card-value{color:#f0d89b !important;font-family:'Cormorant Garamond',Georgia,serif !important}
    .stats-png-canvas .stats-card.ok .stats-card-value{color:#7dd97d !important}
    .stats-png-canvas .stats-card.err .stats-card-value{color:#e97a7a !important}
    .stats-png-canvas .stats-card.pend .stats-card-value{color:#e6b800 !important}
    .stats-png-canvas .stats-card.info .stats-card-value{color:#5a8fcd !important}
    .stats-png-canvas .stats-block{background:#0f1e17 !important;border:1px solid rgba(205,168,90,.25) !important}
    .stats-png-canvas .stats-bar-label{color:#f5ecd6 !important}
    .stats-png-canvas .stats-bar-val{color:#f0d89b !important}
    .stats-png-canvas .stats-bar-track{background:#0a1410 !important}
    .stats-png-canvas .stats-bar-fill{background:linear-gradient(90deg,#cda85a,#f0d89b) !important}
    .stats-png-canvas .stats-bar-fill.ok{background:linear-gradient(90deg,#5aa653,#7dd97d) !important}
    .stats-png-canvas .stats-bar-fill.err{background:linear-gradient(90deg,#c95555,#e97a7a) !important}
    .stats-png-canvas .stats-bar-fill.pend{background:linear-gradient(90deg,#b89a30,#e6b800) !important}
    .stats-png-canvas .stats-bar-fill.info{background:linear-gradient(90deg,#3a6a9a,#5a8fcd) !important}
    .stats-png-canvas .stats-table th{background:rgba(205,168,90,.15) !important;color:#cda85a !important;border-bottom:1px solid rgba(205,168,90,.3) !important}
    .stats-png-canvas .stats-table td{color:#f5ecd6 !important;border-bottom:1px solid rgba(205,168,90,.12) !important}
    .stats-png-canvas .rd-daily-stack{background:#0a1410 !important}
    .stats-png-canvas .rd-daily-success{background:linear-gradient(180deg,#7dd97d,#5aa653) !important}
    .stats-png-canvas .rd-daily-fail{background:linear-gradient(180deg,#e97a7a,#c95555) !important}
    .stats-png-canvas .rd-daily-lbl{color:#a8a08a !important}
    .stats-png-canvas .rd-daily-val{color:#f0d89b !important}
  `;

  function pngOpts(scale){
    return {
      scale:scale||2,
      backgroundColor:"#15241d",
      onclone:function(cn,doc){
        try{
          const style=doc.createElement("style");
          style.textContent=PNG_STYLE_OVERRIDE;
          doc.head.appendChild(style);
        }catch(e){}
      }
    };
  }

  async function copyPNG(node,filename,scale){
    if(!window.VSRF_PNG||!node) return {ok:false,error:"PNG модуль не готов"};
    if(!navigator.clipboard||!window.ClipboardItem) return {ok:false,error:"буфер обмена недоступен в этом браузере"};
    try{
      return await withVisibleNode(node, async(n)=>{
        return await window.VSRF_PNG.copyToClipboard(n,pngOpts(scale));
      });
    }catch(e){ return {ok:false,error:e.message||String(e)}; }
  }
  async function downloadPNG(node,filename,scale){
    if(!window.VSRF_PNG||!node) return {ok:false,error:"PNG модуль не готов"};
    try{
      return await withVisibleNode(node, async(n)=>{
        return await window.VSRF_PNG.download(n,filename||"stats.png",pngOpts(scale));
      });
    }catch(e){ return {ok:false,error:e.message||String(e)}; }
  }

  function bindCopyButtons(cfg){
    const btnText=document.getElementById(cfg.textBtnId);
    const btnMd=document.getElementById(cfg.mdBtnId);
    const btnPng=document.getElementById(cfg.pngBtnId);
    const btnPngDl=cfg.pngDownloadBtnId?document.getElementById(cfg.pngDownloadBtnId):null;
    const msg=cfg.msgId?document.getElementById(cfg.msgId):null;
    function say(t,cls){
      if(cls==="err") console.warn("[VSRF_STATS]",t);
      if(!msg) return;
      msg.textContent=t;
      msg.className="stats-copy-msg "+(cls||"");
      const hideAfter=cls==="err"?7000:2500;
      setTimeout(()=>{if(msg.textContent===t){msg.textContent="";msg.className="stats-copy-msg"}},hideAfter);
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
