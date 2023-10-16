const btn = document.querySelector('.button');
const message = document.querySelector('.message');

let timeoutID;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;
let cmpt = 0;

btn.addEventListener('click', start);

function start() { 
  timeoutID = setTimeout(() => {
    if(cmpt < 10){
      message.textContent = 'Game over, you did not click 10 times within 5s !';
    } 
  }, delayInMiliSeconds);
  btn.addEventListener('click', btnClick);
  
}

function btnClick(){
  cmpt++;
  if(cmpt == 10){
    message.textContent = `You win ! You clicked 10 times within ${delayInMiliSeconds} ms`;
  }
}

function startTimeOut() {
    timeoutID = setTimeout(() => {
    }, delayInMiliSeconds);
}
  
function clearAlert() {
  clearTimeout(timeoutID);
}