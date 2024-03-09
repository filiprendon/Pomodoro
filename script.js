let isPaused = false;
let minutes = 25;
let seconds = 60;
let displayMin = document.getElementById('min');
let displaySec = document.getElementById('sec');
let startBtn = document.getElementById('startBtn');
let shortBreak = document.getElementById('short-break');
let longBreak = document.getElementById('long-break');
let pomodoro = document.getElementById('pomodoro');
let addTask = document.getElementById('add');

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
    if (timerType == shortBreak || timerType == longBreak) {
        document.title = minutes + ":" + seconds + ' - Break';
    } else {
        document.title = minutes + ":" + seconds + ' - Work';
    }


}

function disabledButtons() {
    shortBreak.disabled = false;
    longBreak.disabled = false;
    pomodoro.disabled = true;
}
disabledButtons();


function user() {
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

    addTask.onclick = function () {
        let title = document.getElementById('taskText').value;
        let description = document.getElementById('description').value;
        if (title == '' || description == '') {
            alert('');
            return;
        }
        else {
            document.getElementById('to-do').innerHTML += `<li class="task"><h5><b>` + title + `</h5> </b><br><p>` + description + `</p></li>`;
            document.getElementById('taskText').value = '';
            document.getElementById('description').value = '';
        }

    }
    shortBreak.onclick = function () {
        disabledButtons();
        timerType = shortBreak;
        minutesPerOption();
        shortBreak.disabled = true;
        pomodoro.disabled = false;
    }

    longBreak.onclick = function () {
        disabledButtons();
        timerType = longBreak;
        minutesPerOption();
        longBreak.disabled = true;
        pomodoro.disabled = false;
    }

    pomodoro.onclick = function () {
        disabledButtons();
        timerType = pomodoro;
        minutesPerOption();
        pomodoro.disabled = true;
    }
}
user();