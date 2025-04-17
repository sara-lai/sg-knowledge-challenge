// maybe use json
// https://v8.dev/features/import-assertions
// import json from 'test.json' assert { type: 'json' };
// console.log(json)

// big question: use classes for quiz and question, and construct Quiz/Question with JSON data?
// question: scrap ABCD options in the data, use options: ["first","second","third"] and correct: "correct answer"
// ^ not all questions need to be ABCD type

// next steps:
// "suspensful pauses", for right/wrong screen & for got items screen
// randomly assign surprises to questions
// complete status bar render for durians, chillicrabs

// next next steps:
// timer, with panic mode 
// redeeming chillicrabs & durians
// UI/screens for right/wrong, getting an item, and winning/lsoing
// use 'enter' events or keypress 1,2,3,4,a,b,c,d 
// randomly order answer options
// change data to use options: ["first","second","third"] and correct: "correct answer" ; add more sample questions

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
        if (unaskedQs.length === 0 && hearts > 0){
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
        alert('right')
    }
    if (answeredWrong) {
        alert('wrong')
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

    // render style per tic-tac-toe lab -> only re-render based on state
    heartContainerEl.innerHTML = '' // clear or will keep multiplying hearts
    for (let i = 0; i < hearts; i++){
        let heartEl = document.createElement('div')
        heartEl.classList.add('heart')
        heartContainerEl.append(heartEl)
    }
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
    
    produceQuestionSet()

    // todo - randomly assign surprises to questions    

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

    chooseRandomQuestion()
    
    // todo - randomise the ABCD options

    // cannot put this in render() because render() requires old state and renderQuestion() requires new state
    renderQuestion() 
}

function chooseRandomQuestion(){
    // per SQ, instead of shuffling unaskedQs, will randomly pick from ordered unaskedQs
    // currQ = unaskedQs.shift() -> old method, shrinks array each time until quiz ends

    // randomly pick question from unaskedQs, then remove from unaskedQs (or quiz will never end)
    // set current question currQ as obj
    let randomIdx = Math.floor(Math.random() * unaskedQs.length)
    let currQId = unaskedQs[randomIdx]
    currQ = sampleQs.find(question => question.id === currQId)
    unaskedQs.splice(randomIdx, 1)
}

function produceQuestionSet(){
    // set unaskedQs array, with ids not objs
    // todo maybe - warm up questions - easy questions to start

    unaskedQs = sampleQs.map(question => question.id)
    console.log(unaskedQs)
}

function randomlyOrderQuestions(){


}

function renderQuestion(){
    questionTextEl.textContent = currQ.text
    answerAEl.textContent = currQ.a
    answerBEl.textContent = currQ.b
    answerCEl.textContent = currQ.c
    answerDEl.textContent = currQ.d

    clearSelected() // clear prev answer selection
}


// todo - anti cheating events

// redeem items events todo
// click to redeem chillicrab
// click to redeem durian
