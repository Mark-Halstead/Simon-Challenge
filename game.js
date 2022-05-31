
//Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];
var started = false;
var level = 0;



//Detecting Button Click
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  clickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(clickPattern.length-1);
});


//Sound depending on what button was clicked on
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Animation depending on what button was clicked on
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Startover function!
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


//Randomly choosing Coloured Button function
function nextSequence() {
  clickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


//Changing h1 to next level
function changeLevel() {
  $("#level-title").text("Level " + levelNumber);
}


//Detecting Keyboard press then calling nextSequence function
$(document).keydown(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Function to check the users answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === clickPattern[currentLevel]) {
      if (clickPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
