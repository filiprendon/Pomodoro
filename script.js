let isPaused = false;
let minutes = 25;
let seconds = 60;
let displayMin = document.getElementById('min');
let displaySec = document.getElementById('sec');
let startBtn = document.getElementById('startBtn');
let shortBreak = document.getElementById('short-break');
let longBreak = document.getElementById('long-break');
let pomodoro = document.getElementById('pomodoro');
// let pauseBtn = document.getElementById('pauseBtn');
let restartBtn = document.getElementById('restartBtn');

let intervalCountdown;

let pomodoroTimer = minutes * seconds;

function minutesPerOption() {
    if (timerType === pomodoro) {
        minutes = 25;
        pomodoroTimer = minutes * 60;
    }
    else if (timerType === shortBreak) {
        minutes = 5;
        pomodoroTimer = minutes * 60;
    }
    else if (timerType === longBreak) {
        minutes = 15;
        pomodoroTimer = minutes * 60;
    }
    displayMin.textContent = minutes;
    countdown();
}



function countdown() {    

    minutes = Math.floor(pomodoroTimer / 60);
    seconds = pomodoroTimer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayMin.textContent = minutes;
    displaySec.textContent = seconds;

    // console.log(minutes, seconds);
    pomodoroTimer--;

    if (pomodoroTimer < 0) {
        clearInterval(intervalCountdown);
        console.log('Muerto');
    }
    document.title = minutes + ":" + seconds;

}

function disabledButtons(){
    shortBreak.disabled = false;
    longBreak.disabled = false;
    pomodoro.disabled = true;
}
disabledButtons()
startBtn.onclick = function () {
    if (!isPaused) {
        intervalCountdown = setInterval(countdown, 1000);
        startBtn.textContent = 'Pause';
    } else {
        clearInterval(intervalCountdown);
        startBtn.textContent = 'Resume';
    }
    isPaused = !isPaused;
}

shortBreak.onclick = function(){
    disabledButtons();
    timerType = shortBreak;
    minutesPerOption();
    shortBreak.disabled = true;
    pomodoro.disabled = false;
}

longBreak.onclick = function(){
    disabledButtons();
    timerType = longBreak;
    minutesPerOption();
    longBreak.disabled = true;
    pomodoro.disabled = false;
}

pomodoro.onclick = function(){
    disabledButtons();
    timerType = pomodoro;
    minutesPerOption();
    pomodoro.disabled = true;
}