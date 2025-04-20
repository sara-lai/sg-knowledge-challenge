
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
const questionWrapperEl = document.querySelector('.question-wrapper') // container for various screens/pages
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

// screens/pages/notices
const endScreen = document.querySelector('#end-screen')
const endScreenBlurb = document.querySelector('.end-screen p')
const endScreenHeadline = document.querySelector('.end-screen h2')
const endScreenFlair = document.querySelector('.end-screen-flair')
const endScreenBtn = document.querySelector('.end-screen .btn')



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

    if (handleRightAnswer()){

        if (handleWonLost()){
            renderWonLost()
            return
        }

        handleSurprises()   
    } else {

        handleWrongAnswer()

        if (handleWonLost()){
            renderWonLost()
            return
        }

        wrongAnswers.push(currQ.id)      
    }

    prevQs.push(currQ.id)

    renderNoticeRightWrong()

    setTimeout(() => {
        hideNoticeRightWrong()

        render()

     }, 1000)    
}

function handleRightAnswer(){
    if (currQ.answer === userAnswer){
        answeredRight = true
        score += 1
        streak += 1
        return true 
    }
    return false
}

function handleWrongAnswer(){
    answeredWrong = true
    hearts -= 1
    streak = 0    
}

function handleWonLost(){
    if (unaskedQs.length === 0 && hearts > 0){ 
        userWon = true
        return true // for branching/flow in handleAnswerSubmission() 
    }

    if (hearts === 0){
        userLost = true
        return true
    }
}

// work in progress
function handleSurprises(){

    if (Math.floor(Math.random() * 1) === 0){  // 50% chance getting item each question for demo (15% for live?)
        console.log('you get a surprise!')
        
        // // pick randomly from array of surprises - control by number of items
        let surprises = ['durian', 'durian', 'durian', 'durian', 'durian', 'chillicrab', 'chillicrab', 'heart', 'scam'] 
        let randomIdx = Math.floor(Math.random() * surprises.length)        
        let theSurprise = surprises[randomIdx]

        console.log('you got a ' + theSurprise)

        if (theSurprise === 'durian'){
            gotDurian = true 
            durians += 1
        }
        if (theSurprise === 'chillicrab'){
            gotChilliCrab = true 
            chilliCrabs += 1
        }   
        if (theSurprise === 'heart'){
            gotHeart = true 
            hearts += 1
        }   
        if (theSurprise === 'scam'){
            gotScammed = true 
            // todo logic to remove a durian or chillicrab, if they have any
        }                        
    }
}



// *** main render *** //

function render(){

    // dismissable notice and/or long pause
    if (isSurprise) {

        // on dismiss -> renderStatusBar() & initQuestion()
        renderSurprises()

    } else {

        renderStatusBar()

        initQuestion()
    }
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

function renderWonLost(){
    // using win/lose screen from html

    // if repeating the quiz, need to clear
    endScreenFlair.classList = []

    if (userWon){
        endScreenHeadline.textContent = 'You did it! You won!'
        endScreenBlurb.innerHTML = "Excellent! You are a perceptive and knowledgeable tourist of Singapore, \
            we salute you. Was that easy? Feel like you have local-level knowledge? Try <b>The True Locals Challenge</b>  \
            to further test your knowledge and for the chance to win prizes!"
        endScreenFlair.classList.add('win-screen-img')
        endScreenBtn.textContent = 'again!'
    }
    if (userLost){
        endScreenHeadline.innerHTML = 'You failed <b>The Tourist Challenge</b>'
        endScreenBlurb.innerHTML = "We encourage you to pay more attention next time on your trip to Singapore, \
            or perhaps study some basic  material about Singapore. Don’t be discouraged! Try again when you are \
            better prepared!"
        endScreenFlair.classList.add('lose-screen-img')  
        endScreenBtn.textContent = 'redeem yourself'
    }  
    
    endScreen.style.display = 'flex'
    questionWrapperEl.style.display = 'none' // can show again if re-launch challenge
    document.querySelector('body').append(endScreen)    
}

// todo
function renderSurprises(){
    // on dismiss -> renderStatusBar() & initQuestion()
    if (gotDurian){
        //alert('got durian!')
    }
    if (gotChilliCrab){ 
        //alert('got chillicrab!')
    }
    if (gotHeart){ 
        //alert('got heart!')
    }   
    if (gotScammed){ 
        alert('uhoh. you fell for a scam!')
    }

    renderStatusBar()
    initQuestion()

    // click event on 'ok' 
    // gives renderStatusBar()
    // initQuestion()
    // (or just calls render() again??) --> set isSurpise false first....
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
    durianContainerEl.innerHTML = ''
    for (let i = 0; i < durians; i++){
        let durianEl = document.createElement('div')
        durianEl.classList.add('durian')
        durianContainerEl.append(durianEl)
    }
    chilliCrabContainerEl.innerHTML = ''
    for (let i = 0; i < chilliCrabs; i++){
        let chilliCrabEl = document.createElement('div')
        chilliCrabEl.classList.add('chillicrab')
        chilliCrabContainerEl.append(chilliCrabEl)
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
    hearts = 3 
    durians = 0
    chilliCrabs = 0
    
    produceQuestionSet()

    initQuestion()

    renderStatusBar()
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

    renderQuestion()
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

endScreenBtn.addEventListener('click', () => {
    // init related....

    endScreen.style.display = 'none'
    questionWrapperEl.style.display = 'flex'

    initChallenge()
})

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