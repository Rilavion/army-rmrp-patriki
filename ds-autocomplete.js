window.VSRF_DSAC=(function(){
  let DS_LIST=null;
  let loading=null;

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c])}

  async function load(force){
    if(DS_LIST && !force) return DS_LIST;
    if(loading) return loading;
    loading=(async()=>{
      const c=window.VSRF_AUTH&&window.VSRF_AUTH.state&&window.VSRF_AUTH.state.client;
      if(!c){ loading=null; return []; }
      try{
        const {data,error}=await c.from("ds_members").select("parsed_fio,parsed_static,parsed_dept,discord_id,raw_nick,display_name").eq("active",true).limit(2000);
        if(error){ console.warn("[dsac] load:",error.message); loading=null; return []; }
        const seen=new Set();
        DS_LIST=(data||[]).filter(m=>{
          const fio=(m.parsed_fio||m.display_name||m.raw_nick||"").trim();
          if(!fio) return false;
          const k=fio+"|"+(m.parsed_static||"");
          if(seen.has(k)) return false; seen.add(k); return true;
        }).map(m=>({
          fio:(m.parsed_fio||m.display_name||m.raw_nick||"").trim(),
          static:m.parsed_static||"",
          did:m.discord_id||"",
          position:m.parsed_dept||""
        }));
        console.log("[dsac] loaded",DS_LIST.length);
        return DS_LIST;
      }catch(e){ console.warn("[dsac]:",e.message); DS_LIST=[]; return []; }
      finally { loading=null; }
    })();
    return loading;
  }

  function formatStatic(s){
    if(window.VSRF_FMT&&window.VSRF_FMT.formatStatic) return window.VSRF_FMT.formatStatic(s);
    const d=String(s||"").replace(/\D/g,"");
    if(d.length===6) return d.slice(0,3)+"-"+d.slice(3);
    return s;
  }

  function ensureDropdown(input){
    const parent=input.parentElement;
    if(!parent) return null;
    if(getComputedStyle(parent).position==="static") parent.style.position="relative";
    let dd=parent.querySelector(".vsrf-dsac-dd");
    if(!dd){
      dd=document.createElement("div");
      dd.className="vsrf-dsac-dd cr-dropdown";
      dd.style.display="none";
      parent.appendChild(dd);
    }
    return dd;
  }

  function bind(inputSel, targets){
    const input=typeof inputSel==="string"?document.querySelector(inputSel):inputSel;
    if(!input || input.dataset.dsacBound==="1") return;
    input.dataset.dsacBound="1";
    input.setAttribute("autocomplete","off");
    const dd=ensureDropdown(input);
    if(!dd) return;

    function resolveT(sel){
      if(!sel) return null;
      if(typeof sel==="string") return document.querySelector(sel);
      return sel;
    }

    async function render(q){
      q=(q||"").trim();
      if(q.length<2){ dd.style.display="none"; return; }
      const list=await load();
      const qLow=q.toLowerCase();
      const digits=q.replace(/\D/g,"");
      const matches=list.filter(m=>{
        const fioLow=(m.fio||"").toLowerCase();
        const statNorm=(m.static||"").replace(/\D/g,"");
        return fioLow.includes(qLow) || (digits && digits.length>=2 && statNorm.includes(digits));
      }).slice(0,10);
      if(!matches.length){
        dd.innerHTML='<div class="cr-dd-empty">Ничего не найдено</div>';
        dd.style.display=""; return;
      }
      dd.innerHTML=matches.map(m=>{
        const posPart=m.position?`<span class="cr-dd-pos">${esc(m.position)}</span>`:"";
        const statPart=m.static?`<span class="cr-dd-stat">${esc(m.static)}</span>`:"";
        return `<div class="cr-dd-item" data-fio="${esc(m.fio)}" data-static="${esc(m.static)}" data-did="${esc(m.did)}" data-pos="${esc(m.position)}">
          <div class="cr-dd-fio">${esc(m.fio)}</div>
          <div class="cr-dd-meta">${statPart}${posPart}</div>
        </div>`;
      }).join("");
      dd.style.display="";
      dd.querySelectorAll(".cr-dd-item").forEach(el=>el.addEventListener("mousedown",e=>{
        e.preventDefault();
        input.value=el.dataset.fio;
        input.dispatchEvent(new Event("input",{bubbles:true}));
        input.dispatchEvent(new Event("change",{bubbles:true}));
        const sT=resolveT(targets.stat);
        if(sT && el.dataset.static){ sT.value=formatStatic(el.dataset.static); sT.dispatchEvent(new Event("input",{bubbles:true})); sT.dispatchEvent(new Event("change",{bubbles:true})); }
        const dT=resolveT(targets.did);
        if(dT && el.dataset.did){ dT.value=el.dataset.did; dT.dispatchEvent(new Event("input",{bubbles:true})); dT.dispatchEvent(new Event("change",{bubbles:true})); }
        const pT=resolveT(targets.pos);
        if(pT && el.dataset.pos && !pT.value){ pT.value=el.dataset.pos; pT.dispatchEvent(new Event("input",{bubbles:true})); pT.dispatchEvent(new Event("change",{bubbles:true})); }
        dd.style.display="none";
      }));
    }
    input.addEventListener("input",e=>render(e.target.value));
    input.addEventListener("focus",e=>{ if(e.target.value.trim().length>=2) render(e.target.value); });
    input.addEventListener("blur",()=>setTimeout(()=>dd.style.display="none",200));
    input.addEventListener("keydown",e=>{ if(e.key==="Escape") dd.style.display="none"; });
    load();
  }

  function bindAll(){
    document.querySelectorAll("[data-dsac]").forEach(el=>{
      if(el.dataset.dsacBound==="1") return;
      const stat=el.getAttribute("data-dsac-stat")||null;
      const did=el.getAttribute("data-dsac-did")||null;
      const pos=el.getAttribute("data-dsac-pos")||null;
      bind(el,{stat,did,pos});
    });

    const rules=[
      { fioSel:'input[name="submitter_fio"]', stat:'[name="submitter_static"]', did:'[name="submitter_discord_id"]', pos:'[name="submitter_position"]' },
      { fioSel:'input[name="target_fio"]',    stat:'[name="target_static"]',    did:'[name="target_discord_id"]',    pos:'[name="target_position"]' }
    ];
    for(const r of rules){
      document.querySelectorAll(r.fioSel).forEach(inp=>{
        if(inp.dataset.dsacBound==="1") return;
        const form=inp.closest("form")||document;
        const targets={
          stat: r.stat?form.querySelector(r.stat):null,
          did:  r.did?form.querySelector(r.did):null,
          pos:  r.pos?form.querySelector(r.pos):null
        };
        bind(inp,targets);
      });
    }
  }

  const mo=new MutationObserver(muts=>{
    let need=false;
    for(const m of muts){
      for(const n of m.addedNodes){
        if(n.nodeType===1){ need=true; break; }
      }
      if(need) break;
    }
    if(need) bindAll();
  });

  function startObserver(){
    try{
      mo.observe(document.body,{childList:true,subtree:true});
    }catch(e){}
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",()=>{ bindAll(); startObserver(); setTimeout(bindAll,500); setTimeout(bindAll,2000); });
  } else {
    bindAll(); startObserver(); setTimeout(bindAll,500); setTimeout(bindAll,2000);
  }

  return { load, bind, bindAll };
})();
