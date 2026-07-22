window.VSRF_TRAIN=(function(){
  const DEMO_CATS=[
    {id:"kmb",name:"КМБ · Курс молодого бойца",color:"#8fd97a",parent:null,sort:1},
    {id:"kmb-basic",name:"Основы",color:"#8fd97a",parent:"kmb",sort:1},
    {id:"kmb-service",name:"Служба",color:"#8fd97a",parent:"kmb",sort:2},
    {id:"va",name:"ВА · Военная академия",color:"#7ac3f0",parent:null,sort:2},
    {id:"tactics",name:"Тактическая подготовка",color:"#e8b56a",parent:null,sort:3},
    {id:"comm",name:"Связь и радиообмен",color:"#c99af7",parent:null,sort:4}
  ];

  const DEMO_LESSONS=[];

  function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

  function extractFormEmbed(url){
    if(!url) return null;
    url=url.trim();
    if(url.includes("/forms.gle/")||url.includes("/forms/d/e/")){
      let embedUrl=url;
      if(url.includes("/viewform")) embedUrl=url.replace("/viewform","/viewform?embedded=true");
      else if(!url.includes("?embedded=true")) embedUrl=url+(url.includes("?")?"&":"?")+"embedded=true";
      return embedUrl;
    }
    return url;
  }

  async function loadCats(){
    const local=readLocalCats();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        const {data,error}=await s.client.from("train_categories").select("*").order("sort");
        if(error) throw error;
        if(data&&data.length) return data;
      }catch(e){}
    }
    return local.length?local:DEMO_CATS.slice();
  }
  async function loadLessons(){
    const local=readLocalLessons();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        const {data,error}=await s.client.from("train_lessons").select("*").order("sort");
        if(error) throw error;
        if(data&&data.length) return data;
      }catch(e){}
    }
    return local.length?local:DEMO_LESSONS.slice();
  }

  function readLocalCats(){try{return JSON.parse(localStorage.getItem("vsrf-train-cats")||"[]")}catch(e){return []}}
  function writeLocalCats(list){localStorage.setItem("vsrf-train-cats",JSON.stringify(list))}
  function readLocalLessons(){try{return JSON.parse(localStorage.getItem("vsrf-train-lessons")||"[]")}catch(e){return []}}
  function writeLocalLessons(list){localStorage.setItem("vsrf-train-lessons",JSON.stringify(list))}

  async function saveCat(cat){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{const {error}=await s.client.from("train_categories").upsert(cat,{onConflict:"id"});if(error) throw error;return {ok:true,remote:true}}
      catch(e){return {ok:false,error:e.message}}
    }
    const list=readLocalCats();
    const i=list.findIndex(x=>x.id===cat.id);
    if(i>=0) list[i]=cat;else list.push(cat);
    writeLocalCats(list);
    return {ok:true,remote:false};
  }
  async function removeCat(id){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        await s.client.from("train_lessons").delete().eq("category",id);
        await s.client.from("train_categories").delete().eq("parent",id);
        await s.client.from("train_categories").delete().eq("id",id);
        return {ok:true,remote:true};
      }catch(e){return {ok:false,error:e.message}}
    }
    let cats=readLocalCats().filter(c=>c.id!==id&&c.parent!==id);
    writeLocalCats(cats);
    let lessons=readLocalLessons().filter(l=>l.category!==id);
    writeLocalLessons(lessons);
    return {ok:true,remote:false};
  }
  async function saveLesson(lesson){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{const {error}=await s.client.from("train_lessons").upsert(lesson,{onConflict:"id"});if(error) throw error;return {ok:true,remote:true}}
      catch(e){return {ok:false,error:e.message}}
    }
    const list=readLocalLessons();
    const i=list.findIndex(x=>x.id===lesson.id);
    if(i>=0) list[i]=lesson;else list.push(lesson);
    writeLocalLessons(list);
    return {ok:true,remote:false};
  }
  async function removeLesson(id){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{await s.client.from("train_lessons").delete().eq("id",id);return {ok:true,remote:true}}
      catch(e){return {ok:false,error:e.message}}
    }
    writeLocalLessons(readLocalLessons().filter(l=>l.id!==id));
    return {ok:true,remote:false};
  }

  function uid(prefix){return (prefix||"id")+"_"+Math.random().toString(36).slice(2,9)}

  return {DEMO_CATS,DEMO_LESSONS,loadCats,loadLessons,saveCat,removeCat,saveLesson,removeLesson,esc,extractFormEmbed,uid};
})();
