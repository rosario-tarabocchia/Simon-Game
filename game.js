var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);
})

function nextSequence() {

  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  cyclePreviousColors();

}

//Delay for loop --

const cyclePreviousColors = async () => {
  for (var i = 0; i < gamePattern.length; i++) {
    colorFlashAndSound(gamePattern[i]);
    await sleep(1000);
  };
}

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}


function colorFlashAndSound(color) {
  setTimeout(function() {
    $("#" + color).fadeIn(200).fadeOut(200).fadeIn(200);
    var btnSound = new Audio("sounds/" + color + ".mp3");
    btnSound.play()
  }, 1500)
}



function checkAnswer(currentLevel) {

  if (userClickedPattern.length == currentLevel) {
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
      userClickedPattern = [];
      level++;
      setTimeout(function() {
        nextSequence();
      }, 1000);

    } else {
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200)

      $("h1").text("Game Over! Press Any Key To Continue");
      level = 0;
      userClickedPattern = [];
      gamePattern = [];
    }
  }
}

$(document).keydown(function(event) {
  level++;
  nextSequence();
  console.log(event.key);

});



function playSound(name) {

  var clickSound = new Audio("sounds/" + name + ".mp3");
  clickSound.play();

}

function animatePress(currentColour) {
  console.log("HERE");

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {

    $("#" + currentColour).removeClass("pressed");
  }, 100);


}
