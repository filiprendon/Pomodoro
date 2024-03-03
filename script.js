let minutes = 25;
let seconds = 60;

document.getElementById('min').textContent = minutes;
document.getElementById('sec').textContent = seconds;

function countdown(){
    setInterval(() => {
        seconds = seconds-1;
        
        console.log(seconds);
    }, 1000);
}
countdown();