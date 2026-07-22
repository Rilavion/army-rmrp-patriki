window.VSRF_USTAV=(function(){
  const DEFAULT_DATA=[
    {slug:"ustav-vnutrenney-sluzhby",theme:"t1",title:"Устав внутренней службы",code:"1781813401486",meta:"Министерство обороны РФ<br>в/ч №12132",
      full:"УСТАВ ВНУТРЕННЕЙ СЛУЖБЫ ВООРУЖЕННЫХ СИЛ РОССИЙСКОЙ ФЕДЕРАЦИИ",
      sub:"1-я отдельная гвардейская бригада специального назначения · в/ч №12132",
      preamble:"",
      chapters:[],
      signature:{title:"Командир 1-ой мотострелковой бригады",rank:"генерал-лейтенант",name:"Волков Р.А."}
    },
    {slug:"stroevoy-ustav",theme:"t2",title:"Строевой устав",code:"1781813453292",meta:"Строевая подготовка<br>в/ч №12132",
      full:"СТРОЕВОЙ УСТАВ",sub:"1-я ОБрСпН · в/ч №12132",preamble:"",chapters:[],signature:null},
    {slug:"karaulnaya-i-garnizonnaya",theme:"t3",title:"Устав караульной и гарнизонной служб",code:"1781813512103",meta:"Караульная и гарнизонная служба<br>в/ч №12132",
      full:"УСТАВ КАРАУЛЬНОЙ И ГАРНИЗОННОЙ СЛУЖБ",sub:"1-я ОБрСпН · в/ч №12132",preamble:"",chapters:[],signature:null},
    {slug:"disciplinarnyy-ustav",theme:"t4",title:"Дисциплинарный устав",code:"1781813587291",meta:"Воинская дисциплина<br>в/ч №12132",
      full:"ДИСЦИПЛИНАРНЫЙ УСТАВ",sub:"1-я ОБрСпН · в/ч №12132",preamble:"",chapters:[],signature:null},
    {slug:"ustav-voennoy-politsii",theme:"t5",title:"Устав военной полиции",code:"1781813632975",meta:"Военная полиция<br>в/ч №12132",
      full:"УСТАВ ВОЕННОЙ ПОЛИЦИИ",sub:"1-я ОБрСпН · в/ч №12132",preamble:"",chapters:[],signature:null}
  ];

  function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

  function paragraphs(text){
    return String(text||"").split(/\n{2,}/).map(p=>p.trim()).filter(Boolean).map(p=>`<p>${esc(p).replace(/\n/g,"<br>")}</p>`).join("");
  }

  function renderArticle(a,slug,chapId){
    const anchor=`${slug}--${chapId}--${a.num.replace(/\./g,"_")}`;
    const notes=(a.notes||[]).map(n=>`<div class="note">${esc(n)}</div>`).join("");
    return `<div class="art" id="${anchor}">
      <button class="copy-link" title="Скопировать ссылку" data-copy-anchor="${anchor}"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
      <strong>${esc(a.num)}.</strong> ${esc(a.text).replace(/\n/g,"<br>")}
      ${notes}
    </div>`;
  }

  function renderChapter(c,slug){
    const arts=(c.articles||[]).map(a=>renderArticle(a,slug,c.id)).join("");
    return `<section class="chapter" id="${c.id}"><h2>${esc(c.title)}</h2><div class="arts">${arts||'<div class="art" style="opacity:.6">Статьи будут добавлены.</div>'}</div></section>`;
  }

  function render(doc){
    let html=`<div class="paper-head">
      <div class="ministry">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</div>
      <h1>${esc(doc.full||doc.title)}</h1>
      <div class="sub">${esc(doc.sub||"1-я ОБрСпН · в/ч №12132")}</div>
    </div>
    <div class="paper-body">`;

    if(doc.preamble&&doc.preamble.trim()){
      html+=`<section class="preamble" id="preamble"><h2>ПРЕАМБУЛА</h2>${paragraphs(doc.preamble)}</section>`;
    }

    if(!doc.chapters||!doc.chapters.length){
      if(!doc.preamble||!doc.preamble.trim()){
        html+=`<div class="doc-empty"><h3>Документ пуст</h3>Здесь пока нет глав и статей. Администратор может заполнить документ через панель редактирования.</div>`;
      }
    }else{
      doc.chapters.forEach(c=>{html+=renderChapter(c,doc.slug)});
    }

    if(doc.signature){
      html+=`<section class="sig">
        <div class="sig-title">${esc(doc.signature.title||"")}</div>
        <div class="sig-rank">${esc(doc.signature.rank||"")}</div>
        <div class="sig-name">${esc(doc.signature.name||"")}</div>
      </section>`;
    }
    html+=`</div>`;
    return html;
  }

  function buildToc(doc){
    const toc=[];
    if(doc.preamble&&doc.preamble.trim()) toc.push({id:"preamble",label:"Преамбула"});
    (doc.chapters||[]).forEach(c=>toc.push({id:c.id,label:c.title}));
    return toc;
  }

  async function loadAll(){
    const local=readLocal();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    if(s&&s.available&&s.client){
      try{
        const {data,error}=await s.client.from("ustavy").select("*");
        if(error) throw error;
        if(data&&data.length){
          const merged=DEFAULT_DATA.map(d=>{
            const row=data.find(x=>x.slug===d.slug);
            if(!row) return local[d.slug]||d;
            try{
              const parsed=typeof row.content==="string"?JSON.parse(row.content):row.content;
              return Object.assign({},d,parsed,{slug:d.slug,theme:d.theme,code:d.code,meta:d.meta,title:d.title});
            }catch(e){return local[d.slug]||d}
          });
          return merged;
        }
      }catch(e){}
    }
    return DEFAULT_DATA.map(d=>Object.assign({},d,local[d.slug]||{}));
  }

  function readLocal(){
    try{return JSON.parse(localStorage.getItem("vsrf-ustavy-local")||"{}")}catch(e){return {}}
  }
  function writeLocal(slug,doc){
    const all=readLocal();
    all[slug]={preamble:doc.preamble,chapters:doc.chapters,signature:doc.signature,full:doc.full,sub:doc.sub};
    localStorage.setItem("vsrf-ustavy-local",JSON.stringify(all));
  }

  async function save(doc){
    const payload={preamble:doc.preamble||"",chapters:doc.chapters||[],signature:doc.signature||null,full:doc.full||doc.title,sub:doc.sub||""};
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    writeLocal(doc.slug,doc);
    if(s&&s.available&&s.client){
      try{
        const row={slug:doc.slug,title:doc.title,content:payload,updated_at:new Date().toISOString()};
        const {error}=await s.client.from("ustavy").upsert(row,{onConflict:"slug"});
        if(error) throw error;
        return {ok:true,remote:true};
      }catch(e){return {ok:true,remote:false,error:e.message}}
    }
    return {ok:true,remote:false};
  }

  return {DEFAULT_DATA,render,buildToc,loadAll,save,esc,paragraphs};
})();
