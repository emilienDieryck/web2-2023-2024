const btn = document.querySelector('.button');
const message = document.querySelector('.message');

let timeoutID;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;
let cmpt = 0;

btn.addEventListener('click' , () => {
  timeoutID = setTimeout(() => {

  }, delayInMiliSeconds);
  cmpt++;
  if(timeoutID == delayInMiliSeconds && cmpt < 10){
    message.textContent = 'Game over, you did not click 10 times within 5s !';
  }
  if(timeoutID <= delayInMiliSeconds && cmpt == 10){
    message.textContent = 'You win ! You clicked 10 times within ${timeoutID} ms';
  }
})

function startTimeOut() {
    timeoutID = setTimeout(() => {
    }, delayInMiliSeconds);
}
  
function clearAlert() {
  clearTimeout(timeoutID);
}