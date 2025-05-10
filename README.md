# SG Knowledge Challenge Demo

<img width="500" alt="Screenshot 2025-05-10 at 2 03 09 PM" src="https://github.com/user-attachments/assets/b63ed9a9-97da-476b-909e-93006496228f" />

<br>
<br>

This is simplified quiz generation software prepared for a presentation. Be sure to try out the next generation version of The Great Singapore Knowledge Challenge launching in June 2025 at [thegameofknowledge.com](https://thegameofknowledge.com)!

[play demo version](https://sara-lai.github.io/sg-knowledge-challenge/)

**Next Steps**:
Evolving towards generic quiz builder with a greater set of modes and question types

**Tech Stack**:
Vanilla JS, CSS, HTML only

**Architecture/Code organization**:
Strict and straightforward state-update-render cycle

**Features Include**:
  - Multiple challenge types
  - Hot streaks
  - SVG Timer with "panic mode"
  - Multiple question types (.e.g image-based questions)- 
  - Item awards for 50-50 & Time Extension
  - Fun & surprising CSS Animations
  - Cheating detection

## Some citations of helpful resources:

- This SVG timer animation inspired mine: [CodePen](https://codepen.io/simoae7/pen/GRBPJXN)
- Graveyard’s async-await-promise: [JavaScript.info](https://javascript.info/async-await)
- Anti Cheating: [Stack Overflow](https://stackoverflow.com/questions/10338704/javascript-to-detect-if-the-user-changes-tab)
- Using variables in CSS animation w/ JS-set values: [Val Head's Blog](https://valhead.com/2017/07/21/animating-with-css-variables/)

## The Approach / Planning

- Figma mockups
- State-Update-Render cycle
  - First major goal: imitate the labs and separate these sections out as much as possible
  - I defined all the state, and then wrote out 1 big `render()` based on state
  - 1 function (`handleAnswerSubmission`) became main node for updating state
- Reassess: As coding progressed, 1 big `render()` is a big mistake
  - My game needs pauses (show right-wrong icons) and dismissable notices for items
  - Very hard to “stop” or “slow down” the big `render()` (see my code Graveyard for attempts)
  - Solution: breakup render into various paths (notices/pauses are at end of path/nothing after!)
- Avoid exhaustion: heavy use of named functions & separation into sections
- Develop own test method: special functions to update state from console to quickly test app features & UI
- New features naturally fell into one of the State-Update-Render slots
  - Some complication: needed a `removeStaleThings()` sort of catch all for new quizzes
- Landing page, css animations, and question writing saved for end

<br>
<br>

<img width="850" alt="example of architecture" src="https://github.com/user-attachments/assets/b8a440a4-eff3-4683-ae58-71e004f15ce4" />

<br>
<br>
 
## Fun Code Highlights

- `handeAnswerSubmission()` -> main state update + control flow for pausing/notices/end of game
- `handleSurprises()` -> surprising uses of `Math.random()`
- `renderQuestion()` -> demo-ing multiple question types
- Landing page/jungle fowl css animations (`chickenBobble` & random `drift`) -> controlled chaos
- Random choice + `splice()` -> used regularly such as 50-50/`redeemChillicrab()` or `chooseRandomQuestion()`
- `renderStatusBar()` -> recreate items purely from state
- Name scroll feature -> deconstructed looping inside `setInterval()`
- The SVG timer (`startTimer()`) -> clever use of svg dash-gap properties (see citation)
- Panic mode (`beginPanic()`) -> maximum panic and return-from-fade solution
- `renderWonLost()` -> a monster html render with a lot of JS control/variables


