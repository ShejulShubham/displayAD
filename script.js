let currentStep = 1;
let correctAnswers = 0;
const totalSteps = 4;

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const stepIndicator = document.getElementById('stepIndicator');
    const percentage = (currentStep / totalSteps) * 100;
    
    progressBar.style.width = percentage + '%';
    stepIndicator.textContent = `${currentStep}/${totalSteps}`;
}


function startQuiz() {
    showScreen('question1Screen');
    currentStep = 2;
    updateProgress();
}

function showScreen(screenId) {
    // Hide current screen
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('exit');
        
        setTimeout(() => {
            currentScreen.classList.remove('exit');
        }, 500);
    }

    // Show new screen
    setTimeout(() => {
        const newScreen = document.getElementById(screenId);
        newScreen.classList.add('active');
    }, 250);
}

function selectCountry(country, questionNumber) {
    const answers = {
        1: 'italy',
        2: 'france'
    };

    const feedbackEl = document.getElementById(`feedback${questionNumber}`);
    const isCorrect = country === answers[questionNumber];
    
    feedbackEl.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect!';
    feedbackEl.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
    
    const clickedPin = event.target;
    clickedPin.classList.add('pulse');
    
    setTimeout(() => {
        clickedPin.classList.remove('pulse');
        feedbackEl.classList.remove('show');
        
        if (isCorrect) {
            correctAnswers++;
            currentStep++;
            updateProgress();
            
            if (questionNumber === 1) {
                showScreen('question2Screen');
            } else if (questionNumber === 2) {
                showScreen('videoScreen');
                currentStep = 4;
                updateProgress();
            }
        }
    }, 1500);
}

function toggleMute() {
    const video = document.getElementById('adVideo');
    const unmuteBtn = document.getElementById('unmuteBtn');
    
    if (video.muted) {
        video.muted = false;
        unmuteBtn.textContent = '🔇 Mute';
    } else {
        video.muted = true;
        unmuteBtn.textContent = '🔊 Unmute';
    }
}


//  hover effects
document.addEventListener('DOMContentLoaded', function() {
    const pins = document.querySelectorAll('.map-pin');
    pins.forEach(pin => {
        pin.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(-45deg) scale(1.2)';
        });
        
        pin.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(-45deg) scale(1)';
        });
    });
});