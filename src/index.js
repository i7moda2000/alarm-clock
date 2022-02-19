function currentTime() {
  const date = new Date();

  let hours = date.getHours();
  let mins = date.getMinutes();
  let sec = date.getSeconds();

  const sleep = () =>
    setTimeout(function () {
      currentTime();
    }, 1000);

  const updateTime = (k) => {
    if (k < 10) {
      return '0' + k;
    }
    return k;
  };

  hours = updateTime(hours);
  mins = updateTime(mins);
  sec = updateTime(sec);

  document.querySelector('#clock').innerText = `${hours} : ${mins} : ${sec}`;

  sleep();
}

function Alert(msg) {
  const notif = document.querySelector('#msg');

  notif.style.display = 'block';
  notif.innerText = msg;

  setTimeout(() => {
    notif.innerText = '';
    notif.style.display = 'none';
  }, 2000);
}

function setupAlarm() {
  var snd = new Audio('https://bigsoundbank.com/UPLOAD/wav/0035.wav');
  snd.loop = true;
  snd.volume = 0.9;

  let alarmTime = null;
  let currentTime = null;
  const timeouts = [];
  const select = document.querySelector('#alarms');

  const timeControl = document.querySelector('input[name="time"]');

  const alarm = (t) =>
    setTimeout(() => {
      snd.play();
    }, t);

  const getAlarmTime = () => {
    alarmTime = new Date(timeControl.value);
  };

  const setAlarm = () => {
    if (alarmTime) {
      currentTime = new Date().getTime();
      const tiemout = alarm(alarmTime.getTime() - currentTime);
      timeouts.push(tiemout);
      Alert(`alarm set ${alarmTime.toLocaleTimeString()} `);
    }
  };
  const clearTimeout = (i) => {
    clearTimeout(timeouts[i]);
    timeouts.splice(i, 1);
  };
  const clearAllTimeout = () => {
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
      timeouts.splice(i, 1);
    }
  };
  const clearAlarm = () => {
    if (timeouts) {
      snd.pause();
      alarmTime = null;
      timeControl.value = null;
      clearAllTimeout();
      Alert('Cleared all alarms');
    }
  };

  timeControl.addEventListener('change', () => {
    getAlarmTime();
  });

  document
    .querySelector('button[name="set"]')
    .addEventListener('click', setAlarm);
  document
    .querySelector('button[name="clear"]')
    .addEventListener('click', clearAlarm);

  window.addEventListener('keydown', clearAlarm);
}

function init() {
  currentTime();
  setupAlarm();
}

init();
