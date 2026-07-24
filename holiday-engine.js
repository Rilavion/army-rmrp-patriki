window.VSRF_HOLIDAY=(function(){
  const PRESETS={
    none:{label:"Обычная",cls:"",banner:"",color:"#cda85a",icon:"—"},
    general:{label:"Общий праздник",cls:"holiday-general",color:"#f0d89b",icon:"✦",banner:"ПРАЗДНИЧНЫЙ ДЕНЬ"},
    victory:{label:"9 Мая · День Победы",cls:"holiday-victory",color:"#c94b4b",icon:"★",banner:"9 МАЯ · ДЕНЬ ПОБЕДЫ"},
    defender:{label:"23 Февраля · День защитника",cls:"holiday-defender",color:"#4b9c62",icon:"⚔",banner:"23 ФЕВРАЛЯ · ДЕНЬ ЗАЩИТНИКА ОТЕЧЕСТВА"},
    russia_day:{label:"12 Июня · День России",cls:"holiday-russia",color:"#4b6dc9",icon:"◈",banner:"12 ИЮНЯ · ДЕНЬ РОССИИ"},
    tanker:{label:"День танкиста",cls:"holiday-tanker",color:"#7d8a4a",icon:"◈",banner:"ДЕНЬ ТАНКИСТА"},
    new_year:{label:"Новый год",cls:"holiday-newyear",color:"#e8b56a",icon:"❆",banner:"С НОВЫМ ГОДОМ!"},
    unit_day:{label:"День части",cls:"holiday-unit",color:"#c78a2a",icon:"⚜",banner:"ДЕНЬ ВОИНСКОЙ ЧАСТИ"}
  };

  function readCfg(){
    try{return JSON.parse(localStorage.getItem("vsrf-holiday")||"null")||{preset:"none",customBanner:"",showBanner:true}}
    catch(e){return {preset:"none",customBanner:"",showBanner:true}}
  }
  function writeCfg(cfg){try{localStorage.setItem("vsrf-holiday",JSON.stringify(cfg))}catch(e){}}

  let bannerEl=null;
  let welcomeShown=false;

  function apply(){
    const cfg=readCfg();
    const preset=PRESETS[cfg.preset]||PRESETS.none;
    document.body.classList.remove(...Object.values(PRESETS).map(p=>p.cls).filter(Boolean));
    if(preset.cls) document.body.classList.add(preset.cls);
    renderBanner(cfg,preset);
    return cfg;
  }

  function renderBanner(cfg,preset){
    const active=cfg.preset!=="none"&&cfg.showBanner;
    const text=(cfg.customBanner&&cfg.customBanner.trim())||preset.banner;
    if(!active||!text){
      if(bannerEl){bannerEl.remove();bannerEl=null}
      return;
    }
    if(!bannerEl){
      bannerEl=document.createElement("div");
      bannerEl.className="holiday-banner";
      bannerEl.innerHTML='<div class="holiday-banner-inner"><span class="holiday-banner-icon"></span><span class="holiday-banner-text"></span><button class="holiday-banner-close" title="Скрыть до конца сессии">✕</button></div>';
      document.body.appendChild(bannerEl);
      bannerEl.querySelector(".holiday-banner-close").addEventListener("click",()=>{
        sessionStorage.setItem("vsrf-holiday-hidden","1");
        bannerEl.classList.remove("visible");
        setTimeout(()=>{if(bannerEl){bannerEl.remove();bannerEl=null}},400);
      });
    }
    bannerEl.querySelector(".holiday-banner-icon").textContent=preset.icon;
    bannerEl.querySelector(".holiday-banner-text").textContent=text;
    bannerEl.style.setProperty("--holiday-color",preset.color);
    if(sessionStorage.getItem("vsrf-holiday-hidden")!=="1") requestAnimationFrame(()=>bannerEl.classList.add("visible"));
  }

  function maybeShowWelcome(){
    if(welcomeShown) return;
    welcomeShown=true;
    const cfg=readCfg();
    if(cfg.preset==="none") return;
    const preset=PRESETS[cfg.preset];if(!preset) return;
    const key="vsrf-holiday-welcome-"+cfg.preset+"-"+(new Date().toISOString().slice(0,10));
    if(sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key,"1");
    const text=(cfg.customBanner&&cfg.customBanner.trim())||preset.banner;
    if(!text) return;
    const overlay=document.createElement("div");
    overlay.className="holiday-welcome";
    overlay.innerHTML=`<div class="holiday-welcome-card">
      <div class="holiday-welcome-icon">${preset.icon}</div>
      <div class="holiday-welcome-label">Сегодня</div>
      <div class="holiday-welcome-text"></div>
      <button class="holiday-welcome-btn">Продолжить</button>
    </div>`;
    overlay.style.setProperty("--holiday-color",preset.color);
    overlay.querySelector(".holiday-welcome-text").textContent=text;
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.classList.add("visible"));
    const close=()=>{overlay.classList.remove("visible");setTimeout(()=>overlay.remove(),500)};
    overlay.querySelector(".holiday-welcome-btn").addEventListener("click",close);
    overlay.addEventListener("click",e=>{if(e.target===overlay) close()});
    setTimeout(close,7000);
  }

  function setPreset(id){
    const cfg=readCfg();cfg.preset=id;
    sessionStorage.removeItem("vsrf-holiday-hidden");
    Object.keys(sessionStorage).forEach(k=>{if(k.indexOf("vsrf-holiday-welcome-")===0) sessionStorage.removeItem(k)});
    writeCfg(cfg);apply();
  }
  function setBanner(text){
    const cfg=readCfg();cfg.customBanner=text||"";
    sessionStorage.removeItem("vsrf-holiday-hidden");
    writeCfg(cfg);apply();
  }
  function toggleBanner(v){
    const cfg=readCfg();cfg.showBanner=!!v;
    sessionStorage.removeItem("vsrf-holiday-hidden");
    writeCfg(cfg);apply();
  }

  return {PRESETS,readCfg,writeCfg,apply,setPreset,setBanner,toggleBanner,maybeShowWelcome};
})();

document.addEventListener("DOMContentLoaded",function(){
  window.VSRF_HOLIDAY.apply();
  setTimeout(()=>window.VSRF_HOLIDAY.maybeShowWelcome(),600);
});
