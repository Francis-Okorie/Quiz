const questions =[
    {
        question:"What is the largest Animal",
        answers:[
            {text:"Shark", correct:false},
            {text:"Whale", correct:true},
            {text:"Lion", correct:false},
            {text:"Tortise", correct:false}
        ]
    },
    {
        question:"Who is the head of the family",
        answers:[
            {text:"Mother", correct:false},
            {text:"Father", correct:true},
            {text:"Aunt", correct:false},
            {text:"Uncle", correct:false}
        ]
    },
    {
        question:"What is the capital of Lagos",
        answers:[
            {text:"ikeja", correct:true},
            {text:"ogun", correct:false},
            {text:"abuja", correct:false},
            {text:"jos", correct:false}
        ]
    }
];

const questionElement = document.querySelector(".question-header");
const answerButton = document.querySelector(".answer");
const nextButton = document.querySelector(".nextbtn")

let questionHeaderindex = 0;
let score = 0;


function startQuiz() {
    let questionHeaderindex = 0;
    let score = 0
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[questionHeaderindex];
    let questionNo = questionHeaderindex+1;
    questionElement.innerHTML=`${questionNo}. ${currentQuestion.question}`;

    

    currentQuestion.answers.forEach(answer =>{
        
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn")
        answerButton.appendChild(button);
        button.addEventListener("click", selectQuestion);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        
    });
}

function resetState (){
    nextButton.style.display="none";
    while(answerButton.firstElementChild){
        answerButton.removeChild(answerButton.firstElementChild);
    }

    
}

function selectQuestion(e){
    let selectedBtn = e.target;
    let btnDataset = selectedBtn.dataset.correct;
    if(btnDataset === "true") {
        selectedBtn.classList.add("correct");
        score++;
        console.log(score)
    }else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }button.disabled=true;
    });

    

    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questionHeaderindex}`
}

function handleNext() {
    questionHeaderindex++;
    if(questionHeaderindex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(questionHeaderindex < questions.length){
        handleNext()
    }else {
        startQuiz()
    }
});


startQuiz();