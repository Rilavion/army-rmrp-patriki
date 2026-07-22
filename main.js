(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem("vsrf-theme");
  if(saved==="light") root.setAttribute("data-theme","light");

  document.addEventListener("DOMContentLoaded",init);

  function init(){
    setupThemeToggle();
    setupBurger();
    setupReveal();
    setupBackground();
    setupTransitions();
    setupActiveNav();
    setupFab();
    setupSearch();
  }

  function setupThemeToggle(){
    const btn=document.getElementById("themeToggle");
    if(!btn) return;
    btn.addEventListener("click",()=>{
      const cur=root.getAttribute("data-theme")==="light"?"light":"dark";
      const next=cur==="light"?"dark":"light";
      if(next==="light") root.setAttribute("data-theme","light");
      else root.removeAttribute("data-theme");
      localStorage.setItem("vsrf-theme",next);
    });
  }

  function setupBurger(){
    const b=document.getElementById("burger");
    const nav=document.getElementById("mainNav");
    if(!b||!nav) return;
    b.addEventListener("click",()=>{
      b.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click",()=>{
        b.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  function setupReveal(){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -60px 0px"});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>io.observe(el));
  }

  function setupTransitions(){
    const ov=document.getElementById("overlay");
    if(!ov) return;
    document.querySelectorAll("a[data-transition]").forEach(a=>{
      a.addEventListener("click",e=>{
        const href=a.getAttribute("href");
        if(!href||href.startsWith("#")||href.startsWith("http")) return;
        e.preventDefault();
        ov.classList.add("active");
        setTimeout(()=>{location.href=href},380);
      });
    });
    window.addEventListener("pageshow",()=>ov.classList.remove("active"));
  }

  function setupActiveNav(){
    const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
    document.querySelectorAll(".nav a[data-page]").forEach(a=>{
      if(a.dataset.page===p||(p===""&&a.dataset.page==="index.html")) a.classList.add("active");
    });
  }

  function setupFab(){
    const stack=document.getElementById("fabStack");
    if(!stack) return;
    const upBtn=document.getElementById("fabUp");
    const printBtn=document.getElementById("fabPrint");
    if(upBtn){
      upBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
    }
    if(printBtn){
      printBtn.addEventListener("click",()=>window.print());
    }
    const upd=()=>{
      if(window.scrollY>500) stack.classList.add("visible");
      else stack.classList.remove("visible");
    };
    window.addEventListener("scroll",upd,{passive:true});
    upd();
  }

  function setupSearch(){
    const modal=document.getElementById("searchModal");
    if(!modal) return;
    const input=modal.querySelector(".search-input");
    const results=modal.querySelector(".search-results");
    const openers=document.querySelectorAll("[data-open-search]");
    const closer=modal.querySelector(".search-close-kbd");

    const DATASET=[
      {group:"Страницы",title:"Главная",hint:"Общая информация о в/ч",href:"index.html",kw:"главная home"},
      {group:"Страницы",title:"Уставы",hint:"Каталог документов",href:"ustav.html",kw:"устав документы"},
      {group:"Страницы",title:"Новости",hint:"Оперативная сводка",href:"news.html",kw:"новости"},
      {group:"Страницы",title:"Автопарк",hint:"Техника бригады",href:"autopark.html",kw:"автопарк техника"},
      {group:"Страницы",title:"Карта",hint:"Схема территории",href:"map.html",kw:"карта"},
      {group:"Уставы",title:"Устав внутренней службы",hint:"Основной устав в/ч",href:"ustav.html#doc/ustav-vnutrenney-sluzhby",kw:"внутренняя служба"},
      {group:"Уставы",title:"Строевой устав",hint:"Строевая подготовка",href:"ustav.html#doc/stroevoy-ustav",kw:"строевой"},
      {group:"Уставы",title:"Устав караульной и гарнизонной служб",hint:"Караул и гарнизон",href:"ustav.html#doc/karaulnaya-i-garnizonnaya",kw:"караул гарнизон"},
      {group:"Уставы",title:"Дисциплинарный устав",hint:"Воинская дисциплина",href:"ustav.html#doc/disciplinarnyy-ustav",kw:"дисциплина"},
      {group:"Уставы",title:"Устав военной полиции",hint:"Военная полиция",href:"ustav.html#doc/ustav-voennoy-politsii",kw:"полиция ВП"}
    ];
    if(window.VSRF_USTAV_TOC){
      window.VSRF_USTAV_TOC.forEach(t=>DATASET.push({group:"Разделы устава",title:t.label,hint:"Устав внутренней службы",href:"ustav.html#doc/ustav-vnutrenney-sluzhby|"+t.id,kw:t.label}));
    }

    const iconFor=g=>({
      "Страницы":`<svg viewBox="0 0 24 24"><path d="M3 3h18v18H3zm2 4v12h14V7z"/></svg>`,
      "Уставы":`<svg viewBox="0 0 24 24"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-1 15H7v-2h10zm0-4H7v-2h10zm0-4H7V7h10z"/></svg>`,
      "Разделы устава":`<svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>`
    }[g]||`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`);

    let selectedIdx=0;let visible=[];

    function render(q){
      q=(q||"").trim().toLowerCase();
      const list=q?DATASET.filter(d=>(d.title+" "+d.hint+" "+d.kw).toLowerCase().includes(q)):DATASET;
      visible=list;selectedIdx=0;
      if(!list.length){
        results.innerHTML=`<div class="search-empty">Ничего не найдено по запросу «${q}»</div>`;
        return;
      }
      const groups={};
      list.forEach(d=>{(groups[d.group]=groups[d.group]||[]).push(d)});
      let idx=0;
      results.innerHTML=Object.keys(groups).map(g=>
        `<div class="search-group">${g}</div>`+
        groups[g].map(d=>`<div class="search-result" data-idx="${idx++}" data-href="${d.href}">
          <div class="search-result-icon">${iconFor(g)}</div>
          <div class="search-result-body">
            <div class="search-result-title">${d.title}</div>
            <div class="search-result-hint">${d.hint}</div>
          </div>
          <div class="search-result-arrow">↵</div>
        </div>`).join("")
      ).join("");
      highlight();
    }

    function highlight(){
      results.querySelectorAll(".search-result").forEach(r=>{
        if(+r.dataset.idx===selectedIdx){r.classList.add("active");r.scrollIntoView({block:"nearest"})}
        else r.classList.remove("active");
      });
    }

    function open(){modal.classList.add("active");setTimeout(()=>{input.focus();input.select()},50);render("")}
    function close(){modal.classList.remove("active");input.value=""}
    function go(href){
      close();
      if(href.includes("|")){
        const [page,anchor]=href.split("|");
        const cur=location.pathname.split("/").pop()||"index.html";
        if(page.split("#")[0]===cur){
          location.hash=page.split("#")[1];
          setTimeout(()=>{const e=document.getElementById(anchor);if(e) e.scrollIntoView({behavior:"smooth"})},400);
        }else{
          sessionStorage.setItem("vsrf-scroll-to",anchor);
          location.href=page;
        }
      }else{
        location.href=href;
      }
    }

    openers.forEach(b=>b.addEventListener("click",e=>{e.preventDefault();open()}));
    if(closer) closer.addEventListener("click",close);
    modal.addEventListener("click",e=>{if(e.target===modal) close()});
    input.addEventListener("input",()=>render(input.value));
    results.addEventListener("click",e=>{
      const r=e.target.closest(".search-result");
      if(r) go(r.dataset.href);
    });
    document.addEventListener("keydown",e=>{
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();open();return}
      if(!modal.classList.contains("active")) return;
      if(e.key==="Escape") close();
      else if(e.key==="ArrowDown"){e.preventDefault();if(selectedIdx<visible.length-1) selectedIdx++;highlight()}
      else if(e.key==="ArrowUp"){e.preventDefault();if(selectedIdx>0) selectedIdx--;highlight()}
      else if(e.key==="Enter"){
        e.preventDefault();
        const r=results.querySelector(`.search-result[data-idx="${selectedIdx}"]`);
        if(r) go(r.dataset.href);
      }
    });

    const pending=sessionStorage.getItem("vsrf-scroll-to");
    if(pending){
      sessionStorage.removeItem("vsrf-scroll-to");
      setTimeout(()=>{const e=document.getElementById(pending);if(e) e.scrollIntoView({behavior:"smooth"})},600);
    }
  }

  function setupBackground(){
    const c=document.getElementById("bgCanvas");
    if(!c) return;
    const ctx=c.getContext("2d");
    let W=0,H=0,parts=[],raf;
    const N=Math.min(70,Math.max(30,Math.floor(window.innerWidth/24)));

    function resize(){
      W=c.width=window.innerWidth*devicePixelRatio;
      H=c.height=window.innerHeight*devicePixelRatio;
      c.style.width=window.innerWidth+"px";
      c.style.height=window.innerHeight+"px";
    }
    function rand(a,b){return a+Math.random()*(b-a)}
    function build(){
      parts=[];
      for(let i=0;i<N;i++){
        parts.push({
          x:rand(0,W),y:rand(0,H),
          vx:rand(-.15,.15)*devicePixelRatio,
          vy:rand(-.15,.15)*devicePixelRatio,
          r:rand(.8,2.4)*devicePixelRatio,
          a:rand(.15,.55)
        });
      }
    }
    function getColor(){
      const light=root.getAttribute("data-theme")==="light";
      return light?"61,90,73":"205,168,90";
    }
    function drawGrid(){
      const light=root.getAttribute("data-theme")==="light";
      const step=80*devicePixelRatio;
      ctx.strokeStyle=light?"rgba(61,90,73,.06)":"rgba(205,168,90,.045)";
      ctx.lineWidth=1;
      for(let x=0;x<W;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
      for(let y=0;y<H;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
      ctx.strokeStyle=light?"rgba(61,90,73,.11)":"rgba(205,168,90,.08)";
      for(let x=0;x<W;x+=step*4){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
      for(let y=0;y<H;y+=step*4){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
    }
    function tick(){
      ctx.clearRect(0,0,W,H);
      drawGrid();
      const color=getColor();
      for(let i=0;i<parts.length;i++){
        const p=parts[i];
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0) p.x=W;if(p.x>W) p.x=0;
        if(p.y<0) p.y=H;if(p.y>H) p.y=0;
        for(let j=i+1;j<parts.length;j++){
          const q=parts[j];
          const dx=p.x-q.x,dy=p.y-q.y;
          const d2=dx*dx+dy*dy;
          const max=140*devicePixelRatio;
          if(d2<max*max){
            const a=(1-Math.sqrt(d2)/max)*.18;
            ctx.strokeStyle=`rgba(${color},${a})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle=`rgba(${color},${p.a})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      raf=requestAnimationFrame(tick);
    }
    resize();build();tick();
    let rt;
    window.addEventListener("resize",()=>{
      clearTimeout(rt);
      rt=setTimeout(()=>{resize();build()},200);
    });
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden){cancelAnimationFrame(raf)}
      else{tick()}
    });
  }
})();
