window.VSRF_LK=(function(){
  function waitReady(){
    return new Promise(resolve=>{
      const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
      if(!s||s.ready) return resolve();
      const off=window.VSRF_AUTH.onChange(st=>{if(st.ready){off&&off();resolve()}});
      setTimeout(()=>resolve(),1500);
    });
  }

  async function count(table){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!(s&&s.available&&s.client)) return null;
    try{
      const {count:c,error}=await s.client.from(table).select("*",{count:"exact",head:true});
      if(error) throw error;
      return c||0;
    }catch(e){return null}
  }

  async function stats(){
    await waitReady();
    const [news,vehicles,ustavy,tCats,tLessons,comp]=await Promise.all([
      count("news"),count("vehicles"),count("ustavy"),
      count("train_categories"),count("train_lessons"),count("composition")
    ]);
    return {news,vehicles,ustavy,tCats,tLessons,comp};
  }

  async function recent(){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!(s&&s.available&&s.client)) return [];
    const activity=[];
    try{
      const {data:n}=await s.client.from("news").select("id,title,updated_at,date").order("updated_at",{ascending:false}).limit(5);
      (n||[]).forEach(x=>activity.push({type:"news",title:x.title,at:x.updated_at||x.date,icon:"📰",href:"news.html#news-"+x.id}));
    }catch(e){}
    try{
      const {data:v}=await s.client.from("vehicles").select("id,title,created_at").order("created_at",{ascending:false}).limit(5);
      (v||[]).forEach(x=>activity.push({type:"vehicle",title:x.title,at:x.created_at,icon:"🚙",href:"autopark.html"}));
    }catch(e){}
    try{
      const {data:u}=await s.client.from("ustavy").select("slug,title,updated_at").order("updated_at",{ascending:false}).limit(5);
      (u||[]).forEach(x=>activity.push({type:"ustav",title:x.title,at:x.updated_at,icon:"📖",href:"ustav.html#doc/"+x.slug}));
    }catch(e){}
    try{
      const {data:l}=await s.client.from("train_lessons").select("id,title,created_at").order("created_at",{ascending:false}).limit(5);
      (l||[]).forEach(x=>activity.push({type:"lesson",title:x.title,at:x.created_at,icon:"🎓",href:"training.html#l-"+x.id}));
    }catch(e){}
    activity.sort((a,b)=>new Date(b.at||0)-new Date(a.at||0));
    return activity.slice(0,15);
  }

  async function updatePassword(newPassword){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!(s&&s.available&&s.client)) return {ok:false,error:"Supabase недоступен"};
    try{
      const {error}=await s.client.auth.updateUser({password:newPassword});
      if(error) throw error;
      return {ok:true};
    }catch(e){return {ok:false,error:e.message}}
  }

  async function updateProfile(data){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(!(s&&s.available&&s.client)) return {ok:false,error:"Supabase недоступен"};
    try{
      const {error}=await s.client.auth.updateUser({data:data});
      if(error) throw error;
      return {ok:true};
    }catch(e){return {ok:false,error:e.message}}
  }

  return {stats,recent,updatePassword,updateProfile,waitReady};
})();
