let toogle = false
let level = 0
let gamePattern =[]
let aruserChosenColour=[]
let buttonColours =["red", "blue", "green", "yellow"]

//starting the game

document.addEventListener('keydown', function(){
  if(!toogle){
      document.querySelector('#level-title').textContent='Level '+level
      nextSequence()
      toogle = true
    }
});

//getting user choice and playing neccesary fuction 


const buttons = document.querySelectorAll(".btn");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    let userChosenColour = button.id
    playSound(userChosenColour)
    animatepress(userChosenColour)
    aruserChosenColour.push(userChosenColour)
    checkAnswer(aruserChosenColour.length-1)
  });
});

//getting computer generated sequence

function nextSequence(){
  aruserChosenColour = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber]
  level++;
  document.querySelector('#level-title').textContent='Level '+level
  gamePattern.push(randomChosenColour)
  let button = $('#'+randomChosenColour)
  button.fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}

//checking user answer function

function checkAnswer(currentlevel){
  if(aruserChosenColour[currentlevel]==gamePattern[currentlevel]){
    if (aruserChosenColour.length === gamePattern.length){
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
    else{

      console.log('yooo');
      const elements = document.querySelector('body');
      elements.classList.add('game-over');
      document.querySelector('#level-title').textContent='Game Over, Press Any Key to Restart'
      playSound("wrong")
      setTimeout(function() {
      elements.classList.remove('game-over');
      },200);
      startOver(); 
      } 
}

//starting over

function startOver(){
  toogle = false
  level = 0
  gamePattern =[] 
  aruserChosenColour=[]
}

// playing sound

function playSound(name){
  let  audio = new  Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//animating the user pressed animation

function animatepress(currentColour){
  // Select all elements that match the CSS selector
const elements = document.querySelector('#'+ currentColour);
elements.classList.add('pressed');
setTimeout(function() {
  elements.classList.remove('pressed');
},50);
}

