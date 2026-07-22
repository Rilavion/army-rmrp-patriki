window.VSRF_NEWS=(function(){
  const DEMO=[
    {id:"d1",title:"Приведение к присяге пополнения",date:"2026-07-18",image:"https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=1200&q=70&auto=format&fit=crop",excerpt:"Торжественная церемония приведения к военной присяге состоялась на плацу в/ч №12132. Молодое пополнение приняло воинскую клятву перед строем.",body:"Торжественная церемония приведения к военной присяге состоялась на плацу в/ч №12132. Молодое пополнение приняло воинскую клятву перед строем командования бригады. Церемонию возглавил командир бригады. По окончании построения новобранцы получили увольнительные для встречи с родственниками."},
    {id:"d2",title:"Тактические учения ССО",date:"2026-07-12",image:"https://images.unsplash.com/photo-1580982328062-c1c2ba2b7a44?w=1200&q=70&auto=format&fit=crop",excerpt:"Силы специальных операций провели трёхдневные тактические учения по отработке действий разведгрупп в условиях городской застройки.",body:"В рамках плановой боевой подготовки Силы специальных операций провели трёхдневные тактические учения. Отработаны действия разведывательных групп в условиях городской застройки, эвакуация раненых, взаимодействие с медицинской ротой. По итогам подведены результаты и назначены отличившиеся."},
    {id:"d3",title:"Пополнение автопарка бригады",date:"2026-07-05",image:"https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=1200&q=70&auto=format&fit=crop",excerpt:"На вооружение части поступили новые единицы бронеавтомобилей «Тигр-М» для нужд роты охраны и обеспечения.",body:"На вооружение части поступила партия бронеавтомобилей «Тигр-М», предназначенных для нужд роты охраны и обеспечения. Техника уже прошла приёмку и распределена по подразделениям. Личный состав приступил к освоению новой техники под руководством инструкторов."},
    {id:"d4",title:"День части — 24 июня",date:"2026-06-24",image:"https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&q=70&auto=format&fit=crop",excerpt:"Личный состав отметил очередную годовщину со дня формирования бригады. Прошли торжественное построение и показные выступления.",body:"24 июня личный состав в/ч №12132 отметил очередную годовщину со дня формирования бригады. Мероприятия начались с торжественного построения на плацу. Прозвучал гимн Российской Федерации, командование зачитало приветственные адреса. После построения состоялись показные выступления ССО и роты охраны."},
    {id:"d5",title:"Плановое медицинское освидетельствование",date:"2026-06-15",image:"https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&q=70&auto=format&fit=crop",excerpt:"Медицинская рота провела плановое освидетельствование личного состава подразделений согласно утверждённому графику.",body:"Согласно утверждённому расписанию (ст. 2.11 Устава внутренней службы) Медицинская рота провела плановое освидетельствование личного состава. Прошли осмотр военнослужащие ССО, ВП, РОиО, ВК и ВА. Замечаний по итогам не выявлено."}
  ];

  async function fetchNews(limit){
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        const q=s.client.from("news").select("*").order("date",{ascending:false});
        if(limit) q.limit(limit);
        const {data,error}=await q;
        if(error) throw error;
        return (data&&data.length?data:DEMO.slice(0,limit||DEMO.length));
      }catch(e){return DEMO.slice(0,limit||DEMO.length)}
    }
    return DEMO.slice(0,limit||DEMO.length);
  }

  function fmt(d){
    try{
      const dt=new Date(d);
      return dt.toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"});
    }catch(e){return d}
  }

  function cardHtml(n){
    const img=n.image?`<img src="${n.image}" alt="${escapeHtml(n.title)}" loading="lazy">`:"";
    return `<a class="news-card reveal" href="news.html#n-${n.id}">
      <div class="news-thumb">${img}</div>
      <div class="news-body">
        <div class="news-date">${fmt(n.date)}</div>
        <div class="news-title">${escapeHtml(n.title)}</div>
        <div class="news-excerpt">${escapeHtml(n.excerpt||"")}</div>
        <div class="news-more">Читать</div>
      </div>
    </a>`;
  }

  function itemHtml(n,admin){
    const img=n.image?`<img src="${n.image}" alt="${escapeHtml(n.title)}" loading="lazy">`:"";
    const adm=admin?`<div class="news-item-actions admin-only">
      <button class="btn btn-ghost btn-sm" data-edit="${n.id}">Ред.</button>
      <button class="btn btn-ghost btn-sm" data-del="${n.id}">Удалить</button>
    </div>`:"";
    return `<article class="news-item reveal" id="n-${n.id}">
      <div class="news-thumb">${img}</div>
      <div class="news-item-body">
        <div class="news-date">${fmt(n.date)}</div>
        <h3>${escapeHtml(n.title)}</h3>
        <p>${escapeHtml(n.body||n.excerpt||"")}</p>
      </div>
      ${adm}
    </article>`;
  }

  function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

  return {fetchNews,cardHtml,itemHtml,fmt,DEMO};
})();
