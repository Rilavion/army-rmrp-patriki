window.VSRF_ROLES=(function(){
  let myRole=null;
  const listeners=[];

  function waitReady(timeoutMs){
    return new Promise(resolve=>{
      const deadline=Date.now()+(timeoutMs||5000);
      function check(){
        const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
        if(s&&s.ready){resolve(s);return true}
        return false;
      }
      if(check()) return;
      const t=setInterval(()=>{
        if(check()){clearInterval(t);return}
        if(Date.now()>deadline){clearInterval(t);resolve(window.VSRF_AUTH&&window.VSRF_AUTH.state||null)}
      },80);
      if(window.VSRF_AUTH&&window.VSRF_AUTH.onChange){
        window.VSRF_AUTH.onChange(st=>{if(st&&st.ready){clearInterval(t);resolve(st)}});
      }
    });
  }

  async function loadMyRole(){
    await waitReady(5000);
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!s||!s.user||!s.client){
      myRole=null;
      console.log("[VSRF_ROLES] Нет клиента/пользователя. auth.state =",s);
      emit();apply();return null;
    }
    console.log("[VSRF_ROLES] Загружаем роль для user_id =",s.user.id,"email =",s.user.email);
    try{
      const {data,error}=await s.client.from("user_roles").select("role,display_name").eq("user_id",s.user.id).maybeSingle();
      if(error){
        console.error("[VSRF_ROLES] Ошибка запроса:",error.message,error);
        if(error.message&&error.message.toLowerCase().includes("recursion")){
          console.error("[VSRF_ROLES] 🔴 БЕСКОНЕЧНАЯ РЕКУРСИЯ в RLS-политике. Выполни SUPABASE-APPS-FIX.sql в Supabase SQL Editor.");
        }
        myRole=null;
      }else{
        myRole=data?data.role:null;
        console.log("[VSRF_ROLES] ✓ Роль:",myRole||"(нет записи в user_roles)");
        const displayName=data?data.display_name:null;
        if(displayName) try{localStorage.setItem("vsrf-my-display-name",displayName)}catch(e){}
        if(!data){
          console.warn("[VSRF_ROLES] Записи в user_roles для этого user_id НЕТ. Выполни в SQL Editor:\ninsert into public.user_roles(user_id,role,display_name) values ('"+s.user.id+"','admin','Твоё Имя') on conflict(user_id) do update set role='admin';");
        }
      }
    }catch(e){
      console.error("[VSRF_ROLES] Исключение:",e.message);
      myRole=null;
    }
    emit();
    apply();
    return myRole;
  }

  function apply(){
    document.body.classList.toggle("vsrf-is-admin",myRole==="admin");
    document.body.classList.toggle("vsrf-is-ss",myRole==="ss");
    document.body.classList.toggle("vsrf-is-staff",myRole==="admin"||myRole==="ss");
  }

  function getMyRole(){return myRole}
  function isAdmin(){return myRole==="admin"}
  function isSS(){return myRole==="ss"}
  function isStaff(){return myRole==="admin"||myRole==="ss"}
  function onChange(fn){listeners.push(fn);fn(myRole);return()=>{const i=listeners.indexOf(fn);if(i>=0) listeners.splice(i,1)}}
  function emit(){listeners.forEach(fn=>{try{fn(myRole)}catch(e){}})}

  // ==== Управление ролями (только для админа) ====
  async function listAllRoles(){
    const s=window.VSRF_AUTH.state;
    if(!s.client) return [];
    const {data,error}=await s.client.from("user_roles").select("*").order("created_at",{ascending:false});
    if(error){console.warn("[VSRF_ROLES] list:",error.message);return []}
    return data||[];
  }

  async function setRole(userId,role,displayName){
    const s=window.VSRF_AUTH.state;
    if(!s.client) return {ok:false,error:"no client"};
    const {error}=await s.client.from("user_roles")
      .upsert({user_id:userId,role,display_name:displayName||null},{onConflict:"user_id"});
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  async function removeUser(userId){
    const s=window.VSRF_AUTH.state;
    if(!s.client) return {ok:false,error:"no client"};
    const {error}=await s.client.from("user_roles").delete().eq("user_id",userId);
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  // ==== Создание нового пользователя ====
  // Через обычный signUp — новому юзеру приходит confirm-email, потом админ ему проставляет роль.
  // Второй вариант — админ вручную знает user_id (из auth.users) и вызывает setRole.
  async function inviteAndSetRole(email,password,role,displayName){
    const s=window.VSRF_AUTH.state;
    if(!s.client) return {ok:false,error:"no client"};
    try{
      const {data,error}=await s.client.auth.signUp({email,password,options:{data:{display_name:displayName||""}}});
      if(error) return {ok:false,error:error.message};
      const uid=data&&data.user?data.user.id:null;
      if(!uid) return {ok:true,warning:"Пользователь создан, но user_id не получен (возможно требуется подтверждение email). Проставь роль вручную после его первого входа."};
      const r=await setRole(uid,role,displayName);
      if(!r.ok) return {ok:false,error:"Пользователь создан, но не удалось назначить роль: "+r.error};
      return {ok:true,user_id:uid};
    }catch(e){return {ok:false,error:e.message}}
  }

  document.addEventListener("DOMContentLoaded",()=>{
    if(window.VSRF_AUTH&&window.VSRF_AUTH.onChange){
      window.VSRF_AUTH.onChange(st=>{if(st&&st.ready) loadMyRole()});
    }
    setTimeout(loadMyRole,300);
  });

  return {loadMyRole,getMyRole,isAdmin,isSS,isStaff,onChange,
          listAllRoles,setRole,removeUser,inviteAndSetRole,apply};
})();
