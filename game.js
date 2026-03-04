

var userClickedPattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 0;
var started = false;


$(document).keydown(function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});


function nextSequence(){

    userClickedPattern = [];


    level++;

    $("#level-title").text("Level "+ level);


    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColor[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);

});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");

    }, 100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess");

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var gameOverSound = new Audio("./sounds/wrong.mp3");

        gameOverSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

function startOver(){

    started = false;
    level = 0;
    gamePattern = [];
}