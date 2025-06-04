# Complete Guide: How the Geography Quiz Web App Works

## 🎯 Overview
This is an **interactive display advertisement** that works like a quiz game. Users answer geography questions by clicking on a map, and after completing the quiz, they watch a video. The entire experience fits in a 300×600 pixel container (like a mobile banner ad).

---

## 🏗️ **1. HTML Structure (The Foundation)**

Think of HTML as the **skeleton** of our app. It defines what elements exist on the page.

### Main Container
```html
<div class="ad-container">
```
- This is like a **picture frame** that holds everything
- Fixed size: 300px wide × 600px tall
- Everything else goes inside this container

### The Four Screens
```html
<div class="screen active" id="welcomeScreen">    <!-- Welcome -->
<div class="screen" id="question1Screen">        <!-- Question 1 -->
<div class="screen" id="question2Screen">        <!-- Question 2 -->
<div class="screen" id="videoScreen">            <!-- Final Video -->
```

**How Screens Work:**
- Only **one screen shows at a time** (like slides in a presentation)
- The `active` class makes a screen visible
- JavaScript switches between screens when user interacts

### Interactive Elements
```html
<button class="start-btn" onclick="startQuiz()">Start Quiz</button>
<div class="map-pin pin-italy" onclick="selectCountry('italy', 1)"></div>
```
- **Buttons** trigger actions when clicked
- **onclick** tells the browser what function to run when clicked
- **Map pins** are clickable dots on the map

---

## 🎨 **2. CSS Styling (The Appearance)**

CSS is like **paint and decorations** - it makes things look good and controls layout.

### Container Styling
```css
.ad-container {
    width: 300px;
    height: 600px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
}
```

**What this does:**
- **width/height**: Sets exact size (like cutting paper to size)
- **background**: Creates a beautiful blue-purple gradient
- **position: relative**: Allows child elements to be positioned inside it

### Screen Transitions
```css
.screen {
    position: absolute;      /* All screens stack on top of each other */
    opacity: 0;             /* Hidden by default */
    transform: translateX(100%);  /* Positioned off-screen to the right */
    transition: all 0.5s ease-in-out;  /* Smooth animation */
}

.screen.active {
    opacity: 1;             /* Fully visible */
    transform: translateX(0);  /* Centered on screen */
}
```

**How Animation Works:**
1. **Default state**: Screen is invisible and positioned to the right
2. **Active state**: Screen slides in from right and becomes visible
3. **Transition**: CSS automatically animates between these states over 0.5 seconds

### Map Pins Styling
```css
.map-pin {
    position: absolute;     /* Can be placed anywhere on the map */
    width: 20px; height: 20px;
    background: #ff4757;    /* Red color */
    border-radius: 50% 50% 50% 0;  /* Creates teardrop shape */
    transform: rotate(-45deg);      /* Rotates to look like map pin */
    cursor: pointer;        /* Shows hand cursor on hover */
}
```

**Visual Effect:**
- Creates **teardrop-shaped pins** like Google Maps
- **Hover effects** make pins bigger when mouse is over them
- **Positioned absolutely** so we can place them exactly where countries are

---

## 💻 **3. JavaScript Logic (The Brain)**

JavaScript is the **brain** that makes everything interactive and handles user actions.

### Global Variables (Memory)
```javascript
let currentStep = 1;        // Tracks which step user is on
let correctAnswers = 0;     // Counts correct answers
const totalSteps = 4;       // Total number of steps in quiz
```

**Why we need these:**
- **currentStep**: So we know where the user is in the quiz
- **correctAnswers**: To track their progress
- **totalSteps**: To calculate completion percentage

### Screen Navigation Function
```javascript
function showScreen(screenId) {
    // 1. Find currently visible screen
    const currentScreen = document.querySelector('.screen.active');
    
    // 2. Hide it with animation
    if (currentScreen) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('exit');
    }

    // 3. Show new screen after delay
    setTimeout(() => {
        const newScreen = document.getElementById(screenId);
        newScreen.classList.add('active');
    }, 250);
}
```

**Step by Step:**
1. **Find current screen**: Uses CSS selector to find the screen with 'active' class
2. **Hide current**: Removes 'active' class and adds 'exit' class (triggers slide-out animation)
3. **Show new screen**: After 250ms delay, adds 'active' class to new screen (triggers slide-in)

### Quiz Logic Function
```javascript
function selectCountry(country, questionNumber) {
    // 1. Define correct answers
    const correctAnswers = {
        1: 'italy',    // Question 1 answer is Italy
        2: 'france'    // Question 2 answer is France
    };

    // 2. Check if user's choice is correct
    const isCorrect = country === correctAnswers[questionNumber];
    
    // 3. Show feedback to user
    const feedbackEl = document.getElementById(`feedback${questionNumber}`);
    feedbackEl.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect!';
    feedbackEl.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
    
    // 4. If correct, move to next step after 1.5 seconds
    setTimeout(() => {
        if (isCorrect) {
            if (questionNumber === 1) {
                showScreen('question2Screen');  // Go to question 2
            } else if (questionNumber === 2) {
                showScreen('videoScreen');      // Go to video
            }
        }
    }, 1500);
}
```

**How it works:**
1. **Check answer**: Compares user's click with correct answer
2. **Show feedback**: Displays green checkmark or red X
3. **Progress**: If correct, automatically moves to next screen after 1.5 seconds
4. **Stay put**: If wrong, user stays on same question to try again

### Progress Bar Update
```javascript
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const stepIndicator = document.getElementById('stepIndicator');
    const percentage = (currentStep / totalSteps) * 100;
    
    progressBar.style.width = percentage + '%';
    stepIndicator.textContent = `${currentStep}/${totalSteps}`;
}
```

**Visual feedback:**
- **Progress bar**: Red bar at bottom grows as user progresses (0% to 100%)
- **Step indicator**: Shows "2/4", "3/4", etc. in top-right corner

---

## 🔄 **4. How User Interactions Work**

### Click Flow Diagram:
```
User clicks "Start Quiz" 
    ↓
JavaScript calls startQuiz()
    ↓
showScreen('question1Screen') runs
    ↓
CSS animations slide screens
    ↓
User sees Question 1
```

### Map Pin Click Process:
```
User clicks Italy pin on Question 1
    ↓
onclick="selectCountry('italy', 1)" triggers
    ↓
selectCountry function checks: 'italy' === 'italy' ✅
    ↓
Shows "Correct!" feedback
    ↓
After 1.5 seconds, moves to Question 2
    ↓
Process repeats for Question 2
```

---

## 🎬 **5. Video Screen Components**

### Background Image
```css
.video-screen {
    background-image: url('/public/_materials/final.png');
    background-size: cover;    /* Image covers entire screen */
    background-position: center;  /* Centers the image */
}
```

### Video Element
```html
<video id="adVideo" muted autoplay loop>
    <source src="/public/_materials/ulajh.mp4" type="video/mp4">
</video>
```

**Attributes explained:**
- **muted**: Starts without sound (required for autoplay in browsers)
- **autoplay**: Starts playing automatically when screen loads
- **loop**: Repeats video when it ends
- **id**: Allows JavaScript to control the video

### Unmute Button
```javascript
function toggleMute() {
    const video = document.getElementById('adVideo');
    
    if (video.muted) {
        video.muted = false;           // Turn on sound
        unmuteBtn.textContent = '🔇 Mute';  // Change button text
    } else {
        video.muted = true;            // Turn off sound  
        unmuteBtn.textContent = '🔊 Unmute'; // Change button text
    }
}
```

---

## 🔧 **6. How Everything Works Together**

### 1. **Initial Load**
- HTML creates all elements
- CSS hides all screens except welcome screen
- JavaScript sets up variables and event listeners

### 2. **User Starts Quiz**
- Clicks "Start Quiz" button
- JavaScript hides welcome screen
- Shows Question 1 screen with map and pins

### 3. **Question Interaction**
- User clicks a map pin
- JavaScript checks if it's the correct country
- Shows feedback (correct/incorrect)
- If correct, automatically progresses to next question

### 4. **Quiz Completion**
- After both questions answered correctly
- Shows final video screen
- Video auto-plays (muted)
- User can unmute if desired

### 5. **Responsive Design**
- Everything fits in 300×600 pixel container
- Works on different devices
- Smooth animations throughout

---

## 🎯 **7. Key Programming Concepts Used**

### **DOM Manipulation**
```javascript
document.getElementById('welcomeScreen')  // Find HTML element
element.classList.add('active')          // Add CSS class
element.textContent = 'New text'         // Change text content
```

### **Event Handling**
```html
onclick="functionName()"     <!-- HTML event handler -->
```
```javascript
element.addEventListener('click', function)  // JavaScript event listener
```

### **CSS Animations**
```css
transition: all 0.5s ease-in-out;  /* Smooth property changes */
transform: translateX(100%);        /* Move element */
opacity: 0;                        /* Make transparent */
```

### **Conditional Logic**
```javascript
if (isCorrect) {
    // Do something if true
} else {
    // Do something if false
}
```

### **Timing Functions**
```javascript
setTimeout(() => {
    // Run this code after delay
}, 1500);  // 1.5 second delay
```

---

## 🚀 **8. Why This Structure Works Well**

### **Modular Design**
- Each screen is independent
- Easy to add/remove questions
- Functions do one specific thing

### **User Experience**
- Clear visual feedback
- Smooth transitions
- No jarring movements

### **Performance**
- All content loads at once
- No server requests during interaction
- Fast, responsive interface

### **Maintainable Code**
- Clear function names
- Organized CSS classes
- Easy to understand structure

---

## 🔍 **9. Common Beginner Questions**

### **Q: Why use `position: absolute`?**
**A:** It lets us stack screens on top of each other and control exactly where elements appear.

### **Q: How do CSS classes work with JavaScript?**
**A:** JavaScript can add/remove CSS classes, which triggers different styling and animations.

### **Q: Why use `setTimeout`?**
**A:** To create delays between actions, making the experience feel more natural and giving animations time to complete.

### **Q: How does the gradient background work?**
**A:** CSS `linear-gradient` creates smooth color transitions from one color to another.

### **Q: Why check for correct answers in JavaScript instead of CSS?**
**A:** CSS can only style elements; JavaScript handles logic, decisions, and user interactions.

---

This web app combines **HTML structure**, **CSS styling**, and **JavaScript interactivity** to create an engaging user experience that guides users through a quiz and rewards them with video content. Each technology plays a specific role in making the app functional and visually appealing!