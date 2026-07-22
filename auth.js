window.VSRF_AUTH=(function(){
  const state={client:null,user:null,ready:false,available:false};
  const listeners=[];

  function emit(){listeners.forEach(fn=>{try{fn(state)}catch(e){}})}
  function onChange(fn){listeners.push(fn);fn(state);return()=>{const i=listeners.indexOf(fn);if(i>=0) listeners.splice(i,1)}}

  async function init(){
    const cfg=window.SUPABASE_CONFIG;
    if(!cfg||!cfg.url||!cfg.anonKey||!window.supabase){
      state.available=false;state.ready=true;emit();
      wireLoginButtons();
      return;
    }
    try{
      state.client=window.supabase.createClient(cfg.url,cfg.anonKey);
      state.available=true;
      const {data}=await state.client.auth.getSession();
      state.user=data&&data.session?data.session.user:null;
      state.client.auth.onAuthStateChange((_ev,session)=>{
        state.user=session?session.user:null;emit();updateUI();
      });
      state.ready=true;emit();
    }catch(e){
      state.available=false;state.ready=true;emit();
    }
    wireLoginButtons();updateUI();
  }

  function wireLoginButtons(){
    document.querySelectorAll("[data-open-login]").forEach(b=>{
      b.addEventListener("click",e=>{e.preventDefault();openModal()});
    });
  }

  function updateUI(){
    const btns=document.querySelectorAll(".login-btn");
    btns.forEach(b=>{
      const label=b.querySelector("span");
      if(state.user){
        if(label) label.textContent="Выйти";
        b.setAttribute("data-logged","1");
      }else{
        if(label) label.textContent="Войти";
        b.removeAttribute("data-logged");
      }
    });
    document.querySelectorAll(".login-btn[data-logged]").forEach(b=>{
      b.onclick=async e=>{e.preventDefault();if(state.client){await state.client.auth.signOut()}};
    });
    document.querySelectorAll(".admin-only").forEach(el=>{
      el.style.display=state.user?"":"none";
    });
  }

  function openModal(){
    const m=document.getElementById("loginModal");
    if(!m){alert("Форма входа недоступна на этой странице.");return}
    const msg=m.querySelector(".form-msg");
    if(msg){msg.className="form-msg";msg.textContent=""}
    if(!state.available){
      if(msg){msg.className="form-msg info";msg.textContent="Авторизация временно недоступна. Настройте Supabase в js/config.js"}
    }
    m.classList.add("active");
  }
  function closeModal(){
    const m=document.getElementById("loginModal");
    if(m) m.classList.remove("active");
  }

  async function submitLogin(email,password){
    if(!state.available||!state.client) return {ok:false,error:"Авторизация недоступна"};
    try{
      const {data,error}=await state.client.auth.signInWithPassword({email,password});
      if(error) return {ok:false,error:error.message};
      state.user=data.user;emit();updateUI();
      return {ok:true};
    }catch(e){return {ok:false,error:e.message||"Ошибка входа"}}
  }

  document.addEventListener("DOMContentLoaded",()=>{
    init();
    const m=document.getElementById("loginModal");
    if(m){
      m.addEventListener("click",e=>{if(e.target===m) closeModal()});
      const close=m.querySelector(".modal-close");
      if(close) close.addEventListener("click",closeModal);
      const form=m.querySelector("form");
      if(form){
        form.addEventListener("submit",async e=>{
          e.preventDefault();
          const msg=m.querySelector(".form-msg");
          const email=form.email.value.trim();
          const password=form.password.value;
          if(!state.available){
            msg.className="form-msg info";
            msg.textContent="Авторизация временно недоступна. Настройте Supabase в js/config.js";
            return;
          }
          msg.className="form-msg info";msg.textContent="Проверка...";
          const r=await submitLogin(email,password);
          if(r.ok){msg.textContent="Успешный вход";setTimeout(closeModal,500)}
          else{msg.className="form-msg error";msg.textContent=r.error}
        });
      }
    }
  });

  return {onChange,openModal,closeModal,submitLogin,state};
})();
