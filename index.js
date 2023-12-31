// we will use an array to make it easy to check for the winner.
var board = ["L", "o", "r", "e", "m", "I", "p", "s", "u"];
var subBoard = ["L", "o", "r", "e", "m", "I", "p", "s", "u"];
var char = ["X", "O"];
var turn = 0;
var numberOfTurns = 0;
var sound = true;
// hidding the sound off icon in the begging.
$(".sound-off").hide();
// hidding the the turn display in the begging.
$(".turn").hide();


$(".start-button").click(function() {
    $(".start-game").hide();
    $(".turn").show();
    $(".btn").text("");
    startGame();
});


function startGame() {
    $(".turn").text("Player " + (turn+1) + " turn.");
    
    // adding an event listener to all the buttons.
    $(".btn").click(function() {

        // check if the choosen button is not used before.
        if($(this).hasClass("pressed")) {
            $(".turn").text("Please choose an empty box");
        }else{
            numberOfTurns++;

            // display the X or O on the button.
            $(this).text(char[turn]);

            // play a click sound.
            playSoundOf("ping")

            // add a click effect.
            $(this).fadeOut(10).fadeIn(100);

            // add a class to know that this button was clicked.
            $(this).addClass("pressed");
            // we could remove the event listener but the class
            // pressed will help me to show the error message.
            // $(this).off("click");

            // change the board array to X or O.
            changeInnerBoard($(this).attr("id"), char[turn]);
            
            // check for the winner or a draw.
            if(checkWinner()) {
                displayWinner(turn);
                endGame();
            }
            else if(numberOfTurns === 9){
                displayDraw();
                endGame();
            }
            else{
                // if no one won we change the turn and continue.
                turn = 1 - turn;
                // change the turn display.
                $(".turn").text("Player " + (turn+1) + " turn.");
            }

        }
    });
}


// adding an event lisenter to the sound button to turn it on/off.
$(".sound-button").click(function() {
    if(sound){
        sound = false;
        $(".sound-on").hide();
        $(".sound-off").show();
    }
    else{
        sound = true;
        $(".sound-off").hide();
        $(".sound-on").show();
    }
});


// a function to end the game and reset the default settings.
function endGame() {
    $(".turn").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $(".btn").off("click");
    $(".start-game").show();
    $(".btn").removeClass("pressed");
    for(var i = 0; i < 9; i++){
        board[i] = subBoard[i];
    }
    turn = 0;
    numberOfTurns = 0;
}


// a function to display the draw.
function displayDraw() {
    $(".turn").text("It's a Draw!");
}


// a function to display the winner.
function displayWinner(turn) {
    $(".turn").text("Player " + (turn+1) + " won!");
    playSoundOf("crowd-cheer")
}


// a function to change the board array.
function changeInnerBoard(index, turnChar) {
    board[index - 1] = turnChar;
}


// a function to check for all the possible situations for the winner.
function checkWinner() {
    if(board[0] === board[1] && board[1] === board[2] ||
       board[3] === board[4] && board[4] === board[5] ||
       board[6] === board[7] && board[7] === board[8] ||
       board[0] === board[4] && board[4] === board[8] ||
       board[2] === board[4] && board[4] === board[6] ||
       board[0] === board[3] && board[3] === board[6] ||
       board[1] === board[4] && board[4] === board[7] ||
       board[2] === board[5] && board[5] === board[8]) {
            return true;
    }
    return false;
}


// a function to play sounds.
function playSoundOf(name){
    if(sound){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
    }
}
