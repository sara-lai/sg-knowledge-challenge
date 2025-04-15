// big question: use classes for quiz and question, and construct Quiz/Question with JSON data?

// init - todo
// initQuiz to setup the quiz (randomly order questions, assign surprises, shuffle a-b-c-d options, other misc config)
// initQuestion... assign currQ, set the question UI

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
// needs to be named function, setSelected
answerBoxEls.forEach( el => {
    el.addEventListener('click', (event) => {

        answerBoxEls.forEach(el2 => el2.classList.remove('selected'));

        // add class on parent of the clicked target
        event.target.closest('.answer-box').classList.add('selected')
    })
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

// goes in init .... 
unaskedQs = [...qSamples]

// more like an id lookup here
// function getNextQuestion()
currQ = unaskedQs.shift()

// load UI with question info
// some setupQuestion() function... or initQuestion()
questionTextEl.textContent = currQ.text
answerAEl.textContent = currQ.a
answerBEl.textContent = currQ.b
answerCEl.textContent = currQ.c
answerDEl.textContent = currQ.d


