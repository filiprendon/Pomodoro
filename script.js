
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
let alarm = document.getElementById('alarm');
let intervalCountdown;
let pomodoroTimer = minutes * seconds;
let idCounter = 1;

// Comentarios crack
function minutesPerOption() {
    if (timerType === pomodoro) {
        minutes = .1;
        pomodoroTimer = minutes * 60;
    }
    else if (timerType === shortBreak) {
        minutes = .1;
        pomodoroTimer = minutes * 60;
    }
    else if (timerType === longBreak) {
        minutes = .1;
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
        alarm.play();
        setTimeout(() => {
            if (confirm('Time out')) {
                alarm.pause();
                alarm.currentTime = 0;
            }
        }, 100);

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

function currentDate() {
    const d = new Date();
    // 24 en vez de 2024
    let year = d.getFullYear().toString().slice(-2);;
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let currentDate = day + '/' + month + '/' + year + ' ' + hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
    return currentDate;
}


function deleteTasks() {
    if (document.getElementById('delete').innerHTML == '') {
        alert('No tasks to delete')
    } else {
        if (confirm('Do you want to permanently delete these tasks?')) {
            document.getElementById('delete').innerHTML = '';
        } else {
            return;
        }
    }
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let target = event.target;

    // Buscar el elemento de columna ascendiendo en la jerarquía de elementos DOM
    while (target && !target.classList.contains('column')) {
        target = target.parentNode;
    }
    // Verificar si se encontró un elemento de columna
    if (target && target.classList.contains('column')) {
        target.querySelector('.task-list').appendChild(document.getElementById(data));
    }

    if (target && target.classList.contains('done-column')) {
        document.getElementById(data).draggable = false;

        let taskElement = document.getElementById(data);

        // Crear el SVG para el check verde
        let checkSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        checkSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        checkSVG.setAttribute("width", "16");
        checkSVG.setAttribute("height", "16");
        checkSVG.setAttribute("fill", "green");
        checkSVG.setAttribute("class", "bi bi-check-square-fill check-icon-svg");
        checkSVG.setAttribute("viewBox", "0 0 16 16");

        let checkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        checkPath.setAttribute("d", "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z");

        checkSVG.appendChild(checkPath);
        taskElement.appendChild(checkSVG);
    }
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
        alert('Please add a title and a description');
        return;
    }
    else {
        // Añado la clase a la nueva tarea
        let taskId = 'task' + idCounter;
        idCounter++;
        let newTask = `<li class="task new-task" id=${taskId} draggable="true" draggable="true" ondragstart="drag(event)">
        <h5><b>${title}</b></h5><br><p>${description}</p><p>${currentDate()}</p></li>`;
        document.getElementById('to-do').innerHTML += newTask;
        // Borrar el contenido de la tarea que acabamos de añadir
        document.getElementById('taskText').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '0';
        optionColor(selectedOption);
        console.log(currentDate())
    }
}

panelControls();