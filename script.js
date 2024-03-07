let timerType = 'pomodoro';
let isPaused = false;
let minutes = 25;
const seconds = 60;

let displayMin = document.getElementById('min');
let displaySec = document.getElementById('sec');
let startBtn = document.getElementById('startBtn');
let shortBreak = document.getElementById('short-break');
let longBreak = document.getElementById('long-break');
// let pauseBtn = document.getElementById('pauseBtn');
let restartBtn = document.getElementById('restartBtn');

let intervalCountdown;

let pomodoroTimer = minutes * seconds;

function minutesPerOption(type) {
    if (type === 'pomodoro') {
        minutes = 25;
    }
    else if (type === shortBreak) {
        minutes = 5;
    }
    else if (type === longBreak) {
        minutes = 15;
    }
    displayMin.textContent = minutes;
}



function countdown() {
    let minutes = Math.floor(pomodoroTimer / 60);
    let seconds = pomodoroTimer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayMin.textContent = minutes;
    displaySec.textContent = seconds;

    console.log(minutes, seconds);
    pomodoroTimer--;

    if (pomodoroTimer < 0) {
        clearInterval(intervalCountdown);
        alert('Muerto');
    }
    document.title = minutes + ":" + seconds;

}


startBtn.onclick = function () {
    if (!isPaused) {
        intervalCountdown = setInterval(countdown, 1000);
        startBtn.textContent = 'Pause';
    } else {
        clearInterval(intervalCountdown);
        startBtn.textContent = 'Resume';
    }
    isPaused = !isPaused;
};



// restartBtn.onclick = function() {
//     location.reload();
// }


shortBreak.onclick = function () {
    // intervalCountdown = setInterval(countdown, 1000);
}

longBreak.onclick = function () {

}


// countdown();