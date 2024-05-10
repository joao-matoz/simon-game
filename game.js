//Initiating Arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Initiating Variables
var level = 0;
var started = false;

//Function for as soon as the player presses a key in the website the game starts
$(document).keypress(function(){
    
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }

});

/*Function to store the color clicked by the user and add to the userClickedPattern array, aswell as
set the sounds and animations to the button clicked*/
$(".btn").on("click", function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

}); 

/* Function to check if the answer of the user is equal to the game pattern, if it is then it will
call the next sequence so the game continues, if not then it will be game over and ask the player
to press any key so the game restarts.*/
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else{

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        var gameOver = new Audio("sounds/gameover.wav");
        gameOver.play();

        startOver();
    }

}

// Function that will call the next sequence, it will generate a random colour for the pattern.
function nextSequence(){
    
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
}

// Function that will reset the variables when the game's over
function startOver(){

    $("h1").text("Game Over, Press Any Key to Restart");

    level = 0;
    gamePattern = [];
    started = false;
}

// Function that plays the sound of each pressed button and the buttons called for the sequence
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function that will animate the buttons
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {$("#" + currentColour).removeClass("pressed");}, 100);
}