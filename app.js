// test https://v8.dev/features/import-assertions
// import json from 'test.json' assert { type: 'json' };
// console.log(json)


// big question: use classes for quiz and question, and construct Quiz/Question with JSON data?
// question: scrap ABCD options in the data, use options: ["first","second","third"] and correct: "correct answer"
// ^ not all questions need to be ABCD type

// next steps
// setup the UI upper left: hearts / items / quiz name
// setup the UI upper right: timer UI
// init & properly get/prepare full quiz & question
// setup a render for all the render cases.... 

// state overview:

let currQ = {} // use obj not id so can do currQ.answer
let unaskedQs = []
let prevQs = []
let wrongAnswers = [] // in case want to review at end
let score = 0 // num correct, display when lose (track high score until then?)

let userWon = false
let userLost = false
let answeredWrong = false
let answeredRight = false

let userAnswer = '' // maybe not here

let timeAllowed = 20 // can be changed with chillicrabs
let panicMode = false
let hearts = 3 // or constant for start out heart value?
let durians = 0
let chilliCrabs = 0

// should have state for adding items? each features a different UI message/logic
let gotHeart = false
let gotDurian = false
let gotChilliCrab = false
let gotScammed = false

// cached el references
const questionTextEl = document.querySelector('#question-text')

const answerBoxEls = document.querySelectorAll('.answer-box')

const answerAEl = document.querySelector('#a .answer-text')
const answerBEl = document.querySelector('#b .answer-text')
const answerCEl = document.querySelector('#c .answer-text')
const answerDEl = document.querySelector('#d .answer-text')

const answerSubmitEl = document.querySelector('#submit-q')

// answer selection 
// todo - let select with A B C D keys tyoo
function handleSelected(event){
    answerBoxEls.forEach(el2 => el2.classList.remove('selected'))    
    event.target.closest('.answer-box').classList.add('selected') // add class on parent of the clicked target
}
answerBoxEls.forEach( el => {
    el.addEventListener('click', handleSelected)
})

// todo - anti cheating events

// answer submission, much logic here
// todo use enter as well ; put this in named function.... handleSubmission
answerSubmitEl.addEventListener('click', (event) => {
    userAnswer = document.querySelector('.answer-container .selected').id

    // todo - some suspsense/thinking UI like 1 second

    if (currQ.answer === userAnswer){
        alert('correct')
        // set UI checkmark/success mode 
        // move q to answered
        // shift next q 
        // check for winner
        // check for surprises
        // serve surprises UI if need to + update items
        // some delay so briefly lingers on page before next
        // setup next q....  includes reset timer
    } else {
        // set UI for wrong
        // move q to missed
        // check for loser
        // remove heart
        // some delay so briefly lingers on page before next        
        // setup next q.... 
    }
})

// redeem items events
// click to redeem chillicrab
// click to redeem durian

function initQuiz(){
    unaskedQs = [...sampleQs] // tmp

    // steps / todo
    // randomize order of questions
    // randomly assign surprises
    // initiate hearts 
    // launch the first question

    initQuestion()
}
function initQuestion(){

    currQ = unaskedQs.shift() // todo - use id lookup, maybe function getNextQuestion()

    // steps / todo
    // randomize the ABCD
    // set the question UI 
    questionTextEl.textContent = currQ.text
    answerAEl.textContent = currQ.a
    answerBEl.textContent = currQ.b
    answerCEl.textContent = currQ.c
    answerDEl.textContent = currQ.d
}
initQuiz()



