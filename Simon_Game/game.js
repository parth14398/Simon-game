var buttonColours = ["red", "blue", "green", "yellow"];

var gamePatterns = [];
var userClickedPattern = [];
var countkeypress = 0;
var level = 0;

$(" .btn ").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);

  var currentColour = $(this);
  animatePress(currentColour);
  checkAnswer((userClickedPattern.length - 1))

})

function nextSequence() {
  userClickedPattern = []
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];

  gamePatterns.push(randomChoosenColour);
  $("#" + randomChoosenColour).fadeOut(75).fadeIn(75);

  playSound(randomChoosenColour);
  $("h1").text("level " + level);
  level += 1;


}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();

}

function animatePress(currentColour) {
  currentColour.addClass("pressed");

  setTimeout(function() {
    $(currentColour).removeClass("pressed");

  }, 200);


}
$(document).keypress(function(event) {
  if (event.key === 'a' && countkeypress === 0) {
    nextSequence();

    countkeypress += 1;
  }
})

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  console.log(gamePatterns[currentLevel] + "\n" + userClickedPattern[currentLevel]);
  if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (JSON.stringify(userClickedPattern)==JSON.stringify(gamePatterns)){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("fail");
    new Audio("sounds\\wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 400);
    $("h1").text("Game over press A to restart")
    startover();
  }
}
function startover(){
  level=0;
  countkeypress =0;
  gamePatterns=[];
}
