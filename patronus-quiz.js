const patronusData = {
    leon: {name: 'León', emoji: '🦁', description: 'Tu Patronus es un león, símbolo de coraje y liderazgo. Eres valiente y proteges a los que amas ferozmente.', traits: ['Valiente', 'Líder', 'Protector', 'Noble']},
    aguila: {name: 'Águila', emoji: '🦅', description: 'Tu Patronus es un águila, representa visión y sabiduría. Ves el panorama completo y piensas estratégicamente.', traits: ['Sabio', 'Visionario', 'Libre', 'Perspicaz']},
    lobo: {name: 'Lobo', emoji: '🐺', description: 'Tu Patronus es un lobo, símbolo de lealtad y familia. Valoras profundamente tus conexiones.', traits: ['Leal', 'Protector', 'Social', 'Intuitivo']},
    ciervo: {name: 'Ciervo', emoji: '🦌', description: 'Tu Patronus es un ciervo, como el de James Potter. Representa gracia y nobleza.', traits: ['Noble', 'Gentil', 'Fuerte', 'Protector']},
    caballo: {name: 'Caballo', emoji: '🐴', description: 'Tu Patronus es un caballo, símbolo de libertad y fuerza. Eres independiente y poderoso.', traits: ['Libre', 'Fuerte', 'Leal', 'Veloz']},
    zorro: {name: 'Zorro', emoji: '🦊', description: 'Tu Patronus es un zorro, representa astucia e inteligencia. Eres ingenioso y adaptable.', traits: ['Astuto', 'Inteligente', 'Adaptable', 'Juguetón']},
    oso: {name: 'Oso', emoji: '🐻', description: 'Tu Patronus es un oso, símbolo de fuerza y protección. Eres poderoso pero gentil con los tuyos.', traits: ['Fuerte', 'Protector', 'Paciente', 'Valiente']},
    nutria: {name: 'Nutria', emoji: '🦦', description: 'Tu Patronus es una nutria, como el de Hermione. Eres juguetón, inteligente y adaptable.', traits: ['Juguetón', 'Inteligente', 'Adaptable', 'Social']},
    gato: {name: 'Gato', emoji: '🐱', description: 'Tu Patronus es un gato, símbolo de independencia y misterio. Eres observador y selectivo.', traits: ['Independiente', 'Observador', 'Misterioso', 'Ágil']},
    fenix: {name: 'Fénix', emoji: '🔥', description: 'Tu Patronus es un fénix, extremadamente raro! Representa renacimiento y fuerza. Superas cualquier adversidad.', traits: ['Resiliente', 'Poderoso', 'Renacido', 'Único']}
};

const questions = [
    {question: '¿Qué cualidad te describe mejor?', options: [{text: 'Soy valiente y confronto mis miedos', type: 'leon'}, {text: 'Soy sabio y pienso antes de actuar', type: 'aguila'}, {text: 'Soy leal y protejo a mi manada', type: 'lobo'}, {text: 'Soy astuto y me adapto rápidamente', type: 'zorro'}]},
    {question: 'En una situación de peligro...', options: [{text: 'Ataco directamente al enemigo', type: 'leon'}, {text: 'Uso mi inteligencia para encontrar una salida', type: 'zorro'}, {text: 'Protejo a los demás primero', type: 'oso'}, {text: 'Busco ayuda de mi grupo', type: 'lobo'}]},
    {question: '¿Qué ambiente prefieres?', options: [{text: 'Montañas altas y cielo abierto', type: 'aguila'}, {text: 'Bosques densos y misteriosos', type: 'zorro'}, {text: 'Llanuras abiertas donde correr libre', type: 'caballo'}, {text: 'Cerca del agua', type: 'nutria'}]},
    {question: 'Tu mayor fortaleza es...', options: [{text: 'Mi coraje inquebrantable', type: 'leon'}, {text: 'Mi capacidad de adaptación', type: 'nutria'}, {text: 'Mi lealtad a los míos', type: 'lobo'}, {text: 'Mi independencia', type: 'gato'}]},
    {question: '¿Cómo pasas tu tiempo libre?', options: [{text: 'Explorando y buscando aventuras', type: 'caballo'}, {text: 'Leyendo y aprendiendo cosas nuevas', type: 'aguila'}, {text: 'Con amigos y familia', type: 'lobo'}, {text: 'Solo, en mis propios pensamientos', type: 'gato'}]},
    {question: 'Cuando tienes un problema...', options: [{text: 'Lo enfrento de inmediato', type: 'leon'}, {text: 'Busco múltiples soluciones creativas', type: 'zorro'}, {text: 'Pido consejo a quienes confío', type: 'ciervo'}, {text: 'Me retiro a pensar en soledad', type: 'gato'}]},
    {question: 'Tu recuerdo más feliz es...', options: [{text: 'Un momento de victoria personal', type: 'leon'}, {text: 'Un descubrimiento o logro intelectual', type: 'aguila'}, {text: 'Un momento con seres queridos', type: 'lobo'}, {text: 'Superar una gran adversidad', type: 'fenix'}]}
];

let currentQuestion = 0, quizStartTime = 0;
let patronusScores = Object.keys(patronusData).reduce((acc, key) => ({...acc, [key]: 0}), {});

const elements = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    counter: document.getElementById('question-counter'),
    progress: document.getElementById('progress'),
    patronusAnimal: document.getElementById('patronus-animal'),
    patronusName: document.getElementById('patronus-name'),
    patronusDescription: document.getElementById('patronus-description'),
    patronusTraits: document.getElementById('patronus-traits')
};

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', resetQuiz);
document.getElementById('share-btn').addEventListener('click', () => shareResult('copy'));

function startQuiz() {
    quizStartTime = Date.now();
    elements.welcome.classList.remove('active');
    elements.quiz.classList.add('active');
    showQuestion();
    if (typeof analytics !== 'undefined') analytics.trackQuizStart('patronus');
}

function showQuestion() {
    const q = questions[currentQuestion];
    elements.questionText.textContent = q.question;
    elements.counter.textContent = 'Pregunta ' + (currentQuestion + 1) + ' de ' + questions.length;
    elements.progress.style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
    elements.optionsContainer.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => selectOption(opt.type, btn));
        elements.optionsContainer.appendChild(btn);
    });
}

function selectOption(type, el) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    patronusScores[type]++;
    setTimeout(() => { currentQuestion++; if (currentQuestion < questions.length) showQuestion(); else showResult(); }, 500);
}

function showResult() {
    elements.quiz.classList.remove('active');
    elements.result.classList.add('active');
    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
    let winner = Object.keys(patronusScores).reduce((a, b) => patronusScores[a] > patronusScores[b] ? a : b);
    if (Math.random() < 0.05) winner = 'fenix';
    const patronus = patronusData[winner];
    elements.patronusAnimal.textContent = patronus.emoji;
    elements.patronusName.textContent = patronus.name;
    elements.patronusDescription.textContent = patronus.description;
    elements.patronusTraits.innerHTML = '<h3 style="margin-top:20px;">Características de tu Patronus:</h3>';
    patronus.traits.forEach((trait) => {
        const el = document.createElement('div');
        el.className = 'trait';
        el.textContent = trait;
        elements.patronusTraits.appendChild(el);
    });
    setupSocialShareButtons();
    if (typeof gamification !== 'undefined') { gamification.recordQuizCompletion('patronus', winner); gamification.displayAchievements('achievements-container'); }
    if (typeof analytics !== 'undefined') analytics.trackQuizCompleted('patronus', winner, timeSpent);
}

function resetQuiz() {
    currentQuestion = 0;
    patronusScores = Object.keys(patronusData).reduce((acc, key) => ({...acc, [key]: 0}), {});
    elements.result.classList.remove('active');
    elements.welcome.classList.add('active');
    elements.progress.style.width = '0%';
}

function setupSocialShareButtons() {
    const twitterBtn = document.getElementById('share-twitter');
    const facebookBtn = document.getElementById('share-facebook');
    const whatsappBtn = document.getElementById('share-whatsapp');
    if (twitterBtn) twitterBtn.addEventListener('click', () => shareResult('twitter'));
    if (facebookBtn) facebookBtn.addEventListener('click', () => shareResult('facebook'));
    if (whatsappBtn) whatsappBtn.addEventListener('click', () => shareResult('whatsapp'));
}

function shareResult(platform) {
    const patronus = elements.patronusName.textContent;
    const url = window.location.href.split('?')[0] + '?utm_source=' + platform;
    const text = 'Mi Patronus es ' + patronus + '! Descubre el tuyo';
    if (typeof gamification !== 'undefined') gamification.recordShare(platform);
    if (typeof analytics !== 'undefined') analytics.trackShare(platform, 'patronus', patronus);
    if (platform === 'twitter') window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank');
    else if (platform === 'facebook') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
    else if (platform === 'whatsapp') window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank');
    else { if (navigator.clipboard) navigator.clipboard.writeText(text + '\n' + url); showCopyNotification(); }
}

function showCopyNotification() {
    const btn = document.getElementById('share-btn');
    if (btn) { const orig = btn.textContent; btn.textContent = 'Copiado!'; setTimeout(() => btn.textContent = orig, 2000); }
}
