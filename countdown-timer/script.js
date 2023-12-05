const days = document.getElementById("days");
const hours = document.getElementById("hours");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const updateCountDown = (deadline) => {
  const currentTime = new Date();
  const timeDifference = deadline - currentTime; //milliseconds

  // timeDifference is in milliseconds so calculating days, hours, mins, secs

  // timeDifference/1000 is to convert milliseconds to seconds
  // Math.floor remove decimal values
  // %60 is to just get the seconds
  let calcSecs = Math.floor(timeDifference / 1000) % 60;
  let calcMins = Math.floor(timeDifference / 1000 / 60) % 60;
  let calcHrs = Math.floor(timeDifference / 1000 / 60 / 60) % 24;
  let calcDays = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

  
  days.textContent = formatTime(calcDays);
  hours.textContent = formatTime(calcHrs);
  mins.textContent = formatTime(calcMins);
  secs.textContent = formatTime(calcSecs);

  // console.log(calcDays);
};

const countDown = (targetDate) => {
  setInterval(() => updateCountDown(targetDate), 1000);
};

const targetDate = new Date("September 01 2023");

countDown(targetDate);
