
// VARIABLES
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
let option = document.getElementById('category');
let tasks = document.querySelectorAll('.to-do-column .task');
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

// Función para diferente color según el select 
function optionColor(selectedOption) {
    let newTasks = document.querySelectorAll('.new-task');
    newTasks.forEach(task => {
        if (selectedOption === '1') {
            task.style.backgroundColor = '#55ade9';
        } else if (selectedOption === '2') {
            task.style.backgroundColor = '#d5b0ff';
        } else if (selectedOption === '3') {
            task.style.backgroundColor = '#c2b891';
        }
        // Le quito la clase para que cambie de color correctamente
        task.classList.remove('new-task');
    });
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

function panelControls() {
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


function deleteTasks() {
    document.getElementById('delete').innerHTML = '';
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
}

addTask.onclick = function () {
    let title = document.getElementById('taskText').value;
    let description = document.getElementById('description').value;
    let selectedOption = option.value;

    if (title == '' || description == '') {
        alert('');
        return;
    }
    else {
        // Añado la clase a la nueva tarea
        let newTask = `<li class="task new-task"><h5><b>${title}</b></h5><br><p>${description}</p></li>`;
        document.getElementById('to-do').innerHTML += newTask;
        document.getElementById('taskText').value = '';
        document.getElementById('description').value = '';
        optionColor(selectedOption);
    }
}

panelControls();