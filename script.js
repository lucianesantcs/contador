const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");
const countdownModal = document.getElementById("countdownModal");
const formError = document.getElementById("formError");
const dateInput = document.querySelector('input[type="date"]');
console.log(dateInput);

let today = new Date();
let setDay = today.getDate();
let setMonth = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
let setYear = today.getFullYear();
today = `${setYear}-${setMonth}-${setDay}`;

dateInput.setAttribute("min", today);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let elDays = document.getElementById("days");
let elHours = document.getElementById("hours");
let elMinutes = document.getElementById("minutes");
let elSeconds = document.getElementById("seconds");
let startCountDown = null;

btnStart.addEventListener("click", handleCountDown);
btnReset.addEventListener("click", handleReset);
dateInput.addEventListener("blur", handleDateChecker);

function handleDateChecker() {
  if (dateInput.value !== "") {
    handleCountDown();
  }
}

function handleCountDown() {
  if (dateInput.value === "") {
    formError.innerText = "Preencha uma data.";
  } else {
    startCountDown = setInterval(countdown, 1000);
    countdownModal.style.display = "flex";
  }
}

function handleReset() {
  clearInterval(startCountDown);
  formError.innerText = "";
  dateInput.value = "";
  countdownModal.style.display = "none";
}

function countdown() {
  let endDate = new Date(document.querySelector('input[type="date"]').value.split("-")).getTime();

  let now = new Date().getTime();
  let time = endDate - now;

  if (time >= 0) {
    let days = Math.floor(time / day);
    let hours = Math.floor((time % day) / hour);
    let minutes = Math.floor((time % hour) / minute);
    let seconds = Math.floor((time % minute) / second);

    renderCountdown(days, hours, minutes, seconds);
  }
}

function renderCountdown(days, hours, minutes, seconds) {
  days = days < 10 ? "0" + days : days;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  elDays.innerHTML = days;
  elHours.innerHTML = hours;
  elMinutes.innerHTML = minutes;
  elSeconds.innerHTML = seconds;
}
