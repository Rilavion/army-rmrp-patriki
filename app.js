const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
let supabase = null;
if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const DOCS_DATA = [
    {slug:"ustav-vnutrenney-sluzhby",theme:"t1",title:"Устав внутренней службы",full:"УСТАВ ВНУТРЕННЕЙ СЛУЖБЫ",sub:"1-я ОБрСпН, в/ч №12132",code:"1781813401486",meta:"Министерство обороны РФ<br>в/ч №12132",toc:[
        {id:"preamble",label:"Преамбула"},
        {id:"ch1",label:"Глава I. Общие положения"},
        {id:"ch2",label:"Глава II. Распорядок дня"},
        {id:"ch3",label:"Глава III. Внешний вид"},
        {id:"ch4",label:"Глава IV. Структура войсковой части"},
        {id:"ch5",label:"Глава V. Субординация"},
        {id:"ch6",label:"Глава VI. Правила использования рации"},
        {id:"ch7",label:"Глава VII. Регламент действий"},
        {id:"ch8",label:"Глава VIII. Кадровая отчётность"},
    ],content:`
        <div class="paper-head"><div class="ministry">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</div><h1>УСТАВ ВНУТРЕННЕЙ СЛУЖБЫ ВООРУЖЕННЫХ СИЛ РОССИЙСКОЙ ФЕДЕРАЦИИ</h1><div class="sub">1-я отдельная гвардейская бригада специального назначения · в/ч №12132</div></div>
        <div class="paper-body">
        <section class="preamble" id="preamble"><h2>ПРЕАМБУЛА</h2><p>Настоящий Устав определяет права и обязанности военнослужащих Вооруженных Сил Российской Федерации и взаимоотношения между ними, обязанности основных должностных лиц полка и его подразделений, а также правила внутреннего порядка.</p><p>Все военнослужащие воинских подразделений, штаба, независимо от своих воинских званий, служебного положения и заслуг должны строго руководствоваться требованиями настоящего Устава.</p></section>
        <section class="chapter" id="ch1"><h2>ГЛАВА I. ОБЩИЕ ПОЛОЖЕНИЯ</h2><div class="arts">
        <div class="art"><strong>1.1.</strong> Каждый военнослужащий Вооруженных сил Российской Федерации должен знать и соблюдать положения настоящего Устава, а также иных нормативных актов.</div>
        <div class="art"><strong>1.2.</strong> Каждый военнослужащий Вооруженных сил Российской Федерации обязан честно и качественно исполнять свой долг перед Родиной и её жителями.</div>
        <div class="art"><strong>1.3.</strong> Лица, подпадающие под действие настоящего Устава, обязаны соблюдать установленную иерархию и беспрекословно выполнять приказы и распоряжения вышестоящих.</div>
        <div class="art"><strong>1.4.</strong> Запрещены любые действия, высказывания или поступки, способные нанести ущерб репутации Вооружённых Сил Российской Федерации.</div>
        <div class="art"><strong>1.5.</strong> При возникновении любых вопросов военнослужащие Вооруженных сил Российской Федерации должны обращаться непосредственно к старшему составу и командиру своего подразделения.</div>
        </div></section>
        <section class="chapter" id="ch2"><h2>ГЛАВА II. РАСПОРЯДОК ДНЯ</h2><div class="arts">
        <div class="art"><strong>2.1.</strong> Распорядок дня в в/ч №12132: Будние дни с 9:00 до 22:00; Выходные с 9:00 до 21:00; Праздничные дни с 9:00 до 20:00; Обеденный перерыв ежедневно с 14:00 до 15:00.</div>
        <div class="art"><strong>2.2.</strong> Служебная деятельность военнослужащих не прекращается даже после завершения служебного дня. Каждый военнослужащий может быть вызван из отгула для исполнения воинской обязанности.</div>
        <div class="art"><strong>2.3.</strong> Ежедневно, в 21:00, проводится вечерняя поверка, на которой обязуется присутствовать каждый военнослужащий. Неявка — строгое нарушение воинской дисциплины.</div>
        <div class="art"><strong>2.4.</strong> В зависимости от определенных обстоятельств, командир бригады вправе своим приказом вносить временные корректировки в служебный график.</div>
        </div></section>
        <section class="chapter" id="ch3"><h2>ГЛАВА III. ВНЕШНИЙ ВИД</h2><div class="arts">
        <div class="art"><strong>3.1.</strong> Все военнослужащие в расположении или при участии в официальных мероприятиях обязаны быть одетыми по установленной форме.</div>
        <div class="art"><strong>3.2.</strong> При выборе формы одежды военнослужащие обязаны руководствоваться настоящим уставом, приказами Министерства Обороны и должностными регламентами.</div>
        <div class="art"><strong>3.3.</strong> Военнослужащие обязаны носить форму подразделения, к которому они отнесены. Запрещается ношение формы других подразделений без соответствующего разрешения.</div>
        <div class="art"><strong>3.4.</strong> Запрещено использовать при исполнении обязанностей: спортивную и пляжную одежду; элементы с логотипами брендов; неопрятную одежду; татуировки на кистях, лице и шее; криминальную символику.</div>
        </div></section>
        <section class="chapter" id="ch4"><h2>ГЛАВА IV. СТРУКТУРА ВОЙСКОВОЙ ЧАСТИ</h2><div class="arts">
        <div class="art"><strong>4.1.</strong> Иерархическая структура 1-ой мотострелковой бригады: Командир бригады; Первый заместитель командира бригады; Начальник штаба бригады; Зам. по тактической подготовке; Зам. по МТО; Помощник по особым поручениям.</div>
        <div class="art"><strong>4.2.</strong> Командир бригады — осуществляет общее руководство бригадой. Является высшей инстанцией при принятии решений.</div>
        <div class="art"><strong>4.3.</strong> Первый заместитель командира бригады — подчиняется Командиру, является прямым начальником всего личного состава.</div>
        <div class="art"><strong>4.4.</strong> Начальник штаба — заместитель Командира и прямой начальник штаба. Отвечает за управление подразделениями, боевую и мобилизационную готовность.</div>
        </div></section>
        <section class="chapter" id="ch5"><h2>ГЛАВА V. СУБОРДИНАЦИЯ</h2><div class="arts">
        <div class="art"><strong>5.1.</strong> Субординация — система иерархических отношений, определяющая порядок подчинения военнослужащих командирам.</div>
        <div class="art"><strong>5.2.</strong> Каждый военнослужащий обязан следовать указаниям непосредственного начальства в соответствии с полномочиями.</div>
        <div class="art"><strong>5.3.</strong> Общение со старшим по званию: Обращение — «Товарищ [Звание] [Фамилия], разрешите…»; Согласие — «Так точно»; Несогласие — «Никак нет».</div>
        </div></section>
        <section class="chapter" id="ch6"><h2>ГЛАВА VI. ПРАВИЛА ИСПОЛЬЗОВАНИЯ РАЦИИ</h2><div class="arts">
        <div class="art"><strong>6.1.</strong> Тэги: ВП — [ВП]; ССО — [ССО]; РОиО — [РОиО]; ВК — [ВК]; МР — [МР]; ВА — [ВА].</div>
        <div class="art"><strong>6.2.</strong> Коды: Код-1 — стабильно; Код-2 — скопление подозрительных лиц; Код-3 — проникновение, нападение, массовое нарушение; Код-4 — боевая тревога.</div>
        </div></section>
        <section class="chapter" id="ch7"><h2>ГЛАВА VII. РЕГЛАМЕНТ ДЕЙСТВИЙ</h2><div class="arts">
        <div class="art"><strong>7.1.</strong> Основная задача поставочных мероприятий — загрузка машин и доставка груза в полном объеме без утрат.</div>
        <div class="art"><strong>7.2.</strong> Во время спецопераций запрещено: прыгать с ящиком, использовать мобильные телефоны, вести посторонние разговоры.</div>
        <div class="art"><strong>7.3.</strong> После объявления военного положения весь личный состав переодевается в боевую форму и находится в ней до окончания.</div>
        </div></section>
        <section class="chapter" id="ch8"><h2>ГЛАВА VIII. КАДРОВАЯ ОТЧЁТНОСТЬ</h2><div class="arts">
        <div class="art"><strong>8.1.</strong> Все отчеты составляются строго по форме. Запрещено удалять отчеты, редактировать заявления после отправки.</div>
        <div class="art"><strong>8.2.</strong> Для повышения не должно быть активных дисциплинарных взысканий. Повышение проходит строго по системе подразделения.</div>
        <div class="art"><strong>8.3.</strong> Все повышения проходят сразу после вечерней поверки. Испытательный срок для командиров — от 14 до 21 дня.</div>
        </div></section>
        <section class="sig"><div class="sig-title">Командир 1-ой мотострелковой бригады</div><div class="sig-rank">генерал-лейтенант</div><div class="sig-name">Волков Р.А.</div></section>
        </div>
    `},
    {slug:"stroevoy-ustav",theme:"t2",title:"Строевой устав",full:"СТРОЕВОЙ УСТАВ",sub:"1-я ОБрСпН, в/ч №12132",code:"1781813453292",meta:"Строевая подготовка<br>в/ч №12132",toc:[],content:`
        <div class="paper-head"><div class="ministry">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</div><h1>СТРОЕВОЙ УСТАВ</h1><div class="sub">1-я ОБрСпН · в/ч №12132</div></div>
        <div class="paper-body"><div class="doc-empty">Страница строевого устава подготовлена. Полный текст будет размещён позднее.</div></div>
    `},
    {slug:"karaulnaya-i-garnizonnaya",theme:"t3",title:"Устав караульной и гарнизонной служб",full:"УСТАВ КАРАУЛЬНОЙ И ГАРНИЗОННОЙ СЛУЖБ",sub:"1-я ОБрСпН, в/ч №12132",code:"1781813512103",meta:"Караульная и гарнизонная служба<br>в/ч №12132",toc:[],content:`
        <div class="paper-head"><div class="ministry">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</div><h1>УСТАВ КАРАУЛЬНОЙ И ГАРНИЗОННОЙ СЛУЖБ</h1><div class="sub">1-я ОБрСпН · в/ч №12132</div></div>
        <div class="paper-body"><div class="doc-empty">Страница устава караульной и гарнизонной служб подготовлена. Полный текст будет размещён позднее.</div></div>
    `},
    {slug:"disciplinarnyy-ustav",theme:"t4",title:"Дисциплинарный устав",full:"ДИСЦИПЛИНАРНЫЙ УСТАВ",sub:"1-я ОБрСпН, в/ч №12132",code:"1781813587291",meta:"Воинская дисциплина<br>в/ч №12132",toc:[],content:`
        <div class="paper-head"><div class="ministry">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</div><h1>ДИСЦИПЛИНАРНЫЙ УСТАВ</h1><div class="sub">1-я ОБрСпН · в/ч №12132</div></div>
        <div class="paper-body"><div class="doc-empty">Страница дисциплинарного устава подготовлена. Полный текст будет размещён позднее.</div></div>
    `},
    {slug:"ustav-voennoy-politsii",theme:"t5",title:"Устав военной полиции",full:"УСТАВ ВОЕННОЙ ПОЛИЦИИ",sub:"1-я ОБрСпН, в/ч №12132",code:"1781813632975",meta:"Военная полиция<br>в/ч №12132",toc:[],content:`
        <div class="paper-head"><div class="ministry">МИНИСТЕРСТВО ОБОРОНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</div><h1>УСТАВ ВОЕННОЙ ПОЛИЦИИ</h1><div class="sub">1-я ОБрСпН · в/ч №12132</div></div>
        <div class="paper-body"><div class="doc-empty">Страница устава военной полиции подготовлена. Полный текст будет размещён позднее.</div></div>
    `}
];

const NEWS_DATA = [
    {id:1,title:"ВЧ №12132 успешно прошла проверку боеготовности",excerpt:"Вчера состоялась плановая проверка боеготовности бригады. Все подразделения показали высокие результаты.",author:"Пресс-служба ВЧ",date:"2026-07-20",category:"Учения",image:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600"},
    {id:2,title:"Новые назначения в командном составе",excerpt:"Приказом Командира бригады произведены кадровые перестановки в ряде подразделений.",author:"Штаб бригады",date:"2026-07-18",category:"Кадры",image:"https://images.unsplash.com/photo-1607434475396-1d11e30d756a?w=600"},
    {id:3,title:"День открытых дверей для кандидатов на службу",excerpt:"В эту субботу состоится день открытых дверей. Приглашаются все желающие пополнить ряды ВС РФ.",author:"Военный комиссариат",date:"2026-07-15",category:"Призыв",image:"https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600"},
];

const VEHICLES_DATA = [
    {id:1,name:"Т-90М «Прорыв»",type:"Танк",status:"active",callsign:"Тигр-01",crew:"4",armament:"125 мм пушка",image:"https://images.unsplash.com/photo-1599368209488-3d1ee1b4d8e4?w=600"},
    {id:2,name:"БТР-82А",type:"Бронетранспортёр",status:"active",callsign:"Рысь-03",crew:"3+7",armament:"30 мм пушка",image:"https://images.unsplash.com/photo-1562075219-978cd44ac653?w=600"},
    {id:3,name:"БМП-3",type:"Боевая машина пехоты",status:"active",callsign:"Вепрь-02",crew:"3+7",armament:"100 мм пушка",image:"https://images.unsplash.com/photo-1585759881410-1e2f4c2f2e8c?w=600"},
    {id:4,name:"Т-72Б3М",type:"Танк",status:"maint",callsign:"Медведь-01",crew:"3",armament:"125 мм пушка",image:"https://images.unsplash.com/photo-1599368209488-3d1ee1b4d8e4?w=600"},
    {id:5,name:"УАЗ «Патриот»",type:"Автомобиль",status:"active",callsign:"Сокол-01",crew:"4",armament:"Пулемёт ПК",image:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600"},
    {id:6,name:"Камаз-43118",type:"Грузовой автомобиль",status:"active",callsign:"Груз-01",crew:"2",armament:"-",image:"https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600"},
    {id:7,name:"Ми-28НМ",type:"Вертолёт",status:"retired",callsign:"Ночной охотник-01",crew:"2",armament:"Противотанковые ракеты",image:"https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600"},
    {id:8,name:"Ка-52",type:"Вертолёт",status:"active",callsign:"Аллигатор-01",crew:"2",armament:"Штурмовые ракеты",image:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600"},
];

const LOCATIONS_DATA = [
    {id:1,name:"Штаб бригады",desc:"Центральное командование",x:45,y:40,icon:"HQ"},
    {id:2,name:"Казарма ВП",desc:"Военная полиция",x:25,y:55,icon:"unit"},
    {id:3,name:"Казарма ССО",desc:"Силы специальных операций",x:70,y:30,icon:"unit"},
    {id:4,name:"Казарма РОиО",desc:"Рота охраны и обеспечения",x:60,y:65,icon:"unit"},
    {id:5,name:"Мед. рота",desc:"Медицинское подразделение",x:40,y:70,icon:"med"},
    {id:6,name:"КПП №1",desc:"Главный контрольно-пропускной пункт",x:20,y:40,icon:"gate"},
    {id:7,name:"КПП №2",desc:"Запасной КПП",x:80,y:50,icon:"gate"},
    {id:8,name:"Полигон",desc:"Учебный полигон",x:50,y:20,icon:"target"},
    {id:9,name:"Парковка",desc:"Автопарк и гараж",x:75,y:75,icon:"parking"},
    {id:10,name:"Склад",desc:"Склад боеприпасов",x:30,y:25,icon:"warehouse"},
];

let currentUser = null;
let currentPage = 'home';

const $ = id => document.getElementById(id);
const app = $('app');
const overlay = $('overlay');
const progressBar = $('progressBar');
const navLinks = document.querySelectorAll('.nav a');
const loginModal = $('loginModal');
const registerModal = $('registerModal');

function init() {
    checkAuth();
    setupEventListeners();
    route();
    window.addEventListener('hashchange', route);
    window.addEventListener('scroll', updateProgress, { passive: true });
}

async function checkAuth() {
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
        currentUser = session.user;
        updateAuthUI();
    }
    supabase.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        updateAuthUI();
    });
}

function updateAuthUI() {
    const loginBtn = $('loginBtn');
    if (currentUser) {
        loginBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
        loginBtn.title = 'Авторизован';
    } else {
        loginBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
        loginBtn.title = 'Вход';
    }
}

function setupEventListeners() {
    $('goHome').addEventListener('click', () => location.hash = '#home');
    $('mobileMenu').addEventListener('click', toggleMobileMenu);
    $('loginBtn').addEventListener('click', () => {
        if (currentUser) {
            showAdminPanel();
        } else {
            openModal('login');
        }
    });
    $('closeLogin').addEventListener('click', () => closeModal('login'));
    $('closeRegister').addEventListener('click', () => closeModal('register'));
    $('showRegister').addEventListener('click', (e) => { e.preventDefault(); closeModal('login'); openModal('register'); });
    $('showLogin').addEventListener('click', (e) => { e.preventDefault(); closeModal('register'); openModal('login'); });
    $('loginForm').addEventListener('submit', handleLogin);
    $('registerForm').addEventListener('submit', handleRegister);
    loginModal.addEventListener('click', (e) => { if (e.target === loginModal) closeModal('login'); });
    registerModal.addEventListener('click', (e) => { if (e.target === registerModal) closeModal('register'); });
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const menu = $('mobileMenu');
    nav.classList.toggle('open');
    menu.classList.toggle('active');
}

function openModal(type) {
    if (type === 'login') {
        loginModal.classList.add('active');
    } else {
        registerModal.classList.add('active');
    }
}

function closeModal(type) {
    if (type === 'login') {
        loginModal.classList.remove('active');
        $('loginForm').reset();
        $('loginError').classList.remove('show');
    } else {
        registerModal.classList.remove('active');
        $('registerForm').reset();
        $('regError').classList.remove('show');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    if (!supabase) {
        showToast('Подключите Supabase для авторизации', 'error');
        return;
    }
    const email = $('loginEmail').value;
    const password = $('loginPassword').value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        $('loginError').textContent = error.message;
        $('loginError').classList.add('show');
    } else {
        closeModal('login');
        showToast('Успешная авторизация', 'success');
        showAdminPanel();
    }
}

async function handleRegister(e) {
    e.preventDefault();
    if (!supabase) {
        showToast('Подключите Supabase для регистрации', 'error');
        return;
    }
    const email = $('regEmail').value;
    const password = $('regPassword').value;
    const callsign = $('regCallsign').value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        $('regError').textContent = error.message;
        $('regError').classList.add('show');
    } else {
        if (data.user) {
            await supabase.from('profiles').insert([{ id: data.user.id, callsign }]);
        }
        closeModal('register');
        showToast('Регистрация успешна', 'success');
    }
}

function showToast(message, type = 'success') {
    const container = $('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function showAdminPanel() {
    if (!currentUser) {
        showToast('Необходима авторизация', 'error');
        return;
    }
    location.hash = '#admin';
}

function updateProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const s = window.scrollY;
    progressBar.style.width = h > 0 ? Math.min((s / h) * 100, 100) + '%' : '0';
}

function transition(fn) {
    overlay.classList.add('active');
    setTimeout(() => {
        fn();
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => overlay.classList.remove('active'), 60);
    }, 350);
}

function route() {
    const hash = location.hash || '#home';
    const [page, param] = hash.slice(1).split('/');
    
    updateNavActive(page);
    
    switch (page) {
        case 'home':
            renderHome();
            break;
        case 'gallery':
            renderGallery();
            break;
        case 'news':
            renderNews();
            break;
        case 'autopark':
            renderAutopark();
            break;
        case 'map':
            renderMap();
            break;
        case 'documents':
            if (param) {
                renderDoc(param);
            } else {
                renderDocuments();
            }
            break;
        case 'admin':
            renderAdmin();
            break;
        default:
            renderHome();
    }
}

function updateNavActive(page) {
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function renderHome() {
    currentPage = 'home';
    document.title = 'ВС РФ — в/ч №12132';
    app.innerHTML = `
        <section class="hero">
            <div class="container hero-grid">
                <div class="hero-content">
                    <span class="pill">Боеспособность и дисциплина</span>
                    <h1>Вооружённые Силы <span>Российской Федерации</span></h1>
                    <p class="hero-lead">1-я отдельная гвардейская бригада специального назначения (ОБрСпН), в/ч №12132. Элитное подразделение, обеспечивающее безопасность и оборону.</p>
                    <div class="hero-actions">
                        <a class="btn btn-gold" href="#documents">Уставы</a>
                        <a class="btn btn-ghost" href="#news">Новости</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat">
                            <div class="stat-value">12132</div>
                            <div class="stat-label">№ ВЧ</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">8</div>
                            <div class="stat-label">Подразделений</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">24/7</div>
                            <div class="stat-label">Готовность</div>
                        </div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-glow"></div>
                    <div class="hero-emblem">
                        <div class="emblem-outer"></div>
                        <div class="emblem-inner"></div>
                        <div class="emblem-core">ВС</div>
                        <div class="emblem-rays">
                            <svg viewBox="0 0 100 100">
                                ${Array.from({length: 12}, (_, i) => {
                                    const angle = (i * 30) * Math.PI / 180;
                                    const x1 = 50 + 35 * Math.cos(angle);
                                    const y1 = 50 + 35 * Math.sin(angle);
                                    const x2 = 50 + 48 * Math.cos(angle);
                                    const y2 = 50 + 48 * Math.sin(angle);
                                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(205,168,90,0.3)" stroke-width="1"/>`;
                                }).join('')}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="about">
            <div class="container">
                <div class="section-header">
                    <span class="badge">О бригаде</span>
                    <h2 class="section-title">1-я ОБрСпН</h2>
                    <p class="section-desc">Элитное подразделение специального назначения, выполняющее задачи любой сложности</p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/></svg>
                        </div>
                        <h3>Штаб бригады</h3>
                        <p>Центральный командный пункт, осуществляющий общее руководство и координацию всех подразделений.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                        </div>
                        <h3>Силы специальных операций</h3>
                        <p>Высокоподготовленное подразделение для выполнения разведывательных и специальных задач.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <h3>Военная полиция</h3>
                        <p>Обеспечение правопорядка и воинской дисциплины, патрулирование и задержание нарушителей.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="quick-links">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Разделы сайта</span>
                    <h2 class="section-title">Навигация</h2>
                </div>
                <div class="features-grid">
                    <a href="#gallery" class="feature-card" style="text-decoration:none;color:inherit">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>
                        </div>
                        <h3>Галерея</h3>
                        <p>Фотографии территории, техники и мероприятий бригады.</p>
                    </a>
                    <a href="#autopark" class="feature-card" style="text-decoration:none;color:inherit">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
                        </div>
                        <h3>Автопарк</h3>
                        <p>Транспортные средства и военная техника бригады.</p>
                    </a>
                    <a href="#map" class="feature-card" style="text-decoration:none;color:inherit">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        </div>
                        <h3>Карта</h3>
                        <p>Интерактивная карта расположения объектов бригады.</p>
                    </a>
                </div>
            </div>
        </section>
    `;
    app.style.animation = 'fadeIn .5s ease';
}

function renderGallery() {
    currentPage = 'gallery';
    document.title = 'Галерея — ВС РФ · в/ч №12132';
    const images = [
        { src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800', title: 'Учения бригады', wide: true },
        { src: 'https://images.unsplash.com/photo-1607434475396-1d11e30d756a?w=600', title: 'Личный состав' },
        { src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600', title: 'Построение' },
        { src: 'https://images.unsplash.com/photo-1562075219-978cd44ac653?w=600', title: 'Бронетехника' },
        { src: 'https://images.unsplash.com/photo-1599368209488-3d1ee1b4d8e4?w=600', title: 'Танки Т-90' },
        { src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', title: 'Автомобильная техника' },
        { src: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600', title: 'Авиация' },
        { src: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600', title: 'Вертолёты' },
    ];
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Фотоматериалы</span>
                    <h2 class="section-title">Галерея в/ч №12132</h2>
                    <p class="section-desc">Фотографии территории, техники и мероприятий бригады</p>
                </div>
                <div class="gallery-grid">
                    ${images.map((img, i) => `
                        <div class="gallery-item ${img.wide ? 'wide' : ''}">
                            <img src="${img.src}" alt="${img.title}" loading="lazy">
                            <div class="gallery-overlay"><span>${img.title}</span></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
    app.style.animation = 'fadeIn .5s ease';
}

function renderNews() {
    currentPage = 'news';
    document.title = 'Новости — ВС РФ · в/ч №12132';
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Информация</span>
                    <h2 class="section-title">Новости бригады</h2>
                    <p class="section-desc">Последние события и объявления</p>
                </div>
                <div class="news-grid">
                    ${NEWS_DATA.map(news => `
                        <article class="news-card">
                            <div class="news-image">
                                <img src="${news.image}" alt="${news.title}" loading="lazy">
                                <div class="overlay"></div>
                                <span class="news-badge">${news.category}</span>
                            </div>
                            <div class="news-content">
                                <div class="news-meta">
                                    <span>${formatDate(news.date)}</span>
                                </div>
                                <h3>${news.title}</h3>
                                <p>${news.excerpt}</p>
                                <div class="news-actions">
                                    <div class="news-author">
                                        <div class="news-avatar">${news.author.charAt(0)}</div>
                                        <span>${news.author}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
    app.style.animation = 'fadeIn .5s ease';
}

function renderAutopark() {
    currentPage = 'autopark';
    document.title = 'Автопарк — ВС РФ · в/ч №12132';
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Техника</span>
                    <h2 class="section-title">Автопарк бригады</h2>
                    <p class="section-desc">Транспортные средства и вооружение</p>
                </div>
                <div class="autopark-grid">
                    ${VEHICLES_DATA.map(v => `
                        <div class="vehicle-card">
                            <div class="vehicle-image">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    ${v.type.includes('Танк') ? '<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>' : 
                                      v.type.includes('Вертолёт') ? '<path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h8v6h10v8zM7 9H5v2h2V9zm0 4H5v2h2v-2zm4-4H9v2h2V9zm0 4H9v2h2v-2z"/>' :
                                      '<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>'}
                                </svg>
                                <span class="vehicle-status ${v.status}">${v.status === 'active' ? 'В строю' : v.status === 'maint' ? 'На обслуживании' : 'Списан'}</span>
                            </div>
                            <div class="vehicle-content">
                                <h3>${v.name}</h3>
                                <div class="vehicle-meta">
                                    <span class="vehicle-tag">${v.type}</span>
                                    <span class="vehicle-tag">${v.callsign}</span>
                                </div>
                                <div class="vehicle-meta" style="margin-top:8px">
                                    <span class="vehicle-tag">Экипаж: ${v.crew}</span>
                                    <span class="vehicle-tag">${v.armament}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
    app.style.animation = 'fadeIn .5s ease';
}

function renderMap() {
    currentPage = 'map';
    document.title = 'Карта — ВС РФ · в/ч №12132';
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Локации</span>
                    <h2 class="section-title">Карта в/ч №12132</h2>
                    <p class="section-desc">Расположение объектов на территории бригады</p>
                </div>
                <div class="map-container">
                    <div class="map-grid">
                        <div class="map-main" id="mapMain">
                            <div class="map-grid-lines"></div>
                            ${LOCATIONS_DATA.map(loc => `
                                <div class="map-marker" style="left:${loc.x}%;top:${loc.y}%" data-label="${loc.name}" data-id="${loc.id}" title="${loc.name}">
                                    ${getLocationIcon(loc.icon)}
                                </div>
                            `).join('')}
                        </div>
                        <div class="map-sidebar">
                            <h3>Объекты</h3>
                            <ul class="location-list">
                                ${LOCATIONS_DATA.map(loc => `
                                    <li class="location-item" data-id="${loc.id}">
                                        <h4>${loc.name}</h4>
                                        <p>${loc.desc}</p>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    setupMapListeners();
    app.style.animation = 'fadeIn .5s ease';
}

function getLocationIcon(type) {
    const icons = {
        HQ: '🏛',
        unit: '🏢',
        med: '🏥',
        gate: '🚪',
        target: '🎯',
        parking: '🅿',
        warehouse: '📦'
    };
    return icons[type] || '📍';
}

function setupMapListeners() {
    const markers = document.querySelectorAll('.map-marker');
    const items = document.querySelectorAll('.location-item');
    
    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const id = marker.dataset.id;
            items.forEach(item => item.classList.remove('active'));
            document.querySelector(`.location-item[data-id="${id}"]`)?.classList.add('active');
        });
    });
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            markers.forEach(marker => marker.style.transform = '');
            document.querySelector(`.map-marker[data-id="${id}"]`)?.style.setProperty('transform', 'scale(1.3)');
        });
    });
}

function renderDocuments() {
    currentPage = 'documents';
    document.title = 'Уставы — ВС РФ · в/ч №12132';
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Нормативные документы</span>
                    <h2 class="section-title">Уставы подразделения</h2>
                    <p class="section-desc">Внутренние уставы и регламенты 1-й ОБрСпН</p>
                </div>
                <div class="docs-grid">
                    ${DOCS_DATA.map(doc => `
                        <a class="book-card" href="#documents/${doc.slug}">
                            <div class="book-3d">
                                <div class="b-spine"></div>
                                <div class="b-front ${doc.theme}">
                                    <div>
                                        <div class="b-label">ВС РФ</div>
                                        <h3>${doc.title}</h3>
                                        <div class="b-meta">1-я ОБрСпН<br>в/ч №12132</div>
                                    </div>
                                    <div class="b-code">${doc.code}</div>
                                </div>
                                <div class="b-pages"></div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
    app.style.animation = 'fadeIn .5s ease';
}

function renderDoc(slug) {
    const doc = DOCS_DATA.find(d => d.slug === slug);
    if (!doc) {
        location.hash = '#documents';
        return;
    }
    currentPage = 'document';
    document.title = `${doc.title} — ВС РФ · в/ч №12132`;
    const tocHtml = doc.toc.length > 0 ? `
        <div class="mini-book">
            <div class="book-3d">
                <div class="b-spine"></div>
                <div class="b-front ${doc.theme}">
                    <div>
                        <div class="b-label">ВС РФ</div>
                        <h3>${doc.title}</h3>
                        <div class="b-meta">${doc.meta}</div>
                    </div>
                    <div class="b-code">${doc.code}</div>
                </div>
                <div class="b-pages"></div>
            </div>
        </div>
        <div class="toc-label">Оглавление</div>
        <ul class="toc">
            ${doc.toc.map(t => `<li><a href="#${t.id}">${t.label}</a></li>`).join('')}
        </ul>
    ` : `<p style="padding:12px 14px;color:var(--muted);font-size:13px">Содержание будет добавлено</p>`;
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="doc-toolbar">
                    <button class="back-btn" onclick="location.hash='#documents'">
                        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        К уставам
                    </button>
                    <div class="doc-chips">
                        <span class="chip">${doc.code}</span>
                        <span class="chip">1-я ОБрСпН · в/ч №12132</span>
                    </div>
                </div>
                <div class="doc-grid">
                    <aside class="doc-sidebar">
                        <div class="doc-sidebar-inner">
                            ${tocHtml}
                        </div>
                    </aside>
                    <article class="paper">
                        ${doc.content}
                    </article>
                </div>
            </div>
        </section>
    `;
    setupTocScroll(doc.toc);
    app.style.animation = 'fadeIn .5s ease';
}

function setupTocScroll(toc) {
    if (!toc.length) return;
    const tocLinks = document.querySelectorAll('.toc a');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(a => a.classList.remove('active'));
                document.querySelector(`.toc a[href="#${entry.target.id}"]`)?.classList.add('active');
            }
        });
    }, { rootMargin: '-80px 0px -60% 0px' });
    toc.forEach(t => {
        document.getElementById(t.id)?.let(e => observer.observe(e));
    });
}

function renderAdmin() {
    currentPage = 'admin';
    document.title = 'Админ-панель — ВС РФ · в/ч №12132';
    if (!currentUser) {
        app.innerHTML = `
            <section class="section">
                <div class="container">
                    <div class="card" style="text-align:center;padding:60px">
                        <h2 style="margin-bottom:20px">Доступ запрещён</h2>
                        <p style="color:var(--muted);margin-bottom:24px">Необходимо авторизоваться для доступа к админ-панели</p>
                        <button class="btn btn-gold" onclick="location.hash='#home'">На главную</button>
                    </div>
                </div>
            </section>
        `;
        return;
    }
    app.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="admin-panel">
                    <div class="admin-header">
                        <h3>Админ-панель</h3>
                        <button class="btn btn-outline btn-sm" onclick="location.hash='#home'">Выход</button>
                    </div>
                    <div class="admin-section">
                        <h4>Добавить новость</h4>
                        <form id="newsForm">
                            <div class="form-group">
                                <label>Заголовок</label>
                                <input type="text" id="newsTitle" required placeholder="Введите заголовок">
                            </div>
                            <div class="form-group">
                                <label>Текст новости</label>
                                <textarea id="newsContent" required placeholder="Текст новости..."></textarea>
                            </div>
                            <div class="form-group">
                                <label>Категория</label>
                                <select id="newsCategory">
                                    <option value="Учения">Учения</option>
                                    <option value="Кадры">Кадры</option>
                                    <option value="Призыв">Призыв</option>
                                    <option value="Общее">Общее</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-gold">Опубликовать</button>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h4>Список новостей</h4>
                        <div id="newsList">
                            ${NEWS_DATA.map(n => `
                                <div style="padding:16px;border:1px solid var(--line);border-radius:12px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
                                    <div>
                                        <strong>${n.title}</strong>
                                        <p style="color:var(--muted);font-size:12px;margin-top:4px">${n.date} · ${n.category}</p>
                                    </div>
                                    <button class="btn btn-outline btn-sm" onclick="deleteNews(${n.id})">Удалить</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    $('newsForm').addEventListener('submit', handleAddNews);
    app.style.animation = 'fadeIn .5s ease';
}

async function handleAddNews(e) {
    e.preventDefault();
    if (!supabase) {
        showToast('Подключите Supabase для сохранения новостей', 'error');
        return;
    }
    const title = $('newsTitle').value;
    const content = $('newsContent').value;
    const category = $('newsCategory').value;
    const { error } = await supabase.from('news').insert([{ title, content, category, author: currentUser.email }]);
    if (error) {
        showToast('Ошибка: ' + error.message, 'error');
    } else {
        showToast('Новость опубликована', 'success');
        $('newsForm').reset();
        location.hash = '#news';
    }
}

async function deleteNews(id) {
    if (!supabase) {
        showToast('Подключите Supabase для удаления новостей', 'error');
        return;
    }
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) {
        showToast('Ошибка: ' + error.message, 'error');
    } else {
        showToast('Новость удалена', 'success');
        renderAdmin();
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

init();
