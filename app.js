// maybe use json
// https://v8.dev/features/import-assertions
// import json from 'test.json' assert { type: 'json' };
// console.log(json)

// big question: use classes for quiz and question, and construct Quiz/Question with JSON data?
// question: scrap ABCD options in the data, use options: ["first","second","third"] and correct: "correct answer"
// ^ not all questions need to be ABCD type

// next steps:
// "suspensful pauses", for right/wrong screen & for got items screen
// do the status bar type of render where it creates all the elements from state each time
// randomly order questions
// randomly assign surprises to questions
// change data to use options: ["first","second","third"] and correct: "correct answer" ; add more sample questions
// randomly order answer options

// next next steps:
// timer, with panic mode 
// redeeming chillicrabs & durians
// UI/screens for right/wrong, getting an item, and winning/lsoing
// use 'enter' events or keypress 1,2,3,4,a,b,c,d 

// next next next steps:
// quiz selection / quiz type (tourist vs local)
// beautify UI / a landing page
// make generic quiz builder... for any type of quiz



// *** state ***

// quiz level state
let currQ = {} // use obj not id so can do currQ.answer
let unaskedQs = []
let prevQs = []
let wrongAnswers = [] // in case want to review at end
let score = 0 // num correct, display when lose (track high score until then?)
let streak = 0
let surprisesIdMap = {} // for assignging surprises to questions
let userWon = false
let userLost = false

// question level state
let answeredWrong = false
let answeredRight = false
let userAnswer = '' // maybe not here
let timeAllowed = 20 // can be changed with chillicrabs
let panicMode = false
let hearts = 3 // or constant for start out heart value?
let durians = 0
let chilliCrabs = 0
let isSurprise = false
let gotHeart = false
let gotDurian = false
let gotChilliCrab = false
let gotScammed = false


// *** cached el references ***

// question - answer related
const questionTextEl = document.querySelector('#question-text')
const answerBoxEls = document.querySelectorAll('.answer-box')
const answerAEl = document.querySelector('#a .answer-text')
const answerBEl = document.querySelector('#b .answer-text')
const answerCEl = document.querySelector('#c .answer-text')
const answerDEl = document.querySelector('#d .answer-text')
const answerSubmitEl = document.querySelector('#submit-q')

// status bar related
const heartContainerEl = document.querySelector('.heart-container')
const durianContainerEl = document.querySelector('.durian-container')
const chilliCrabContainerEl = document.querySelector('.chillicrab-container')
// todo - timer


// answer selection
answerBoxEls.forEach( el => {
    el.addEventListener('click', handleAnswerSelection) // todo - let select with A B C D keys tyoo
})
function handleAnswerSelection(event){
    clearSelected()
    event.target.closest('.answer-box').classList.add('selected') // add class on parent of the clicked target
}
function clearSelected(){
    answerBoxEls.forEach(el2 => el2.classList.remove('selected'))
}

// answer submission
answerSubmitEl.addEventListener('click', handleAnswerSubmission) // todo 'enter' event as well 

function handleAnswerSubmission(event){

    userAnswer = document.querySelector('.answer-container .selected').id

    if (currQ.answer === userAnswer){
        answeredRight = true
        score += 1

        // check for winner
        if (unaskedQs.length === 0){
            userWon = true
        }

        // todo check for surprises & update state
        // handleSurprises() ?           
        
    } else {
        answeredWrong = true
        hearts -= 1

        // check for loser
        if (hearts === 0){
            userLost = true
        }

        wrongAnswers.push(currQ)      
    }

    prevQs.push(currQ)

    render()    
    
    initQuestion()  // order requirement -> this clears state & sets next question, must do render() before
}

// *** render *** //
// UI actions that may not belong in render(): the 50-50 chillicrab ; the durian adding time
// challenge: incorportating "suspenseful pauses".... async-await-promise, or?
function render(){
    renderRightWrong() // red/green related screen
    renderWonLost()
    renderSurprises() // screen telling you about your new surprise items ; goes after won/lost but before status bar update   
    renderStatusBar() // e.g. lost heart, gained durian, timer reset
}

function renderRightWrong(){
    if (answeredRight) {
        console.log('right')
    }
    if (answeredWrong) {
        console.log('wrong')
    }    
}
function renderWonLost(){
    if (userWon){
        alert('You won!!!')
    }
    if (userLost){
        alert("I'm disappointed to see that you have lost. Oh well.")
    }    
}
function renderSurprises(){
    if (isSurprise){
        if (gotDurian){

        }
        if (gotChilliCrab){ 
            
        }
        if (gotHeart){ 
            
        }   
        if (gotScammed){ 
            
        }
    }
}
function renderStatusBar(){
    // render hearts, durians, chillicrabs

    // render style inspired by tic-tac-toe lab -> only re-render based on state
    heartContainerEl.innerHTML = '' // clear or will keep multiplying hearts
    for (let i = 0; i < hearts; i++){
        let heartEl = document.createElement('div')
        heartEl.classList.add('heart')
        heartContainerEl.append(heartEl)
    }

    // maybe: re-create from state each time? not just adding/minusing 1
}
function renderNewQuestion(){
    questionTextEl.textContent = currQ.text
    answerAEl.textContent = currQ.a
    answerBEl.textContent = currQ.b
    answerCEl.textContent = currQ.c
    answerDEl.textContent = currQ.d

    clearSelected() // clear prev answer selection
}


// *** init ***

function initChallenge(){
    // reset quiz-related state (for multiple quizzes)
    currQ = {}
    unaskedQs = []
    prevQs = []
    wrongAnswers = []
    score = 0
    streak = 0
    surprisesIdMap = {}
    
    // todo
    // randomize order of questions
    // randomly assign surprises
    // maybe - warm up questions - easy questions to start
    unaskedQs = [...sampleQs] // tmp, sampleQs coming from data.js

    initQuestion()

    render()
}

initChallenge()

function initQuestion(){

    // reset question-related state each new question
    answeredWrong = false
    answeredRight = false
    timeAllowed = 20
    panicMode = false    
    isSurprise = false
    gotHeart = false
    gotDurian = false
    gotChilliCrab = false
    gotScammed = false       

    // or replace with random choice, get idx, and splice from array

    
    currQ = unaskedQs.shift() // todo - use id lookup, maybe function getNextQuestion()


    // randomize the ABCD options

    // cannot put this in render() because render() requires old state and renderNewQuestion() requires new state
    renderNewQuestion() 
}


function randomlyOrderQuestions(){


}

// todo - anti cheating events

// redeem items events todo
// click to redeem chillicrab
// click to redeem durian
