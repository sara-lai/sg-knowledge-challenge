// *** sections overview *** 
// state - cached els - answer selection - answer submission - item redeeming - timer - render - init - tests - graveyard

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
let hearts = 3 
let durians = 0
let chilliCrabs = 0
let isSurprise = false
let gotHeart = false
let gotDurian = false
let gotChilliCrab = false
let gotScammed = false // can contain name of taken item
// timer related
let timerTime = 20
let panicMode = false
let intervalId = null

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
const timerEl = document.querySelector('.timer')
const bodyEl = document.querySelector('body') // for panic mode

// end screens
const endScreen = document.querySelector('#end-screen')
const endScreenHeadline = document.querySelector('.end-screen h2')
const endScreenBlurb = document.querySelector('.end-screen p')
const endScreenFlair = document.querySelector('.end-screen-flair')
const endScreenBtn = document.querySelector('.end-screen .btn')

// notice screens
const dismissableNotice = document.querySelector('#the-notice')
const dismissableHeadline = document.querySelector('.dismissable-notice h2')
const dismissableBlurb = document.querySelector('.dismissable-notice p')
const dismissableImg = document.querySelector('#item-img')
const dismissableBtn = document.querySelector('.dismissable-notice .btn')



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

function handleAnswerSubmission(){
    // todo - disable submit button if havent selected (& time is left)

    stopTimer()

    // these lines account for condition when timer runs out and no answer selected
    let selected = document.querySelector('.answer-container .selected')
    if (selected){
        userAnswer = selected.id
    }

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

function handleSurprises(){

    if (Math.floor(Math.random() * 3) === 0){  // 33% chance getting item each question for demo (15% for live?)

        isSurprise = true // test rendering
        
        // // pick randomly from array of surprises - control by number of items
        let surprises = [ 
            'durian', 'durian', 'durian', 'durian', 'durian', 'durian', 'durian',
            'chillicrab', 'chillicrab', 'chillicrab', 'chillicrab', 'heart', 'scam'
        ] 
        //let surprises = ['scam', 'scam']
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
            if (durians + chilliCrabs >= 2){ // only scam if durians + chilliCrabs >= 2
                gotScammed = true 
                randomInt = Math.floor(Math.random() * 3)  // take durians 3x more frequently than chillicrabs               
                if (randomInt === 0 && chilliCrabs){
                    chilliCrabs -= 1  
                    gotScammed = 'chilliCrab'                  
                } else {
                    durians -= 1
                    gotScammed = 'durian'
                }
            } else {
                isSurprise = false // breaks rendering otherwise! (just skip the surprise)
            }
        }                        
    }
}



// *** item redeeming ***

function redeemDurian(){
    // will need to register events when durianEl created... or not??
    timerTime += 20 
    durians -= 1
    renderStatusBar()
    console.log('redeemed durian')
}
durianContainerEl.addEventListener('click', (event) => {
    // event bubbling since durianEls get created/destroyed each cycle
    if (event.target.className === 'durian'){
        redeemDurian()
    }
})


function redeemChilliCrab(){
    chilliCrabs -= 1
    renderStatusBar()
    console.log('redeemed chillicrab')

    // overview for remove two wrong options:
    // splice correct answer from abcd array
    // random choice from abcd array
    // match choice to .answer-box #id
    // clear el contents 
    let abcd = ['a', 'b', 'c', 'd']
    let answerIdx = abcd.indexOf(currQ.answer)
    abcd.splice(answerIdx, 1)
    let randomIdx = Math.floor(Math.random() * 3)
    let remove1 = abcd[randomIdx] 
    abcd.splice(randomIdx, 1) // must delete so wont choose again
    let randomIdx2 = Math.floor(Math.random() * 2) // *2 because array is smaller
    let remove2 = abcd[randomIdx2]

    let remove1El = document.querySelector(`.answer-box#${remove1}`)
    let remove2El = document.querySelector(`.answer-box#${remove2}`)

    // trouble removing without affecting layout... using opacity
    // set opacity to 1 again at renderQuestion()!
    // remove1El.innerHTML = ''
    // remove2El.innerHTML = ''
    remove1El.style.opacity = 0
    remove2El.style.opacity = 0

}
chilliCrabContainerEl.addEventListener('click', (event) => {
    if (event.target.className === 'chillicrab'){
        redeemChilliCrab()
    }
})


// *** timer related *** 

function startTimer(){

    timerEl.textContent = timerTime
    intervalId = setInterval(() => {
        timerTime -= 0.5
        timerEl.textContent = Math.ceil(timerTime)

        if (timerTime <=5){
            bodyEl.classList.toggle('panic-red')
            questionBoxEl.classList.remove('return-from-fade')
            questionBoxEl.classList.add('panic-fade')
        }

        if (timerTime <= 0){
            clearInterval(intervalId)

            questionBoxEl.classList.remove('panic-fade')
            questionBoxEl.classList.add('return-from-fade') // for css transition reasons (opacity:1 immediate)
            bodyEl.classList.remove('panic-red')
            
            // submit answer when time is out
            handleAnswerSubmission()
        }

    }, 500) // 2x for panic mode
}

function stopTimer(){
    clearInterval(intervalId)
    bodyEl.classList.remove('panic-red')
    questionBoxEl.classList.remove('panic-fade')
    questionBoxEl.classList.add('return-from-fade')
}




// *** render section *** //

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
    rightWrongMarkerEl.style.display = 'block' // any display option, just make appear       

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
    endScreenFlair.classList = ['end-screen-flair']

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
}

function renderSurprises(){

    dismissableImg.classList = [] // or item classes will accumulate

    if (gotDurian){
        dismissableHeadline.textContent = "Congratulations! You unlocked a Durian!"
        dismissableBlurb.innerHTML = "Click on your durian at any time to <b>add 20 seconds</b> to the timer! Remember this when time is low!"
        dismissableImg.classList.add('durian-larger')
    }
    if (gotChilliCrab){ 
        dismissableHeadline.textContent = "Congratulations! You unlocked a cooked Chilli Crab dish!"
        dismissableBlurb.innerHTML = " Click on your Chilli Crab for <b>50-50 elimination</b>, 2 incorrect answers will disappear!"
        dismissableImg.classList.add('chillicrab-larger')       
    }
    if (gotHeart){ 
        dismissableHeadline.textContent = "Guess What? You earned another heart! Keep it up!"
        dismissableBlurb.innerHTML = "It will surely come in handy in the dark depths of this challenge!"
        dismissableImg.classList.add('heart-larger')       
    }   
    if (gotScammed){ 
        dismissableHeadline.textContent = "Uhoh. It looks like you fell for a scam!"
        dismissableBlurb.innerHTML = `Unfortunately you gave the scammers <b id='scam-item'>1 ${gotScammed}</b>. Let's hope to earn another one soon!`
        dismissableImg.classList.add('yandao')       
    }

    dismissableNotice.style.display = 'flex'
    questionWrapperEl.style.display = 'none'

    // move dismmissal outside render() or else will re-register/execute many times!
}

dismissableBtn.addEventListener('click', () => {
    console.log('clicking to dismiss notice')

    dismissableNotice.style.display = 'none'
    questionWrapperEl.style.display = 'flex'

    renderStatusBar()
    initQuestion()
    // or just calls render() & set isSurpise to false?
})

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

    answerBoxEls.forEach(el => el.style.opacity = 1) // for 50-50 purposes (it uses opacity to hide)
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


// dont call right away if reusing index.html for landing page - move to event listener
// initChallenge()

document.querySelector('#play').addEventListener('click', (event) => {
    event.target.id // todo

    // todo - animation would be nice, launching the quiz
    document.querySelector('.landing-wrapper').style.display = 'none'
    document.querySelector('.status-bar').style.display = 'flex'
    document.querySelector('.question-wrapper').style.display = 'flex'

    initChallenge()
})

function initQuestion(){
    // reset question state each new question
    answeredWrong = false
    answeredRight = false
    userAnswer = null
    timerTime = 20
    panicMode = false    
    isSurprise = false
    gotHeart = false
    gotDurian = false
    gotChilliCrab = false
    gotScammed = false       
 
    chooseRandomQuestion()

    renderQuestion()

    startTimer()
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



// *** test functions for console ***


function testAddDurian(){
    isSurprise = true
    gotDurian = true
    durians += 1
    hearts += 1 // so dont run out of hearts
    handleAnswerSubmission()
}
function testAddChilliCrab(){
    isSurprise = true
    gotChilliCrab = true
    chilliCrabs += 1
    hearts += 1 // so dont run out of hearts
    handleAnswerSubmission()
}
function testGotScammed(){
    // todo - dont want to re-write random item removal logic
    // pass a flag to handleSurprise for test mode?
    isSurprise = true
    hearts += 1 // so dont run out of hearts
    durians -= 1 // just take a durian for now
    gotScammed = 'durian'
    handleAnswerSubmission()
}
function testWin(){
    unaskedQs = []
    hearts = 3
    handleAnswerSubmission()
}
function testLose(){
    hearts = 1 // will lose one in handleAnswerSubmission  
    handleAnswerSubmission()
    renderStatusBar()
}


// *** graveyard ***

/*
previous async-await-promise method called in render() ; refactoring to avoid
async function renderRightWrong(){
    if (answeredRight || answeredWrong){ // only fire if a question has been answered
    
        if (answeredRight) {
            rightWrongMarkerEl.classList.add('checkmark')
        }
        if (answeredWrong) {
            rightWrongMarkerEl.classList.add('xmark')
        }    
        
        rightWrongMarkerEl.style.display = 'block'

        // similar example at https://javascript.info/async-await
        await new Promise((resolve) => setTimeout(resolve, 1000))

        rightWrongMarkerEl.classList = [] // clear out classes for cycling

        rightWrongMarkerEl.style.display = 'none'
    }
}
    */