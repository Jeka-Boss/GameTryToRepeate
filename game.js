var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;


function playSound(name){
    var ms = new Audio("sounds/" + name + ".mp3");
    ms.play();
}
function animatePress(curentColour){
    $("div #" + curentColour).addClass("pressed");

    setTimeout(function(){ $("div #" + curentColour).removeClass("pressed")},100);
}

function nextSequence(){
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
   playSound(randomChosenColour);
   $("h1").text("Level " + level);
   level++;

}



$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    checkAnsver(userClickedPattern.length);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
});

function reloadGame(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnsver(currentLevel){
    
  
    if(userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000);
        }
       
    }else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
             $("body").removeClass("game-over");
             },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        reloadGame();
        
    }
}

$(document).keypress(function(){
    
if(level == 0){

    nextSequence();
    }
});


