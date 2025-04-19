
// 5 sections:
// state - answer selection - answer submission - render L:136 - init

// *** state ***

// quiz level state
let currQ = {}
let unaskedQs = []
let prevQs = []
let wrongAnswers = [] // maybe review at end
let score = 0 
let streak = 0
let userWon = false
let userLost = false

// question level state
let answeredWrong = false
let answeredRight = false
let userAnswer = null // e.g. logic if no user answer & time runs out
let timeAllowed = 20
let panicMode = false
let hearts = 3 
let durians = 0
let chilliCrabs = 0
let isSurprise = false
let gotHeart = false
let gotDurian = false
let gotChilliCrab = false
let gotScammed = false

// constants
// todo - generalize 'durian' 'chillicrab' etc. -> TIME_EXTENDER, FIFTY_FITY


// *** cached el references ***

// question - answer related
const questionBoxEl = document.querySelector('.question-box')
const questionTextEl = document.querySelector('#question-text')
const answerBoxEls = document.querySelectorAll('.answer-box')
const answerAEl = document.querySelector('#a .answer-text')
const answerBEl = document.querySelector('#b .answer-text')
const answerCEl = document.querySelector('#c .answer-text')
const answerDEl = document.querySelector('#d .answer-text')
const answerSubmitEl = document.querySelector('#submit-q')
const rightWrongMarkerEl = document.querySelector('#right-wrong-marker')

// status bar related
const heartContainerEl = document.querySelector('.heart-container')
const durianContainerEl = document.querySelector('.durian-container')
const chilliCrabContainerEl = document.querySelector('.chillicrab-container')
// todo - timer



// *** answer selection *** //

answerBoxEls.forEach( el => {
    el.addEventListener('click', handleAnswerSelection) // todo - A B C D or 1 2 3 4 keys
})
function handleAnswerSelection(event){
    clearSelected()
    event.target.closest('.answer-box').classList.add('selected') // add class on parent of the clicked target
}
function clearSelected(){
    answerBoxEls.forEach(el2 => el2.classList.remove('selected'))
}



// *** answer submission *** //

answerSubmitEl.addEventListener('click', handleAnswerSubmission) // todo 'enter' event as well 

function handleAnswerSubmission(event){

    userAnswer = document.querySelector('.answer-container .selected').id

    if (currQ.answer === userAnswer){
        answeredRight = true
        score += 1
        streak += 1

        handleWinLoss()
        
        handleSurprises()   
    } else {
        answeredWrong = true
        hearts -= 1
        streak = 0

        handleWinLoss()

        wrongAnswers.push(currQ.id)      
    }

    prevQs.push(currQ.id)

    // alternative to an async-await-promise:
    // idea: serve right-wrong notices *before* render()
    renderNoticeRightWrong()
    setTimeout(() => {
        hideNoticeRightWrong()
        render() 
        initQuestion() // launch new cycle ; bug: dont call if userWon or userLost
     }, 1000)    
}

function handleWinLoss(){
    if (unaskedQs.length === 0 && hearts > 0){ 
        userWon = true
    }

    if (hearts === 0){
        userLost = true
    }
}

// work in progress
function handleSurprises(){
    // randomly set a surprise with some frequency 
    // skip scam if you dont have items already   

    if (Math.floor(Math.random() * 2) === 1){  // 50% chance getting item each question for demo (15% for live?)
        console.log('you get a surprise!')
        
        // // pick randomly from array of surprises - control by number of items
        let surprises = ['durian', 'durian', 'durian', 'durian', 'durian', 'chillicrab', 'chillicrab', 'heart', 'scam'] 
        let randomIdx = Math.floor(Math.random() * surprises.length)        
        let theSurprise = surprises[randomIdx]

        console.log('you got a ' + theSurprise)

        // if (theSurprise === 'durian'){
        //     gotDurian = true 
        //     durians += 1
        // }
    }
}



// *** main render *** //

function render(){

    // renderNoticeRightWrong() moved
    
    renderWonLost()

    renderSurprises() // todo - dismissable notices about new items
     
    renderStatusBar() // e.g. lost heart, gained durian, timer reset

    // renderQuestion() moved
}

function renderNoticeRightWrong(){
    if (answeredRight) {
        rightWrongMarkerEl.classList.add('checkmark')
    }
    if (answeredWrong) {
        rightWrongMarkerEl.classList.add('xmark')
        questionBoxEl.style.color = 'red'
    }
    rightWrongMarkerEl.style.display = 'block' // amy display option, just make qppear       

}
function hideNoticeRightWrong(){
    rightWrongMarkerEl.classList.remove('checkmark')
    rightWrongMarkerEl.classList.remove('xmark')
    rightWrongMarkerEl.style.display = 'none'
    questionBoxEl.style.color = 'black'
}

// todo
function renderWonLost(){
    if (userWon){
        alert('You did it!! You won!!')
    }
    if (userLost){
        alert("Very disappointing that you were not able to complete this challenge.")
    }    
}

// todo
function renderSurprises(){
    if (gotDurian){
        alert('got durian!')
    }
    if (gotChilliCrab){ 
        alert('got chillicrab!')
    }
    if (gotHeart){ 
        alert('got heart!')
    }   
    if (gotScammed){ 
        alert('uhoh. you fell for a scam!')
    }
}

// work in progress
function renderStatusBar(){
    // render style per tic-tac-toe lab -> only re-render based on state
    heartContainerEl.innerHTML = '' // clear or will keep multiplying hearts
    for (let i = 0; i < hearts; i++){
        let heartEl = document.createElement('div')
        heartEl.classList.add('heart')
        heartContainerEl.append(heartEl)
    }
}

function renderQuestion(){
    questionTextEl.textContent = currQ.text
    answerAEl.textContent = currQ.a
    answerBEl.textContent = currQ.b
    answerCEl.textContent = currQ.c
    answerDEl.textContent = currQ.d

    clearSelected() // clear prev answer selection
}



// *** init ***

function initChallenge(){

    // reset quiz state (for multiple quizzes)
    currQ = {}
    unaskedQs = []
    prevQs = []
    wrongAnswers = []
    score = 0
    streak = 0
    userWon = false
    userLost = false    
    
    produceQuestionSet()

    initQuestion()

    render()
}

initChallenge()

function initQuestion(){

    // reset question state each new question
    answeredWrong = false
    answeredRight = false
    userAnswer = null
    timeAllowed = 20
    panicMode = false    
    isSurprise = false
    gotHeart = false
    gotDurian = false
    gotChilliCrab = false
    gotScammed = false       
 
    chooseRandomQuestion()

    // randommlyAssignSurprise() moved

    renderQuestion() // moved from render(), render() is about old question, this is new question
}

function chooseRandomQuestion(){
    // randomly pick from unaskedQs - set currQ - then slice from unaskedQs (or quiz will never end!)
    let randomIdx = Math.floor(Math.random() * unaskedQs.length)
    let currQId = unaskedQs[randomIdx]
    currQ = sampleQs.find(question => question.id === currQId)  // use currQ as obj
    unaskedQs.splice(randomIdx, 1)
}

function produceQuestionSet(){
    // use ids not objs for questions array
    unaskedQs = sampleQs.map(question => question.id)
    console.log(unaskedQs)
}

// previous async-await-promise method called in render() ; refactoring to avoid
// async function renderRightWrong(){
//     if (answeredRight || answeredWrong){ // only fire if a question has been answered
    
//         if (answeredRight) {
//             rightWrongMarkerEl.classList.add('checkmark')
//         }
//         if (answeredWrong) {
//             rightWrongMarkerEl.classList.add('xmark')
//         }    
        
//         rightWrongMarkerEl.style.display = 'block'

//         // similar example at https://javascript.info/async-await
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         rightWrongMarkerEl.classList = [] // clear out classes for cycling

//         rightWrongMarkerEl.style.display = 'none'
//     }
// }