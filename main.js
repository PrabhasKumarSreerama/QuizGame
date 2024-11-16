// defining the quiz data as an array of objects
const quizData = [
    {
        question: "What is full form of HTML?",
        a: "HYPERTEXT MARKUP LAMDA",
        b: "HYPERTEXT MARKUP LANG",
        c: "Hypertext Markup Language",
        d: "None of the Above",
        correct: "c"
    },
    {
        question: "What is full form of MERN?",
        a: "MONGODB EXPRESS REACT NODE",
        b: "MEDIA EXPRESS REACT NODE",
        c: "MONGODB EXAMPLE REACT NODE",
        d: "None of the Above",
        correct: "a"

    },

    {
        question: "Es6 Features",
        a: "var, function",
        b: "let, const, rest, spread",
        c: "return, function, var",
        d: "None of the Above",
        correct: "b"
    }
];

// Get the references to HTML elements we need manipulate, reading

    const questionEl = document.getElementById("question");
    const answerEls = document.querySelectorAll('.answer');
    const a_text = document.getElementById("a_text");
    const b_text = document.getElementById("b_text");
    const c_text = document.getElementById("c_text");
    const d_text = document.getElementById("d_text");
    const submitBtn = document.getElementById("submit");
    const feddbackEl = document.getElementById("feedback");

    let currentQuiz = 0; //index of the current quiz question
    let score = 0; //users score

    // function to load the current quiz question and answers

    function loadQuiz() {
        deselectAnswers();
        // retrieve the current question's data
        const currentQuizData = quizData[currentQuiz]

        // update the question text and the answer options
        questionEl.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;

        feddbackEl.innerText = "";

    }

    // function to deselct any selected answers
    function deselectAnswers() {
        answerEls.forEach((answerEl) => (answerEl.checked = false)); //unchecking all the radio inputs
    }

    // funtion to get the ID of the seelcted answer
    
    function getSelected() {
        let answer;
        answerEls.forEach((answerEl) => {
            if(answerEl.checked){
                answer = answerEl.id
            }
        })

        return answer
    }

    // load the quiz

    loadQuiz();


    // event listener  for the submit button
    submitBtn.addEventListener("click", () => {
        // get the ID of the selected answer ID
        const selectedAnswer = getSelected();

        // check if the answer was selected or not 

        if(selectedAnswer){
            const currentQuizData = quizData[currentQuiz]; //get the current question's data

            // check if the selected answer is correct or not
            if(selectedAnswer === currentQuizData.correct) {
                score++ //increase the score
                feddbackEl.innerText = "You have answered Correct!"
                feddbackEl.classList.add("correct-answer")
            } else {
                feddbackEl.innerText = `Wrong! The correct answer is "${document.getElementById(`${currentQuizData.correct}_text`).innerText}"`;
                feddbackEl.classList.remove("correct-answer")
            }
            currentQuiz++ //move to the next question

            // delay the loading of the next qustionz

            setTimeout(() => {
              if(currentQuiz < quizData.length){
                loadQuiz(); //load the next question if it is availble 
              }  else {
                // diplay the user final score and restart option
                document.getElementById("quiz").innerHTML = `
                <h2>You have answerted ${score}/${quizData.length} questions correctly.</h2>
                <button onclick = "location.reload()">Restart Quiz </button>
                `;
              }
            }, 4000)
        }
    });
