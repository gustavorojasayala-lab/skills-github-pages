// Datos de las casas de Hogwarts
const houses = {
    gryffindor: {
        name: 'Gryffindor',
        emoji: '🦁',
        description: '¡Felicidades! Perteneces a Gryffindor, la casa de los valientes y atrevidos. Los Gryffindor son conocidos por su coraje, determinación y caballerosidad.',
        traits: ['Valiente', 'Audaz', 'Leal', 'Caballeroso', 'Determinado'],
        color: 'gryffindor'
    },
    slytherin: {
        name: 'Slytherin',
        emoji: '🐍',
        description: '¡Felicidades! Perteneces a Slytherin, la casa de los astutos y ambiciosos. Los Slytherin son conocidos por su astucia, ambición y liderazgo.',
        traits: ['Astuto', 'Ambicioso', 'Líder', 'Ingenioso', 'Determinado'],
        color: 'slytherin'
    },
    ravenclaw: {
        name: 'Ravenclaw',
        emoji: '🦅',
        description: '¡Felicidades! Perteneces a Ravenclaw, la casa de los sabios e ingeniosos. Los Ravenclaw son conocidos por su inteligencia, creatividad y amor por el conocimiento.',
        traits: ['Inteligente', 'Creativo', 'Sabio', 'Curioso', 'Ingenioso'],
        color: 'ravenclaw'
    },
    hufflepuff: {
        name: 'Hufflepuff',
        emoji: '🦡',
        description: '¡Felicidades! Perteneces a Hufflepuff, la casa de los leales y trabajadores. Los Hufflepuff son conocidos por su lealtad, paciencia y ética de trabajo.',
        traits: ['Leal', 'Trabajador', 'Paciente', 'Justo', 'Amable'],
        color: 'hufflepuff'
    }
};

// Preguntas del cuestionario
const questions = [
    {
        question: '¿Qué cualidad valoras más en ti mismo?',
        options: [
            { text: 'El coraje para enfrentar cualquier desafío', house: 'gryffindor' },
            { text: 'La astucia para conseguir lo que quiero', house: 'slytherin' },
            { text: 'La inteligencia para resolver problemas', house: 'ravenclaw' },
            { text: 'La lealtad hacia mis amigos', house: 'hufflepuff' }
        ]
    },
    {
        question: 'Si encuentras un objeto mágico poderoso, ¿qué harías?',
        options: [
            { text: 'Lo usaría para proteger a los que amo', house: 'gryffindor' },
            { text: 'Lo estudiaría para aprovechar su poder', house: 'slytherin' },
            { text: 'Investigaría su historia y funcionamiento', house: 'ravenclaw' },
            { text: 'Lo compartiría con mis amigos', house: 'hufflepuff' }
        ]
    },
    {
        question: '¿Qué tipo de magia te interesa más?',
        options: [
            { text: 'Defensa contra las Artes Oscuras', house: 'gryffindor' },
            { text: 'Pociones y Artes Oscuras', house: 'slytherin' },
            { text: 'Encantamientos y Transformaciones', house: 'ravenclaw' },
            { text: 'Herbología y cuidado de criaturas mágicas', house: 'hufflepuff' }
        ]
    },
    {
        question: '¿Cómo prefieres pasar tu tiempo libre?',
        options: [
            { text: 'Practicando Quidditch o explorando', house: 'gryffindor' },
            { text: 'Planeando mi futuro y estrategias', house: 'slytherin' },
            { text: 'Leyendo en la biblioteca', house: 'ravenclaw' },
            { text: 'Pasando tiempo con amigos', house: 'hufflepuff' }
        ]
    },
    {
        question: 'Un compañero está siendo intimidado. ¿Qué haces?',
        options: [
            { text: 'Confronto al agresor directamente', house: 'gryffindor' },
            { text: 'Busco una forma inteligente de darle su merecido', house: 'slytherin' },
            { text: 'Reporto la situación a un profesor', house: 'ravenclaw' },
            { text: 'Consuelo a mi compañero y me quedo a su lado', house: 'hufflepuff' }
        ]
    },
    {
        question: '¿Qué animal te representa mejor?',
        options: [
            { text: 'Un león valiente y orgulloso', house: 'gryffindor' },
            { text: 'Una serpiente astuta y elegante', house: 'slytherin' },
            { text: 'Un águila sabia y observadora', house: 'ravenclaw' },
            { text: 'Un tejón leal y trabajador', house: 'hufflepuff' }
        ]
    },
    {
        question: '¿Qué te motiva más en la vida?',
        options: [
            { text: 'La aventura y la emoción', house: 'gryffindor' },
            { text: 'El éxito y el reconocimiento', house: 'slytherin' },
            { text: 'El conocimiento y la sabiduría', house: 'ravenclaw' },
            { text: 'La amistad y la comunidad', house: 'hufflepuff' }
        ]
    },
    {
        question: 'Estás en un duelo de magos. ¿Cuál es tu estrategia?',
        options: [
            { text: 'Ataque directo con hechizos poderosos', house: 'gryffindor' },
            { text: 'Usar trucos y engaños para ganar ventaja', house: 'slytherin' },
            { text: 'Analizar los movimientos del oponente primero', house: 'ravenclaw' },
            { text: 'Intentar resolver el conflicto pacíficamente', house: 'hufflepuff' }
        ]
    },
    {
        question: '¿Qué te asustaría más?',
        options: [
            { text: 'Ser considerado un cobarde', house: 'gryffindor' },
            { text: 'Fracasar en mis objetivos', house: 'slytherin' },
            { text: 'La ignorancia y no saber', house: 'ravenclaw' },
            { text: 'Perder a mis seres queridos', house: 'hufflepuff' }
        ]
    },
    {
        question: 'Si pudieras elegir un poder mágico especial, ¿cuál sería?',
        options: [
            { text: 'Superfuerza y valentía inquebrantable', house: 'gryffindor' },
            { text: 'Habilidad para convencer a cualquiera', house: 'slytherin' },
            { text: 'Conocimiento de todos los hechizos', house: 'ravenclaw' },
            { text: 'Sanar cualquier herida o dolor', house: 'hufflepuff' }
        ]
    }
];

// Variables del estado del juego
let currentQuestion = 0;
let houseScores = {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0
};

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const progress = document.getElementById('progress');
const houseCrest = document.getElementById('house-crest');
const houseName = document.getElementById('house-name');
const houseDescription = document.getElementById('house-description');
const houseTraits = document.getElementById('house-traits');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', resetQuiz);
shareBtn.addEventListener('click', shareResult);

// Funciones principales
function startQuiz() {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    questionCounter.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    // Actualizar barra de progreso
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;

    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';

    // Crear botones de opciones
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'option';
        optionBtn.textContent = option.text;
        optionBtn.addEventListener('click', () => selectOption(option.house, optionBtn));
        optionsContainer.appendChild(optionBtn);

        // Animación de entrada escalonada
        setTimeout(() => {
            optionBtn.style.opacity = '0';
            optionBtn.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                optionBtn.style.transition = 'all 0.3s ease';
                optionBtn.style.opacity = '1';
                optionBtn.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
}

function selectOption(house, optionElement) {
    // Marcar opción seleccionada
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    optionElement.classList.add('selected');

    // Incrementar puntuación de la casa
    houseScores[house]++;

    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    // Determinar la casa ganadora
    let maxScore = 0;
    let winningHouse = '';

    for (const house in houseScores) {
        if (houseScores[house] > maxScore) {
            maxScore = houseScores[house];
            winningHouse = house;
        }
    }

    // Si hay empate, elegir al azar entre las casas empatadas
    const tiedHouses = Object.keys(houseScores).filter(house => houseScores[house] === maxScore);
    if (tiedHouses.length > 1) {
        winningHouse = tiedHouses[Math.floor(Math.random() * tiedHouses.length)];
    }

    const house = houses[winningHouse];

    // Mostrar resultado
    houseCrest.textContent = house.emoji;
    houseCrest.className = `house-crest ${house.color}`;
    houseName.textContent = house.name;
    houseName.style.color = getHouseColor(house.color);
    houseDescription.textContent = house.description;

    // Mostrar rasgos
    houseTraits.innerHTML = '';
    house.traits.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = 'trait';
        traitElement.textContent = trait;
        houseTraits.appendChild(traitElement);

        // Animación de entrada
        setTimeout(() => {
            traitElement.style.opacity = '0';
            traitElement.style.transform = 'scale(0.8)';
            setTimeout(() => {
                traitElement.style.transition = 'all 0.3s ease';
                traitElement.style.opacity = '1';
                traitElement.style.transform = 'scale(1)';
            }, 50);
        }, index * 100);
    });
}

function resetQuiz() {
    currentQuestion = 0;
    houseScores = {
        gryffindor: 0,
        slytherin: 0,
        ravenclaw: 0,
        hufflepuff: 0
    };

    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    progress.style.width = '0%';
}

function shareResult() {
    const house = houseName.textContent;
    const text = `¡Acabo de ser seleccionado para ${house} en el Cuestionario de Selección de Hogwarts! 🏰✨`;

    if (navigator.share) {
        navigator.share({
            title: 'Mi Casa de Hogwarts',
            text: text,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(text);
        });
    } else {
        copyToClipboard(text);
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Cambiar texto del botón temporalmente
    const originalText = shareBtn.textContent;
    shareBtn.textContent = '¡Copiado!';
    setTimeout(() => {
        shareBtn.textContent = originalText;
    }, 2000);
}

function getHouseColor(houseClass) {
    const colors = {
        gryffindor: '#D3A625',
        slytherin: '#5D5D5D',
        ravenclaw: '#946B2D',
        hufflepuff: '#ECB939'
    };
    return colors[houseClass] || '#fff';
}

// Animación inicial
window.addEventListener('load', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.transition = 'opacity 0.6s ease';
        welcomeScreen.style.opacity = '1';
    }, 100);
});
