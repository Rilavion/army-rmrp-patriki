window.VSRF_DOC_TEMPLATES=(function(){
  const EMBLEM="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Emblem_of_the_Russian_Ministry_of_Defence.svg/512px-Emblem_of_the_Russian_Ministry_of_Defence.svg.png";

  const TEMPLATES={
    prikaz:{
      name:"Приказ",
      description:"Официальный приказ Министерства обороны",
      fields:[
        {key:"title",label:"Заголовок приказа",type:"text",default:"О формировании оперативной группы для проведения процессуальных действий",area:"multiline"},
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
        {key:"unit_number",label:"Номер войсковой части (для печати)",type:"text",default:"12132"}
      ],
      pages:2
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
        {key:"unit_number",label:"Номер войсковой части (для печати)",type:"text",default:"12132"}
      ],
      pages:1
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
        {key:"unit_number",label:"Номер войсковой части",type:"text",default:"12132"}
      ],
      pages:1
    }
  };

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function nl2br(s){return esc(s).replace(/\n/g,"<br>")}
  function paragraphs(s){return String(s||"").split(/\n{2,}/).map(p=>p.trim()).filter(Boolean).map(p=>`<p>${esc(p).replace(/\n/g,"<br>")}</p>`).join("")}

  function seal(unitNumber){
    return `<div class="doc-seal">
      <svg viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <path id="topArc" d="M 60,60 m -46,0 a 46,46 0 0,1 92,0"/>
          <path id="botArc" d="M 60,60 m -46,0 a 46,46 0 0,0 92,0" transform="rotate(180 60 60)"/>
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#0d4a8a" stroke-width="1.5"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="#0d4a8a" stroke-width="1"/>
        <circle cx="60" cy="60" r="24" fill="none" stroke="#0d4a8a" stroke-width="1"/>
        <text font-family="Times New Roman, serif" font-size="6.4" font-weight="bold" fill="#0d4a8a" letter-spacing=".5">
          <textPath href="#topArc" startOffset="50%" text-anchor="middle">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</textPath>
        </text>
        <text font-family="Times New Roman, serif" font-size="6.4" font-weight="bold" fill="#0d4a8a" letter-spacing=".5">
          <textPath href="#botArc" startOffset="50%" text-anchor="middle">★ ВОЙСКОВАЯ ЧАСТЬ ${esc(unitNumber||"12132")} ★</textPath>
        </text>
        <g transform="translate(60 60)" fill="#0d4a8a">
          <path d="M -14,-8 L 0,-16 L 14,-8 L 14,4 C 14,10 8,14 0,16 C -8,14 -14,10 -14,4 Z" fill="none" stroke="#0d4a8a" stroke-width="1"/>
          <circle cx="0" cy="-2" r="4" fill="#0d4a8a"/>
          <path d="M -3,4 L 0,10 L 3,4" fill="none" stroke="#0d4a8a" stroke-width="1"/>
        </g>
      </svg>
    </div>`;
  }

  function signature(name){
    const initials=(name||"").match(/[А-ЯЁA-Z]/g)||["V"];
    const seed=initials.slice(0,2).join("");
    return `<div class="doc-signature" data-sig="${esc(seed)}"><svg viewBox="0 0 180 60" width="180" height="60">
      <path d="M 12,42 Q 22,10 40,32 T 70,28 Q 84,18 96,40 T 130,22 Q 148,14 168,36" stroke="#12327b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M 40,42 L 130,42" stroke="#12327b" stroke-width="1.2" fill="none"/>
    </svg></div>`;
  }

  function renderPrikaz(v,page){
    const membersList=String(v.members||"").split("\n").map(m=>m.trim()).filter(Boolean).map(m=>`<li>— ${esc(m)}${m.endsWith(";")?"":";"}</li>`).join("");
    if(page===1){
      return `<div class="doc-page a4">
        <div class="doc-inner">
          <div class="doc-emblem-wrap"><img src="${EMBLEM}" alt=""></div>
          <div class="doc-ministry">
            МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ<br>
            МОСКОВСКИЙ ВОЕННЫЙ ОКРУГ ВООРУЖЁННЫХ СИЛ<br>
            РОССИЙСКОЙ ФЕДЕРАЦИИ
          </div>
          <div class="doc-title-word">П&nbsp;&nbsp;Р&nbsp;&nbsp;И&nbsp;&nbsp;К&nbsp;&nbsp;А&nbsp;&nbsp;З</div>
          <div class="doc-title-sub">${nl2br(v.title)}</div>
          <div class="doc-reqs">
            <span>${esc(v.date)}</span>
            <span>${esc(v.city)}</span>
            <span>${esc(v.number)}</span>
          </div>
          <div class="doc-text doc-preamble">${nl2br(v.preamble)}</div>
          <div class="doc-word">П&nbsp;Р&nbsp;И&nbsp;К&nbsp;А&nbsp;З&nbsp;Ы&nbsp;В&nbsp;А&nbsp;Ю:</div>
          <div class="doc-text"><b>1.</b> Сформировать оперативную группу из числа военнослужащих органов военной полиции 1-й Мотострелковой бригады Московской области в следующем составе:</div>
          <ul class="doc-members">${membersList}</ul>
        </div>
      </div>`;
    }else{
      return `<div class="doc-page a4">
        <div class="doc-inner">
          <div class="doc-pagenum">2</div>
          <div class="doc-text"><b>2.</b> Установить время действия сформированной оперативной группы: с ${esc(v.time_from)} до ${esc(v.time_to)}.</div>
          <div class="doc-text"><b>3.</b> Контроль за исполнением настоящего Приказа оставляю за собой.</div>
          <div class="doc-text"><b>4.</b> Настоящий Приказ вступает в законную силу с момента его официального опубликования.</div>
          <div class="doc-sign-block">
            <div class="doc-sign-left">
              <div>${esc(v.sig_role1)}</div>
              <div>${esc(v.sig_role2)}</div>
              <div>${esc(v.sig_rank)}</div>
            </div>
            <div class="doc-sign-center">${seal(v.unit_number)}${signature(v.sig_name)}</div>
            <div class="doc-sign-right">${esc(v.sig_name)}</div>
          </div>
        </div>
      </div>`;
    }
  }

  function renderLetter(v){
    return `<div class="doc-page a4">
      <div class="doc-inner doc-inner-boxed">
        <div class="doc-letter-head">
          <div class="doc-letter-head-left">
            <img src="${EMBLEM}" alt="" class="doc-letter-emblem">
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
        <div class="doc-text">${nl2br(v.body_1)}</div>
        <div class="doc-text">${nl2br(v.body_2)}</div>
        <div class="doc-text"><b>${nl2br(v.body_3_bold)}</b></div>
        <div class="doc-sign-block">
          <div class="doc-sign-left">
            <div>${esc(v.sig_role1)}</div>
            <div>${esc(v.sig_rank)}</div>
          </div>
          <div class="doc-sign-center">${seal(v.unit_number)}${signature(v.sig_name)}</div>
          <div class="doc-sign-right">${esc(v.sig_name)}</div>
        </div>
      </div>
    </div>`;
  }

  function renderUkaz(v){
    return `<div class="doc-page a4">
      <div class="doc-inner">
        <div class="doc-emblem-wrap"><img src="${EMBLEM}" alt=""></div>
        <div class="doc-ministry">
          МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ<br>
          МОСКОВСКИЙ ВОЕННЫЙ ОКРУГ ВООРУЖЁННЫХ СИЛ<br>
          РОССИЙСКОЙ ФЕДЕРАЦИИ
        </div>
        <div class="doc-title-word">У&nbsp;&nbsp;К&nbsp;&nbsp;А&nbsp;&nbsp;З</div>
        <div class="doc-title-sub">${nl2br(v.title)}</div>
        <div class="doc-reqs">
          <span>${esc(v.date)}</span>
          <span>${esc(v.city)}</span>
          <span>${esc(v.number)}</span>
        </div>
        <div class="doc-text">${paragraphs(v.body)}</div>
        <div class="doc-sign-block">
          <div class="doc-sign-left">
            <div>${esc(v.sig_role1)}</div>
            <div>${esc(v.sig_rank)}</div>
          </div>
          <div class="doc-sign-center">${seal(v.unit_number)}${signature(v.sig_name)}</div>
          <div class="doc-sign-right">${esc(v.sig_name)}</div>
        </div>
      </div>
    </div>`;
  }

  function render(templateId,values){
    if(templateId==="prikaz"){return renderPrikaz(values,1)+renderPrikaz(values,2)}
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
