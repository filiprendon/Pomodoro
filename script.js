const minutes = 0.2;
const seconds = 60;

let displayMin = document.getElementById('min');
let displaySec = document.getElementById('sec');


let pomodoroTimer = minutes * seconds;

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
let intervalCountdown = setInterval(countdown, 1000);



// countdown();