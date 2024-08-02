const questions = [
    { question: "La tierra es plana.", answer: false },
    { question: "El agua hierve a 100 grados Celsius.", answer: true },
    { question: "La velocidad de la luz es menor que la del sonido.", answer: false },
    { question: "El oro es un metal precioso.", answer: true },
    { question: "Los seres humanos tienen cinco sentidos.", answer: true },
    { question: "El Monte Everest es la montaña más alta del mundo.", answer: true },
    { question: "La fotosíntesis es un proceso realizado por las plantas.", answer: true },
    { question: "El Sahara es el desierto más grande del mundo.", answer: true }
];

let currentQuestionIndex = -1;
let puntos = 0;

function mezclador() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function mostrarPregunta() {
    const questionContainer = document.getElementById('que');
    questionContainer.innerHTML = '';
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.id = 'q' + currentQuestionIndex;

        const span = document.createElement('span');
        span.innerText = question.question;
        questionElement.appendChild(span);

        const trueButton = document.createElement('button');
        trueButton.innerText = 'Verdadero';
        trueButton.onclick = () => responder(currentQuestionIndex, true);
        questionElement.appendChild(trueButton);

        const falseButton = document.createElement('button');
        falseButton.innerText = 'Falso';
        falseButton.onclick = () => responder(currentQuestionIndex, false);
        questionElement.appendChild(falseButton);

        questionContainer.appendChild(questionElement);
    }
}

function responder(questionIndex, userAnswer) {
    const question = questions[questionIndex];
    const questionElement = document.getElementById('q' + questionIndex);

    if (userAnswer === question.answer) {
        questionElement.classList.remove('false');
        questionElement.classList.add('true');
        puntos++;
        document.getElementById('puntos').innerText = 'Respuestas correctas: ' + puntos;
    } else {
        questionElement.classList.remove('true');
        questionElement.classList.add('false');
        const correctAnswer = document.createElement('p');
        correctAnswer.className = 'correct-answer';
        correctAnswer.innerText = `Respuesta correcta: ${question.answer ? 'Verdadero' : 'Falso'}`;
        questionElement.appendChild(correctAnswer);
    }

    deshabilitarBotones(questionElement);
}

function deshabilitarBotones(questionElement) {
    const buttons = questionElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

function proximaPregunta() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    document.getElementById('que').style.display = 'none';
    document.getElementById('BtnS').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('finalScore').innerText = `Cuestionario completado. Respuestas correctas: ${puntos} de ${questions.length}`;
}



const resultImage = document.getElementById('resultImage');{
            resultImage.src = 'fin.png'; // Ruta relativa a la imagen en tu equipo
            resultImage.style.display = 'block';
        }
            

function reiniciarCuestionario() {
    currentQuestionIndex = -1;
    puntos = 0;
    mezclador();
    document.getElementById('que').style.display = 'block';
    document.getElementById('BtnS').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('puntos').innerText = 'Respuestas correctas: 0';
    proximaPregunta();
}

mezclador();
proximaPregunta();