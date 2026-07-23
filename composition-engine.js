window.VSRF_COMP=(function(){
  const RANKS=[
    {key:"gen_maj",label:"Ген-Майор",short:"Ген-М",tier:1},
    {key:"gen_lt",label:"Ген-Лейтенант",short:"Ген-Л",tier:1},
    {key:"col",label:"Полковник",short:"Полк",tier:2},
    {key:"lt_col",label:"Подполковник",short:"Подпол",tier:3},
    {key:"maj",label:"Майор",short:"Май",tier:4},
    {key:"capt",label:"Капитан",short:"Кап",tier:5},
    {key:"lt",label:"Лейтенант",short:"Лт",tier:6}
  ];

  const HQ_SLOTS=[
    {key:"cmd_brigade",label:"Командир бригады",badge:"Ген-Майор",tier:1},
    {key:"first_deputy",label:"Первый заместитель",badge:"Полковник",tier:2},
    {key:"chief_staff",label:"Начальник штаба",badge:"Полковник",tier:2},
    {key:"deputy_vp_vk",label:"Зам. по ВП и ВК",badge:"Полковник",tier:2},
    {key:"deputy_sso_roio",label:"Зам. по ССО и РОиО",badge:"Полковник",tier:2},
    {key:"deputy_mch",label:"Зам. по МЧ",badge:"Полковник",tier:2},
    {key:"assistant",label:"Помощник ком. бригады",badge:"Подполковник",tier:3}
  ];

  const SUB_PRESETS={
    vp:{color:"#c94b4b",icon:"🛡"},
    vk:{color:"#4b6dc9",icon:"📋"},
    sso:{color:"#2f7a52",icon:"⚔"},
    roio:{color:"#c78a2a",icon:"🎯"},
    mch:{color:"#a34a8e",icon:"⚕"},
    default:{color:"#7a8a4a",icon:"★"}
  };

  const DEFAULT_STATE={
    hq:{
      cmd_brigade:{name:"Ян Милонов",code:"376-939",tag:"ком. бриг",photo:""},
      first_deputy:{name:"Эдвард Милонов",code:"617-798",tag:"первый зам",photo:""},
      chief_staff:{name:"Николай Фирсов",code:"571-179",tag:"нач. штаба",photo:""},
      deputy_vp_vk:{name:"Александр Милонов",code:"227-368",tag:"кур. ВП и ВК",photo:""},
      deputy_sso_roio:{name:"",code:"",tag:"кур. ССО и РОиО",photo:""},
      deputy_mch:{name:"",code:"",tag:"кур. МЧ",photo:""},
      assistant:{name:"Иридий Милонов",code:"753-294",tag:"почти полкан",photo:""}
    },
    subs:[
      {id:"vp",name:"Военная Полиция",short:"ВП",color:"#c94b4b",icon:"🛡",members:[
        {rank:"lt_col",name:"Анна Милонова",code:"395-957",role:"Комендант гарнизона",photo:""},
        {rank:"maj",name:"Дмитрий Милонов",code:"487-898",role:"Ком. батальона ВП",photo:""},
        {rank:"maj",name:"Максим Милонов",code:"877-506",role:"Зам. ком. батальона ВП",photo:""}
      ]},
      {id:"vk",name:"Военный Комиссариат",short:"ВК",color:"#4b6dc9",icon:"📋",members:[
        {rank:"lt_col",name:"Евгений Милонов 54",code:"737-054",role:"Военный комиссар",photo:""},
        {rank:"maj",name:"Марина Милонова",code:"705-377",role:"Зам. ВК",photo:""},
        {rank:"maj",name:"Алик Милонов",code:"301-420",role:"Нач. призыва",photo:""},
        {rank:"maj",name:"Алексей Милонов",code:"826-970",role:"Нач. кадров",photo:""}
      ]},
      {id:"sso",name:"Силы Специальных Операций",short:"ССО",color:"#2f7a52",icon:"⚔",members:[
        {rank:"lt_col",name:"Владислав Милонов",code:"982-671",role:"Ком. ССО · Швед-71й",photo:""},
        {rank:"maj",name:"Кира Милонова",code:"895-214",role:"Зам. ком. ССО · Цыган-14й",photo:""},
        {rank:"maj",name:"Егор Милонов",code:"812-635",role:"Зам. ком. ССО · Яга-35й",photo:""}
      ]},
      {id:"roio",name:"Рота Охраны и Обеспечения",short:"РОиО",color:"#c78a2a",icon:"🎯",members:[
        {rank:"lt_col",name:"Георгий Милонов",code:"105-547",role:"Ком. РОиО",photo:""},
        {rank:"maj",name:"Евгений Милонов 80",code:"552-580",role:"Зам. ком. РОиО",photo:""},
        {rank:"maj",name:"Андрей Милонов",code:"848-254",role:"Зам. ком. РОиО",photo:""}
      ]},
      {id:"mch",name:"Медицинская Часть",short:"МЧ",color:"#a34a8e",icon:"⚕",members:[
        {rank:"lt_col",name:"Данила Донецкий",code:"556-484",role:"Ком. МЧ",photo:""},
        {rank:"maj",name:"Александр Тугодумов",code:"981-182",role:"Зам. ком. МЧ",photo:""}
      ]}
    ],
    updated_at:null
  };

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function rankInfo(k){return RANKS.find(r=>r.key===k)||{key:k,label:k,short:k,tier:9}}

  function waitReady(){
    return new Promise(resolve=>{
      const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
      if(!s||s.ready) return resolve();
      const off=window.VSRF_AUTH.onChange(st=>{if(st.ready){off&&off();resolve()}});
      setTimeout(()=>resolve(),1500);
    });
  }

  function readLocal(){try{return JSON.parse(localStorage.getItem("vsrf-composition")||"null")}catch(e){return null}}
  function writeLocal(state){localStorage.setItem("vsrf-composition",JSON.stringify(state))}

  async function load(){
    await waitReady();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        const {data,error}=await s.client.from("composition").select("*").eq("id",1).maybeSingle();
        if(error) throw error;
        if(data&&data.state){
          const st=typeof data.state==="string"?JSON.parse(data.state):data.state;
          return Object.assign({},DEFAULT_STATE,st);
        }
      }catch(e){console.warn("[VSRF_COMP]",e.message)}
    }
    return readLocal()||JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  async function save(state){
    state.updated_at=new Date().toISOString();
    writeLocal(state);
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        const {error}=await s.client.from("composition").upsert({id:1,state:state,updated_at:state.updated_at},{onConflict:"id"});
        if(error) throw error;
        return {ok:true,remote:true};
      }catch(e){return {ok:true,remote:false,error:e.message}}
    }
    return {ok:true,remote:false};
  }

  function uid(){return "s_"+Math.random().toString(36).slice(2,9)}

  return {RANKS,HQ_SLOTS,DEFAULT_STATE,SUB_PRESETS,load,save,esc,rankInfo,uid};
})();
