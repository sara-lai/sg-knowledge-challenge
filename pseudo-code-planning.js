// pseudo code overview
// brainstorming

// data import
// store data in data.js, import to app.js
// on index.html, got get data: 
<script src="data.js" ></script>    
<script src="app.js" ></script>


// the data
// list of objects
// 'labels' to build different quiz types
// 'surprises' for extra hearts, extra time, 50-50, or lose item/scam
// randomly assign surprises to questions at start of quiz
const questionsData = [
    {
        id: 32,
        text: 'Which hawker centre was famously featured in the movie Crazy Rich Asians?',
        a: 'Newton',
        b: 'Maxwell',
        c: 'Golden Mile',
        d: 'Lau Pa Sat',
        answer: 'a',
        labels: [
            'tourist', 'culinary'
        ],
        surprises: [
            'heart', 'durian', 'chillicrab', 'scam'
        ]
    },
    ...
]

// state: questions state & game state below

// questions state 
// randomly shuffle questions, no same quizes
// randomly assign items/surprises to questions
// track unasked questions
// track previously asked
// track current question
// track wrong answers (e.g. for review at end)
// track questions with their id in an array
// ?? or use a linked list (.next) like the snake example

unaskedQuestions = [21, 90, 2...]
prevQuestions = [6, 11, 71...]
wrongAnswers = [88, 2]
currentQuestion = 42

// game state
// quiz type (tourist or local)
// timer 
// is final 5 seconds (play heartbeats - flash - induce panic)
// number of hearts
// number of durians for extra time
// number of chilicrabs for 50-50 helper
// track score for correct answers
// if quiz complete / user won 
// if quiz is lost / user lost

haarts = 3
timeAllowed = 20
panicMode = false
durians = 0
chilliCrabs = 0
score = 0
userWon = false 
userLost = false

// functions
// setInterval for the timer
// redeem Durian to add time
// redeem Chilli Crab to 50-50 the answers
// heartbeat audio for final 5 seconds
// if question wrong & has hearts, subtract a heart
// if questions have "surprises" (durian, chilicrab, chickenrice?, scam), then update your items
// click events to choose quiz
// click events for right/wrong
// if userWon, load won screen
// if userLost, load lost screen

// anti cheating
// if open a new tab/ change tab -> end the game
// if inspect code/dev tools -> end the game
// obfuscation like AirBnb?
// ?? external storage of correct answers, some cryptography?

// landing page graphics 
// random/animated assortment of SG themed items

// mobile version 

// misc
// maybe uses classes? Question class?
// linked list (.next) for question sequence, like the snake example ?

