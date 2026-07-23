window.VSRF_DOC_TEMPLATES=(function(){
  const EMBLEM="https://lh7-us.googleusercontent.com/rirXWnCVAAskqtGbpb8KBbSUWJafqWOPSC8nR5Z4OjYMdAr3Vt6_DiF_Uw_S3XbeGLlN9m6Pfd_ET-E8LPjCKNruw-wWsyN8137M8mtS7IY9TsrGF3Iap15_bzfNUF8-305JxpiyZAp-yHpQZmLbBfg";

  const COMMON_SEAL={key:"seal_url",label:"URL печати (изображение)",type:"text",default:""};
  const COMMON_SIG_IMG={key:"sig_url",label:"URL подписи (изображение)",type:"text",default:""};

  const TEMPLATES={
    prikaz:{
      name:"Приказ",
      description:"Официальный приказ Министерства обороны",
      fields:[
        {key:"title",label:"Заголовок приказа",type:"textarea",default:"О формировании оперативной группы для проведения процессуальных действий"},
        {key:"date",label:"Дата",type:"text",default:"17 апреля 2026 г."},
        {key:"city",label:"Город",type:"text",default:"Москва"},
        {key:"number",label:"Номер приказа",type:"text",default:"№101"},
        {key:"preamble",label:"Преамбула (основание)",type:"textarea",default:"На основании части 5 статьи 13 Федерального конституционного закона Процессуального кодекса Российской Федерации №69-ФКЗ, в целях обеспечения проведения задержаний и процессуальных действий, установления надлежащего порядка в подразделении, —"},
        {key:"members",label:"Члены оперативной группы (каждый с новой строки)",type:"textarea",default:"Военный комендант гарнизона, подполковник Монтерро Роман Васильевич, удостоверение АА №324-340\nКомандир батальона военной полиции, подполковник Распутин Руслан Сергеевич, удостоверение АА №593-876\nЗаместитель командира ВП, майор Распутин Алексей Вадимович, удостоверение АА №248-295\nЗаместитель командира ВП, капитан Баранов Кирилл Робертович, удостоверение АА №171-958\nИнструктор ВП, младший лейтенант Алмазов Максим Вячеславович, удостоверение АА №746-078"},
        {key:"time_from",label:"Время начала действия",type:"text",default:"16 часов 45 минут по московскому времени 17 апреля 2026 года"},
        {key:"time_to",label:"Время окончания действия",type:"text",default:"01 час 00 минут по московскому времени 20 апреля 2026 года"},
        {key:"sig_role1",label:"Подпись — должность строка 1",type:"text",default:"Военный комендант"},
        {key:"sig_role2",label:"Подпись — должность строка 2",type:"text",default:"гарнизона"},
        {key:"sig_rank",label:"Подпись — звание",type:"text",default:"Подполковник"},
        {key:"sig_name",label:"Подпись — ФИО с инициалами",type:"text",default:"Монтерро Р.В."},
        COMMON_SEAL,COMMON_SIG_IMG
      ]
    },
    letter:{
      name:"Официальное письмо / ответ",
      description:"Служебное письмо (например, ответ прокурору)",
      fields:[
        {key:"unit_name",label:"Название части (левый блок)",type:"text",default:"Войсковая часть 12132"},
        {key:"unit_city",label:"Город",type:"text",default:"г. Москва, Россия"},
        {key:"date",label:"Дата",type:"text",default:"17.04.2026"},
        {key:"number",label:"Исходящий номер",type:"text",default:"№103"},
        {key:"addressee_line1",label:"Адресат — строка 1",type:"text",default:"Старшему прокурору города Москвы"},
        {key:"addressee_line2",label:"Адресат — строка 2",type:"text",default:"и Московской области"},
        {key:"addressee_rank",label:"Адресат — звание",type:"text",default:"Юрист 2-го класса"},
        {key:"addressee_name",label:"Адресат — ФИО",type:"text",default:"Мокрушин Н.С."},
        {key:"greeting",label:"Обращение",type:"text",default:"Уважаемый Николай Сергеевич!"},
        {key:"body_1",label:"Абзац 1",type:"textarea",default:"Настоящим сообщаю, что постановление «О запросе необходимых сведений» №1408 от 17.04.2026 г. было получено и надлежащим образом рассмотрено в установленный законом срок."},
        {key:"body_2",label:"Абзац 2",type:"textarea",default:"Все необходимые данные и выписки из служебных документов были подготовлены и направлены на указанный электронный адрес прокуратуры в полном объёме."},
        {key:"body_3_bold",label:"Абзац 3 (жирный)",type:"textarea",default:"Довожу до Вашего сведения плачевную обстановку с большим количеством криминальных элементов в чёрном одеянии в подведомственной зоне ответственности. Весь состав Вооружённых Сил РФ с 21:00 до глубокой ночи находился в прямом руководстве лично подписанта. Обращаю внимание на человеческий фактор и невнимательность, обусловленные усталостью личного состава."},
        {key:"sig_role1",label:"Подпись — должность",type:"text",default:"Командир Бригады"},
        {key:"sig_rank",label:"Подпись — звание",type:"text",default:"Генерал-лейтенант"},
        {key:"sig_name",label:"Подпись — ФИО",type:"text",default:"В.В. Прайд"},
        COMMON_SEAL,COMMON_SIG_IMG
      ]
    },
    ukaz:{
      name:"Указ",
      description:"Указ / распоряжение",
      fields:[
        {key:"title",label:"Наименование указа",type:"textarea",default:"О назначении на должность"},
        {key:"date",label:"Дата",type:"text",default:"17 апреля 2026 г."},
        {key:"city",label:"Город",type:"text",default:"Москва"},
        {key:"number",label:"Номер",type:"text",default:"№45"},
        {key:"body",label:"Основной текст",type:"textarea",default:"На основании представления командования и результатов аттестации, —\n\nПОСТАНОВЛЯЮ:\n\n1. Назначить на должность заместителя командира батальона военной полиции войсковой части 12132 капитана Иванова Ивана Ивановича, удостоверение АА №000-000.\n\n2. Настоящий Указ вступает в силу с момента подписания.\n\n3. Контроль за исполнением настоящего Указа возложить на начальника штаба."},
        {key:"sig_role1",label:"Подпись — должность",type:"text",default:"Командир Бригады"},
        {key:"sig_rank",label:"Подпись — звание",type:"text",default:"Генерал-лейтенант"},
        {key:"sig_name",label:"Подпись — ФИО",type:"text",default:"В.В. Прайд"},
        COMMON_SEAL,COMMON_SIG_IMG
      ]
    }
  };

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function nl2br(s){return esc(s).replace(/\n/g,"<br>")}
  function paragraphs(s){return String(s||"").split(/\n{2,}/).map(p=>p.trim()).filter(Boolean).map(p=>`<p class="doc-p">${esc(p).replace(/\n/g,"<br>")}</p>`).join("")}

  function sealBlock(sealUrl){
    if(sealUrl&&sealUrl.trim()){
      return `<div class="doc-seal"><img src="${esc(sealUrl.trim())}" alt="Печать" crossorigin="anonymous"></div>`;
    }
    return `<div class="doc-seal doc-seal-empty" title="Печать не загружена">
      <div class="doc-seal-empty-inner">Печать<br>не загружена</div>
    </div>`;
  }

  function signature(name,sigUrl){
    if(sigUrl&&sigUrl.trim()){
      return `<div class="doc-signature doc-signature-img"><img src="${esc(sigUrl.trim())}" alt="Подпись" crossorigin="anonymous"></div>`;
    }
    const initials=(name||"").match(/[А-ЯЁA-Z]/g)||["V"];
    const seed=initials.slice(0,2).join("").charCodeAt(0)%3;
    const paths=[
      `M 12,42 Q 22,10 40,32 T 70,28 Q 84,18 96,40 T 130,22 Q 148,14 168,36`,
      `M 10,38 C 30,10 55,50 80,28 S 130,50 168,20`,
      `M 14,40 Q 40,8 60,34 T 100,26 Q 130,22 168,38`
    ];
    return `<div class="doc-signature"><svg viewBox="0 0 180 60" width="180" height="60">
      <path d="${paths[seed]}" stroke="#12327b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M 40,44 L 130,44" stroke="#12327b" stroke-width="1.1" fill="none" opacity=".7"/>
    </svg></div>`;
  }

  function paginate(items,firstPageMax,otherPageMax){
    const pages=[];let i=0;
    while(i<items.length){
      const cap=pages.length===0?firstPageMax:otherPageMax;
      pages.push(items.slice(i,i+cap));i+=cap;
    }
    return pages.length?pages:[[]];
  }

  function renderPrikaz(v){
    const membersArr=String(v.members||"").split("\n").map(m=>m.trim()).filter(Boolean);
    const memberPages=paginate(membersArr,5,10);
    const totalPages=memberPages.length+1;
    const pages=[];
    memberPages.forEach((mems,idx)=>{
      const isFirst=idx===0;
      const list=mems.map(m=>`<li>— ${esc(m)}${m.endsWith(";")||m.endsWith(".")?"":";"}</li>`).join("");
      const pageNum=idx+1;
      const head=isFirst?`
        <div class="doc-emblem-wrap"><img src="${EMBLEM}" alt="" crossorigin="anonymous"></div>
        <div class="doc-ministry">
          МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ<br>
          МОСКОВСКИЙ ВОЕННЫЙ ОКРУГ ВООРУЖЁННЫХ СИЛ<br>
          РОССИЙСКОЙ ФЕДЕРАЦИИ
        </div>
        <div class="doc-title-word">П&nbsp;&nbsp;Р&nbsp;&nbsp;И&nbsp;&nbsp;К&nbsp;&nbsp;А&nbsp;&nbsp;З</div>
        <div class="doc-title-sub">${nl2br(v.title)}</div>
        <div class="doc-reqs">
          <span>${esc(v.date)}</span><span>${esc(v.city)}</span><span>${esc(v.number)}</span>
        </div>
        <div class="doc-p doc-preamble">${nl2br(v.preamble)}</div>
        <div class="doc-word">П&nbsp;Р&nbsp;И&nbsp;К&nbsp;А&nbsp;З&nbsp;Ы&nbsp;В&nbsp;А&nbsp;Ю:</div>
        <div class="doc-p"><b>1.</b> Сформировать оперативную группу из числа военнослужащих органов военной полиции 1-й Мотострелковой бригады Московской области в следующем составе:</div>`:`<div class="doc-pagenum">${pageNum}</div>
        <div class="doc-p"><i>(продолжение списка личного состава)</i></div>`;
      pages.push(`<div class="doc-page a4" data-page-idx="${pageNum}">
        <div class="doc-inner">
          ${head}
          <ul class="doc-members">${list}</ul>
        </div>
      </div>`);
    });
    const lastNum=totalPages;
    pages.push(`<div class="doc-page a4" data-page-idx="${lastNum}">
      <div class="doc-inner">
        <div class="doc-pagenum">${lastNum}</div>
        <div class="doc-p"><b>2.</b> Установить время действия сформированной оперативной группы: с ${esc(v.time_from)} до ${esc(v.time_to)}.</div>
        <div class="doc-p"><b>3.</b> Контроль за исполнением настоящего Приказа оставляю за собой.</div>
        <div class="doc-p"><b>4.</b> Настоящий Приказ вступает в законную силу с момента его официального опубликования.</div>
        <div class="doc-sign-block">
          <div class="doc-sign-left">
            <div>${esc(v.sig_role1)}</div>
            <div>${esc(v.sig_role2)}</div>
            <div>${esc(v.sig_rank)}</div>
          </div>
          <div class="doc-sign-center">${sealBlock(v.seal_url)}${signature(v.sig_name,v.sig_url)}</div>
          <div class="doc-sign-right">${esc(v.sig_name)}</div>
        </div>
      </div>
    </div>`);
    return pages.join("");
  }

  function renderLetter(v){
    return `<div class="doc-page a4" data-page-idx="1">
      <div class="doc-inner doc-inner-boxed">
        <div class="doc-letter-head">
          <div class="doc-letter-head-left">
            <img src="${EMBLEM}" alt="" class="doc-letter-emblem" crossorigin="anonymous">
            <div class="doc-letter-info">
              <div><b>Министерство обороны</b></div>
              <div><b>Российской Федерации</b></div>
              <div>Московский военный округ</div>
              <div>Вооружённых сил Российской Федерации</div>
              <div class="doc-strong">${esc(v.unit_name)}</div>
              <div>${esc(v.unit_city)}</div>
              <div class="doc-mono">${esc(v.date)} &nbsp; ${esc(v.number)}</div>
            </div>
          </div>
          <div class="doc-letter-head-right">
            <div>${esc(v.addressee_line1)}</div>
            <div>${esc(v.addressee_line2)}</div>
            <div style="height:14px"></div>
            <div>${esc(v.addressee_rank)}</div>
            <div>${esc(v.addressee_name)}</div>
          </div>
        </div>
        <div class="doc-greeting"><b>${esc(v.greeting)}</b></div>
        <div class="doc-p">${nl2br(v.body_1)}</div>
        <div class="doc-p">${nl2br(v.body_2)}</div>
        <div class="doc-p"><b>${nl2br(v.body_3_bold)}</b></div>
        <div class="doc-sign-block">
          <div class="doc-sign-left">
            <div>${esc(v.sig_role1)}</div>
            <div>${esc(v.sig_rank)}</div>
          </div>
          <div class="doc-sign-center">${sealBlock(v.seal_url)}${signature(v.sig_name,v.sig_url)}</div>
          <div class="doc-sign-right">${esc(v.sig_name)}</div>
        </div>
      </div>
    </div>`;
  }

  function renderUkaz(v){
    return `<div class="doc-page a4" data-page-idx="1">
      <div class="doc-inner">
        <div class="doc-emblem-wrap"><img src="${EMBLEM}" alt="" crossorigin="anonymous"></div>
        <div class="doc-ministry">
          МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ<br>
          МОСКОВСКИЙ ВОЕННЫЙ ОКРУГ ВООРУЖЁННЫХ СИЛ<br>
          РОССИЙСКОЙ ФЕДЕРАЦИИ
        </div>
        <div class="doc-title-word">У&nbsp;&nbsp;К&nbsp;&nbsp;А&nbsp;&nbsp;З</div>
        <div class="doc-title-sub">${nl2br(v.title)}</div>
        <div class="doc-reqs">
          <span>${esc(v.date)}</span><span>${esc(v.city)}</span><span>${esc(v.number)}</span>
        </div>
        <div>${paragraphs(v.body)}</div>
        <div class="doc-sign-block">
          <div class="doc-sign-left">
            <div>${esc(v.sig_role1)}</div>
            <div>${esc(v.sig_rank)}</div>
          </div>
          <div class="doc-sign-center">${sealBlock(v.seal_url)}${signature(v.sig_name,v.sig_url)}</div>
          <div class="doc-sign-right">${esc(v.sig_name)}</div>
        </div>
      </div>
    </div>`;
  }

  function render(templateId,values){
    if(templateId==="prikaz") return renderPrikaz(values);
    if(templateId==="letter") return renderLetter(values);
    if(templateId==="ukaz") return renderUkaz(values);
    return "<div>Неизвестный шаблон</div>";
  }

  function defaults(templateId){
    const t=TEMPLATES[templateId];if(!t) return {};
    const o={};t.fields.forEach(f=>o[f.key]=f.default||"");return o;
  }

  return {TEMPLATES,render,defaults,esc};
})();
