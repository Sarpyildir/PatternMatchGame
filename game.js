const buttonColors = ["red", "blue", "green","yellow"];
var targetPattern = [];
var userClickedPattern = [];
var level =0;
var started = false;


$(document).keypress(function (event){
    if(!started){
        $("h1").text("Level: "+ level);
        started = true;
        nextSequence();
    }
    
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });
function nextSequence(){
    userClickedPattern=[];
    level = level+1;
    $("h1").text("Level: "+ level);
    var no = randomNumGenerator();
    var randomColor = buttonColors[no];
    targetPattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function randomNumGenerator(){
    var num = Math.random();
    num = num * 4;
    num = Math.floor(num);
    return num;
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function playSound(nameOfSound){
    const sound = new Audio("sounds/"+nameOfSound+".mp3");
    sound.play();
}
function checkAnswer(currentLevel){
    if (targetPattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === targetPattern.length){
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
function startOver(){
    level = 0;
    started = false;
    targetPattern =[];
}