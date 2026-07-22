window.VSRF_NEWS=(function(){
  const DEMO=[];

  const TAGS={
    news:{label:"Новость",cls:"tag-news"},
    order:{label:"Приказ",cls:"tag-order"},
    event:{label:"Мероприятие",cls:"tag-event"},
    training:{label:"Учения",cls:"tag-training"},
    tech:{label:"Техника",cls:"tag-tech"},
    personnel:{label:"Кадры",cls:"tag-personnel"},
    alert:{label:"Тревога",cls:"tag-alert"},
    announce:{label:"Объявление",cls:"tag-announce"}
  };

  function waitReady(){
    return new Promise(resolve=>{
      const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
      if(!s||s.ready) return resolve();
      const off=window.VSRF_AUTH.onChange(st=>{if(st.ready){off&&off();resolve()}});
      setTimeout(()=>resolve(),1200);
    });
  }

  async function fetchNews(limit){
    await waitReady();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        let q=s.client.from("news").select("*").order("date",{ascending:false});
        if(limit) q=q.limit(limit);
        const {data,error}=await q;
        if(error) throw error;
        return data||[];
      }catch(e){console.warn("[VSRF_NEWS]",e.message);return []}
    }
    return limit?DEMO.slice(0,limit):DEMO.slice();
  }

  function fmt(d){
    try{return new Date(d).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}catch(e){return d}
  }

  function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function tagInfo(t){return TAGS[t]||TAGS.news}
  function tagsList(){return Object.keys(TAGS).map(k=>({key:k,label:TAGS[k].label}))}

  function cardHtml(n){
    const img=n.image?`<img src="${n.image}" alt="${esc(n.title)}" loading="lazy">`:"";
    const t=tagInfo(n.tag);
    return `<div class="news-card" data-news-id="${n.id}">
      <div class="news-thumb">
        <span class="news-thumb-tag ${t.cls}">${t.label}</span>
        ${img}
      </div>
      <div class="news-body">
        <div class="news-date">${fmt(n.date)}</div>
        <div class="news-title">${esc(n.title)}</div>
        <div class="news-excerpt">${esc(n.excerpt||"")}</div>
        <div class="news-more">Читать материал</div>
      </div>
    </div>`;
  }

  return {fetchNews,cardHtml,fmt,esc,tagInfo,tagsList,DEMO};
})();
