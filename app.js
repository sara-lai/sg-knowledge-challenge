// *** sections overview *** 
// state - cached els - answer selection / quiz selection - answer submission - item redeeming - timer - render - init - landing - tests - anti cheating - graveyard

// *** state ***

// quiz level state
let challengeName = null
let mainQs = []
let currQ = {}
let unaskedQs = []
let prevQs = []
let wrongAnswers = [] // maybe review at end
let score = 0 
let streak = 0
let longestStreak = 0
let userWon = false
let userLost = false

// question level state
let answeredWrong = false
let answeredRight = false
let userAnswer = null // e.g. logic if no user answer & time runs out
let hearts = 4
let durians = 0
let chilliCrabs = 0
let isSurprise = false
let gotHeart = false
let gotDurian = false
let gotChilliCrab = false
let gotScammed = false // can contain name of taken item
let disableEnter = false
let heartbeatAudio = new Audio('heartbeat.mp3') // per GA "Playing Audio in the Browser"

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
const otherQuestionTypesEl = document.querySelector('.other-question-types')
const imageQuestionEl = document.querySelector('.other-question-types img')

// status bar related
const quizNameEl = document.querySelector('.challenge-name')
const heartContainerEl = document.querySelector('.heart-container')
const durianContainerEl = document.querySelector('.durian-container')
const chilliCrabContainerEl = document.querySelector('.chillicrab-container')
const timerTextEl = document.querySelector('.timer-text')
const timerCircleEl = document.querySelector('.timer-circle')
const bodyEl = document.querySelector('body') // for panic mode

// end screens
const endScreen = document.querySelector('#end-screen')
const endScreenHeadline = document.querySelector('.end-screen h2')
const endScreenBlurb = document.querySelector('.end-screen p')
const endScreenFlair = document.querySelector('#end-screen-flair')
const endScreenFlair2 = document.querySelector('#end-screen-flair2')
const endScreenBtn = document.querySelector('.end-screen .btn')
const statsBox = document.querySelector('.stats-box')
const extraCommentary = document.querySelector('.extra-commentary')
const stat1 = document.querySelector('#stat1')
const stat2 = document.querySelector('#stat2')


// notice screens
const dismissableNotice = document.querySelector('#the-notice')
const dismissableHeadline = document.querySelector('.dismissable-notice h2')
const dismissableBlurb = document.querySelector('.dismissable-notice p')
const dismissableImg = document.querySelector('#item-img')
const dismissableBtn = document.querySelector('.dismissable-notice .btn')

// landing page related
const landingWrapperEl = document.querySelector('.landing-wrapper')
const statusBarEl = document.querySelector('.status-bar')
const quizOptionEls = document.querySelectorAll('.quiz-option')



// *** answer selection - quiz selection *** //

answerBoxEls.forEach( el => {
    el.addEventListener('click', handleAnswerSelection) // todo - A B C D or 1 2 3 4 keys
})
quizOptionEls.forEach( el => { 
    el.addEventListener('click', handleQuizSelection)
})
function handleAnswerSelection(event){
    clearSelected(answerBoxEls)
    event.target.closest('.answer-box').classList.add('selected') // add class on parent of the clicked target
}
function handleQuizSelection(event){
    clearSelected(quizOptionEls)
    event.target.classList.add('selected') // different parent class setup than answer selection
}
function clearSelected(els){ // takes an argument since used for answer & quiz options
    els.forEach(el => el.classList.remove('selected'))
}



// *** answer submission *** //

answerSubmitEl.addEventListener('click', handleAnswerSubmission)

document.addEventListener('keydown', (event) => { // attach listener globally/to document, not to submit btn
    if (event.key === 'Enter' && !disableEnter) {
        handleAnswerSubmission()
        disableEnter = true // only once per question cycle, resets in initQuestion
    }
})

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
        if (streak > longestStreak){ // check in both right and wrong conditions
            longestStreak = streak
        }
        return true 
    }        
    return false
}

function handleWrongAnswer(){
    answeredWrong = true
    hearts -= 1
    
    if (streak > longestStreak){ // capture before reset streak
        longestStreak = streak
    }

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
    return false
}

function handleSurprises(){

    if (Math.floor(Math.random() * 3) === 0){  // 33% chance getting item each question for demo (15% for live?)

        isSurprise = true // test rendering
        
        // // pick randomly from array of surprises - control by number of items
        let surprises = [ 
            'durian', 'durian', 'durian', 'durian', 'durian', 'durian', 'durian',
            'chillicrab', 'chillicrab', 'chillicrab', 'chillicrab', 
            'heart', 'heart', 
            'scam', 'scam'
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
            // overview: 
            // take durians more frequently than chillicrabs (but take a chillicrab if no durians yet)
            // dont take anything if not more than 2 items already
            if (durians + chilliCrabs >= 2){ 
                gotScammed = true 
                randomInt = Math.floor(Math.random() * 3)  // so can take durians twice as frequently
                if (randomInt === 0 && chilliCrabs || !durians){ 
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
    timerTime += 20 
    endPanic() // otherwise stuck in panic mode despite more time
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

function stopTimer(){
    clearInterval(intervalId)
    endPanic()
}

// variation https://codepen.io/simoae7/pen/GRBPJXN
function startTimer() {
    // use gap-dash pattern in svg to imitate a timer, use changing percentage of depleted time / total time

    timerTextEl.textContent = timerTime // use timerTime state for Durian purposes
    let defaultTime = timerTime
    let filledPercent = 100 

    timerTime-- // decrement or will get 1 second delay
    timerCircleEl.style.strokeDasharray = [filledPercent, 100 - filledPercent]
    intervalId = setInterval(function() {
        timerTextEl.textContent = timerTime

        if (timerTime <=5){
            beginPanic()
        }

        if (timerTime <= 0) {
            clearInterval(intervalId)
            
            endPanic()

            handleAnswerSubmission() // submit answer when time is out
        }

        filledPercent = (timerTime / defaultTime) * 100
        timerCircleEl.style.strokeDasharray = [filledPercent, 100 - filledPercent]
        timerTime--
    }, 1000)  // todo - double speed like old timer
}

function beginPanic(){
    bodyEl.classList.toggle('panic-red')
    questionBoxEl.classList.remove('return-from-fade')
    questionBoxEl.classList.add('panic-fade')
    timerCircleEl.classList.toggle('panic-red-svg')
    questionBoxEl.classList.add('frantic-bounce') // note: if on questionWrapper get unexpected problems (stops events in status bar)

    heartbeatAudio.play()
}

function endPanic(){
    questionBoxEl.classList.remove('panic-fade')
    questionBoxEl.classList.add('return-from-fade') // for css transition reasons (opacity:1 immediate)
    bodyEl.classList.remove('panic-red')
    timerCircleEl.classList.remove('panic-red-svg')
    questionBoxEl.classList.remove('frantic-bounce')

    heartbeatAudio.pause()
    heartbeatAudio.currentTime = 0
}



// *** render section *** //

function render(){

    // dismissable notice and/or long pause
    if (isSurprise) {

        // on dismiss -> renderStatusBar() & initQuestion()
        renderSurprises()

    } else {

        renderStatusBar()

        renderHotStreak()

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

    otherQuestionTypesEl.style.display = 'none' // not ideal here? icon issue with new image-question types

}

function hideNoticeRightWrong(){
    rightWrongMarkerEl.classList.remove('checkmark')
    rightWrongMarkerEl.classList.remove('xmark')
    rightWrongMarkerEl.style.display = 'none'
    questionBoxEl.style.color = 'black'
}

function renderWonLost(){
    // todo - the version for locals challenge.... if (challengeName====....) branches
    
    if (userWon){
        endScreenHeadline.textContent = 'You did it! You won!'
        let wonBlurbTxt = ''
        if (challengeName === 'tourist'){
            wonBlurbTxt = "Excellent! You are a perceptive and knowledgeable tourist of Singapore, \
            we salute you. Was that easy? Feel like you have local-level knowledge? Try <b id='locals-challenge-go'>The True Locals Challenge</b>  \
            to further test your knowledge and for the chance to win prizes!"
        } else {
            wonBlurbTxt = "This is actually incredible that you've won! We will give you a prize! Email us! blah@blahblha.com"
        }
        endScreenBlurb.innerHTML = wonBlurbTxt
        endScreenFlair.classList.add('win-screen-img')
        endScreenFlair2.classList.add('win-screen-img2') // two fireworks on win page
        endScreenBtn.textContent = 'again!'

        stat1.innerHTML = `<div><b>Longest Streak: </b>${longestStreak}</div>`
        stat2.innerHTML = `<div><b>Number of Incorrect Answers: </b>${wrongAnswers.length}</div>`

        if (wrongAnswers.length > 0){
            extraCommentary.textContent = "Ah, yikes, we see you answered incorrectly. That's OK. You technically still won the challenge, but perhaps you should try again and see if you can do a bit better!"
        }
        
        // if complete tourist, recommend local
        if (challengeName === 'tourist'){
            document.querySelector('#locals-challenge-go').addEventListener('click', () => {
                challengeName = 'locals'
                initChallenge()
            })
        }   
        
        endScreenFlair.style.display = 'block'
        endScreenFlair2.style.display = 'block'
    }
    if (userLost){
        endScreenHeadline.innerHTML = `You failed <b>The ${challengeName} Challenge</b>`
        let endScreenBlurbTxt = ''
        let endScreenBtnTxt = ''
        if (challengeName === 'tourist'){
            endScreenBlurbTxt =  "We encourage you to pay more attention on your next trip to Singapore, \
            or perhaps study some basic  material about Singapore. Don’t be discouraged! Try again when you are \
            better prepared!"
            endScreenBtnTxt = 'redeem yourself'
        } else {
            endScreenBlurbTxt = "This is a hard challenge! Don't be discouraged! Try again?"
            endScreenBtnTxt = 'again!'
        }
        endScreenBlurb.innerHTML = endScreenBlurbTxt
        endScreenFlair.classList.add('lose-screen-img')
        
        endScreenBtn.textContent = endScreenBtnTxt

        endScreenFlair.style.display = 'block' // hidden by default

        stat1.innerHTML = `<div><b>Your Score: </b>${score}</div>`  
        stat2.innerHTML = `<div><b>Longest Streak: </b>${longestStreak}</div>`

        if (score < 5){
            extraCommentary.textContent = "Ah, wow. Actually I see that's not a very high score. Not sure what to say."
        }
    }  
    
    endScreen.style.display = 'flex'
    questionWrapperEl.style.display = 'none' // can show again if re-launch challenge
    statusBarEl.style.display = 'none'

    renderHotStreak() // to remove animations if present
}

function renderSurprises(){

    dismissableImg.classList = [] // or item classes will accumulate & conflict

    if (gotDurian){
        dismissableHeadline.textContent = "Congratulations! You unlocked a Durian!"
        dismissableBlurb.innerHTML = "Click on your durian at any time to <b>add 20 seconds</b> to the timer! Remember this when time is low!"
        dismissableImg.classList.add('durian-larger')
    }
    if (gotChilliCrab){ 
        dismissableHeadline.textContent = "Congratulations! You unlocked a cooked Chilli Crab dish!"
        dismissableBlurb.innerHTML = "Click on your Chilli Crab for <b>50-50 elimination</b>, 2 incorrect answers will disappear!"
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
}

dismissableBtn.addEventListener('click', () => {
    dismissableNotice.style.display = 'none'
    questionWrapperEl.style.display = 'flex'

    isSurprise = false
    render() // repeating main render() to take other branch
    
})

function renderStatusBar(){
    // render style per tic-tac-toe lab -> only re-render based on state
    if (challengeName === 'tourist'){
        quizNameEl.textContent = 'The Tourist Challenge'
    } else if (challengeName === 'locals'){
        quizNameEl.textContent = 'The Locals Challenge'
    }
    
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

function renderHotStreak(){
    if (streak >= 5){
        // adds 1 random junglefowl each correct answer while on streak
        // todo - delay the animation so not all same? -> .style.animationDelay       
        // todo - one crazy one that rotates (unlocked with 20 in a row?)      
        // todo - increase to stread > 10 for live game
        let jungleFowl = document.createElement('div')
        jungleFowl.classList.add('jf')

        let jFTypes = ['jf2-right', 'jf2-left', 'jf1-right', 'jf1-left']
        let randomIdx = Math.floor(Math.random() * 4)
        let randomjF = jFTypes[randomIdx]
        jungleFowl.classList.add(randomjF)

        document.querySelector('.junglefowl-zone').append(jungleFowl)

        document.querySelector('#hot-streak-notice').style.display = 'block'
    } else if (streak === 0 || userWon) { // i.e. they missed the last questions ... or remove animations if win
        document.querySelector('.junglefowl-zone').innerHTML = ''

        document.querySelector('#hot-streak-notice').style.display = 'none'
    }
}

function renderQuestion(){
    // todo - expand for handling more question 'types'

    questionTextEl.innerHTML = currQ.text
    answerAEl.innerHTML = currQ.a
    answerBEl.innerHTML = currQ.b
    answerCEl.innerHTML = currQ.c
    answerDEl.innerHTML = currQ.d

    // test image-quesiton type! 
    if (currQ.type === 'image-based'){
        imageQuestionEl.src = 'images/' + currQ.imageName
        otherQuestionTypesEl.style.display = 'block'
    } else {
        otherQuestionTypesEl.style.display = 'none'
    }

    clearSelected(answerBoxEls) // clear prev answer selection

    answerBoxEls.forEach(el => el.style.opacity = 1) // for 50-50 purposes (it uses opacity to hide)
}




// *** init related ***

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
    hearts = 4 
    durians = 0
    chilliCrabs = 0

    removeStaleThings() // in case stale things from old challlenge
    
    produceQuestionSet()

    initQuestion()

    statusBarEl.style.display = 'flex' // fix for relaunching challenge issue

    renderStatusBar()
}

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
    disableEnter = false    
 
    chooseRandomQuestion()

    renderQuestion()

    startTimer()
}

// todo - named function
document.querySelector('#play').addEventListener('click', (event) => {
    challengeName = document.querySelector('.quiz-option.selected').id

    // todo - animation would be nice, launching the quiz
    landingWrapperEl.style.display = 'none'
    questionWrapperEl.style.display = 'flex'

    initChallenge()
})

function chooseRandomQuestion(){
    // randomly pick from unaskedQs - set currQ - then slice from unaskedQs (or quiz will never end!)
    let randomIdx = Math.floor(Math.random() * unaskedQs.length)
    let currQId = unaskedQs[randomIdx]
    currQ = mainQs.find(question => question.id === currQId)  // use currQ as obj
    unaskedQs.splice(randomIdx, 1)
}

function produceQuestionSet(){
    if (challengeName === 'tourist'){
        mainQs = touristQs
        console.log('set mainQs as tourist set')
    } else if (challengeName === 'locals'){
        mainQs = localQs
        console.log('set mainQs as locals set')        
    }

    unaskedQs = mainQs.map(question => question.id) // use ids not objs for questions array
    console.log(unaskedQs)
}

endScreenBtn.addEventListener('click', reLaunchSameChallenge)

function reLaunchSameChallenge(){
    removeStaleThings()    

    initChallenge()
}

function removeStaleThings(){
    // mostly for end screens and landing page features, hot streaks too

    endScreen.style.display = 'none'
    
    document.querySelectorAll('.landing-image').forEach(el => el.remove()) // all the landing image circles, appended to body

    endScreenFlair.classList = [] // reset big endscreen images
    endScreenFlair2.classList = []

    endScreenFlair.style.display = 'none'
    endScreenFlair2.style.display = 'none'

    landingWrapperEl.style.display = 'none'

    questionWrapperEl.style.display = 'flex'

    document.querySelector('.junglefowl-zone').innerHTML = ''
    document.querySelector('#hot-streak-notice').style.display = 'none'
    
    
}



// *** landing related *** 

// "Singapore" name scroll
const names = ['Singapura', 'Temasek', 'Lion City', 'The Little Red Dot', 'Garden City', 'Fine City', 'Singapore'] 
const spanName = document.getElementById('sg-name')
const spanAdj = document.getElementById('sg-adj') // adjectives to go with some names (but no underline so different element)

i = 0
setInterval(() => {
    spanName.textContent = names[i]
    if (names[i] === 'Singapore'){
        spanAdj.textContent = 'Great '
    } else {
        spanAdj.textContent = ''
    }
    i++
    if (i === names.length){
        i = 0 // indefinitely cycle!
    }
}, 3500)



// the img-circles 

// note: I think this has terrible performance? (use smaller/low res images?)

let extension = null
const usePNG = [8, 10, 11, 13, 23, 24, 26, 34, 39, 40, 41, 42, 43, 49, 55, 57, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 80, 90, 101] // can be png or jpg so use this to switch extension
const SML = ['s', 'm', 'l']

for (let i = 1; i <= 101; i++){ // maybe cap around 100 for now

    // construct the filename string
    if (usePNG.includes(i)){
        extension = 'png'
    } else {
        extension = 'jpg'
    }
    let imgName = `landing${i}.${extension}`

    // set the img src
    let imgEl = document.createElement('img')
    imgEl.classList.add('landing-image')
    imgEl.src = 'images/' + imgName

    // randomly assign s - m - l class
    let randomIdx = Math.floor(Math.random() * 3)
    let letter = SML[randomIdx]
    imgEl.classList.add(`landing-image-${letter}`)    

    // random start positions on screen (css = abs positioned)
    let imgStartLeft = Math.random() * window.innerWidth
    let imgStartTop = Math.random() * window.innerHeight
    imgEl.style.left = imgStartLeft + 'px'
    imgEl.style.top = imgStartTop + 'px'    

    // random distances on X & Y
    let distanceX = (Math.random() - 0.5) * 1000 /* the -0.5 is a technique to randomly make negative */
    let distanceY = (Math.random() - 0.5) * 1400 /* screen width is greater than height... */
    imgEl.style.setProperty('--distanceX', distanceX + 'px') /* must use setProperty for a css variable */
    imgEl.style.setProperty('--distanceY', distanceY + 'px')

    // random duration .... could weigh it by the distance ^ to prevent crazy outliers
    let duration = (Math.random() * 10) + 3 /* the +3 guarantees that the minimum duration is 3, otherwise wild speeds! */ 
    imgEl.style.animationDuration = duration + 's'    

    bodyEl.append(imgEl)
}


// instructions related
// todo better remove when game starts
const instructionToggle = document.querySelector('#instructions-toggle')
const instructions = document.querySelector('.instructions-section')

instructionToggle.addEventListener('click', () => {
    instructions.classList.toggle('instructions-visible')
    instructionToggle.classList.toggle('shadow-border')
})





// *** test functions for console ***


function testAddDurian(){
    isSurprise = true
    gotDurian = true
    durians += 1
    userAnswer = currQ.answer
    handleAnswerSubmission()
}
function testAddChilliCrab(){
    isSurprise = true
    gotChilliCrab = true
    chilliCrabs += 1
    userAnswer = currQ.answer
    handleAnswerSubmission()
}
function testGotScammed(){
    isSurprise = true
    userAnswer = currQ.answer
    durians -= 1 // just take a durian for now
    gotScammed = 'durian'
    // chilliCrabs -= 1
    // gotScammed = 'chilliCrab'
    handleAnswerSubmission()
}
function testWin(){
    unaskedQs = []
    hearts = 3
    userAnswer = currQ.answer
    handleAnswerSubmission()
}
function testLose(){
    hearts = 1 // will lose one in handleAnswerSubmission  
    handleAnswerSubmission()
    renderStatusBar()
}
function testHotStreak(){
    streak = 5
    userAnswer = currQ.answer
    handleAnswerSubmission()
}



// *** anti cheating ***


let enforceCheatingRules = false // set false when test/dev

// todo - should somehow delete some of the JS too so cant scrape questions???
// todo - obfuscation like airbnb

// https://stackoverflow.com/questions/10338704/javascript-to-detect-if-the-user-changes-tab
document.addEventListener("visibilitychange", serveCheatNotice)
window.addEventListener('blur', serveCheatNotice)

  function serveCheatNotice(){
    let caughtCheatingMessage = "We beleive you may have attempted to cheat. This includes opening new windows or taking focus off of the game. Out of an abudance of caution, we have decided to end your challenge. \
    We hope you were not trying to cheat, perhaps you were just checking your mail or Instagram, but please know that cheating is not a good habit and it will catch up to you later \
    in life, perhaps sooner than you think. We believe in the importance of second chances, please try the quiz again, but we have also referred your IP address to the \
    International Online Quiz Governance Body in Geneva, Switzerland (IOQGB) for investigation and possible further action. Please be prepared to travel to Geneva if you are summoned."

    if (enforceCheatingRules){
        bodyEl.innerHTML = ''
        let h1El = document.createElement('h1')
        h1El.textContent = caughtCheatingMessage
        bodyEl.append(h1El)
 
        stopTimer() /* or get panic mode still */
       }
  }




// *** graveyard: may revise from dead ***

/*
// array shuffle based approach; may use for random ordering of answer options, or random img-circle array (landing paeg)
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array){
    // don't edit original
    array = [...array]

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
}

previous async-await-promise approach, switched to broken up render paths
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

simpler timer before SVG approcah
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


if decide to remove landing page "play" button, then trigger initChallenge() from handleQuizSelection()
function handleQuizSelection(event){
    clearSelected(quizOptionEls)
    event.target.classList.add('selected')

    challengeName = event.target.id 

    landingWrapperEl.style.display = 'none'
    statusBarEl.style.display = 'flex'
    questionWrapperEl.style.display = 'flex'

    initChallenge()    
}

clouds animation - maybe try again
let cloud1 = document.createElement('div')
cloud1.classList.add('cloud1')
landingWrapperEl.prepend(cloud1) // append to top of page


 */
