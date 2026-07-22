(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem("vsrf-theme");
  if(saved==="light") root.setAttribute("data-theme","light");

  document.addEventListener("DOMContentLoaded",init);

  function init(){
    setupHeader();
    setupThemeToggle();
    setupBurger();
    setupReveal();
    setupProgress();
    setupBackground();
    setupTransitions();
    setupActiveNav();
  }

  function setupHeader(){
    const brand=document.getElementById("goHome");
    if(brand){
      brand.addEventListener("click",e=>{
        if(brand.tagName!=="A"){e.preventDefault();location.href="index.html"}
      });
    }
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
      document.body.style.transition="background .6s ease,color .6s ease";
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

  function setupProgress(){
    const bar=document.getElementById("progressBar");
    if(!bar) return;
    const upd=()=>{
      const h=document.documentElement.scrollHeight-window.innerHeight;
      const s=window.scrollY;
      bar.style.width=h>0?Math.min((s/h)*100,100)+"%":"0";
    };
    window.addEventListener("scroll",upd,{passive:true});
    upd();
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

  function setupBackground(){
    const c=document.getElementById("bgCanvas");
    if(!c) return;
    const ctx=c.getContext("2d");
    let W=0,H=0,parts=[],raf,mouseX=0,mouseY=0;
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
      return light?"138,106,31":"205,168,90";
    }
    function drawGrid(){
      const light=root.getAttribute("data-theme")==="light";
      const step=80*devicePixelRatio;
      ctx.strokeStyle=light?"rgba(138,106,31,.05)":"rgba(205,168,90,.045)";
      ctx.lineWidth=1;
      for(let x=0;x<W;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
      for(let y=0;y<H;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
      ctx.strokeStyle=light?"rgba(138,106,31,.09)":"rgba(205,168,90,.08)";
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
