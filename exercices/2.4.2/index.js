const red = document.querySelector("#red");
const orange = document.querySelector("#orange");
const green = document.querySelector("#green");
const btnstop = document.querySelector("#stop");

let myIntervalId;
let compt = 0;

btnstop.addEventListener("click" , stopOrResumeChangeColor);

startChangeColor();

function startChangeColor() {
  clearInterval(myIntervalId);
  myIntervalId = undefined;
  myIntervalId = setInterval(changeColor , 1000);
}


function changeColor() {
  compt++;
  if(compt == 1){
    document.getElementById("green").style.backgroundColor = `rgb(255, 255, 255)`
    document.getElementById("green").style.backgroundColor = `rgb(0, 128, 0)`
    startChangeColor();
  }
  if(compt == 5){
    document.getElementById("orange").style.backgroundColor = `rgb(255, 255, 255)`
    document.getElementById("green").style.backgroundColor = `rgb(0, 128, 0)`
    compt = 1;
    startChangeColor();
  }
  if(compt == 2){
    document.getElementById("green").style.backgroundColor = `rgb(255, 255, 255)`
    document.getElementById("orange").style.backgroundColor = `rgb(255, 165, 0)`
    startChangeColor();
  }
  if(compt == 4){
    document.getElementById("red").style.backgroundColor = `rgb(255, 255, 255)`
    document.getElementById("orange").style.backgroundColor = `rgb(255, 165, 0)`
    startChangeColor();
  }
  if(compt == 3){
    document.getElementById("orange").style.backgroundColor = `rgb(255, 255, 255)`
    document.getElementById("red").style.backgroundColor = `rgb(255, 0, 0)`
    startChangeColor();  
  }
  
  
}

function stopOrResumeChangeColor () {
  if(myIntervalId){
    clearInterval(myIntervalId);
    myIntervalId = undefined;
  }
  else startChangeColor();
}