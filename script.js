/* MULTIPLICATION QUIZ
 * This program should ask five multiplication questions, displaying which question
 * is being asked, and counting the number of equations with at least one error.
 * FLOWCHART: https://lucid.app/lucidchart/5a3164fd-459f-494d-9cae-b4a6be593b13/view
 */
var mistakes = [];
var minimum = 3;
var maximum = 9;
var questions = 0;
var stop = 2;

// webapp setup
function setup(){
    let gameboard = document.getElementById("gameboard");
    let button = document.createElement("button");
    button.addEventListener("click",main);
    button.innerHTML = "<h3> Start Multiplication </h3>";
    button.id = "button";
    gameboard.appendChild(button);
}

/* main controls the program. Calling askFive() it provides feedback depending on the 
 * number wrong returned: 0 = "Perfect!" otherwise it says how many wrong. 
 * @param none
 * @return none
 */
function main() {
    let gameboard = document.getElementById("gameboard");
    // Create Question box
    let question = document.createElement("div");
    question.id = "question";
    gameboard.appendChild(question);
    let inputs = document.createElement("div");
    inputs.id = "inputs";
    gameboard.appendChild(inputs);
    // Create Answer input
    let answer = document.createElement("input");
    answer.id = "answer";
    inputs.appendChild(answer);
    // Create button
    let button = document.getElementById("button");
    button.removeEventListener("click", main);
    button.innerHTML = "submit answer";
    inputs.appendChild(button);
    // Create feedback
    let feedback = document.createElement("div");
    feedback.id = "feedback";
    feedback.innerHTML = "";
    gameboard.appendChild(feedback);
    newQuestion();

}
function newQuestion(){
    let gameboard = document.getElementById("gameboard");
    let button = document.getElementById("button");
    button.removeEventListener("click", newQuestion);
    questions++;
    if (questions > stop) {
        analyzeMistakes();
    }
    else {
        button.innerHTML = "submit answer";
        displayFeedback("");
        document.getElementById("answer").value = "";
        let factors = newFactors();
        let question = document.getElementById("question");
        question.innerHTML = "question "+questions+": <br>"+factors[0]+" * "+factors[1]+ "?";
        button.addEventListener("click", function(){
            checkAnswer(factors);
        }, false)
    }
}

function newFactors(){
    let a = Math.floor(Math.random()*(maximum-minimum))+minimum;
    let b = Math.floor(Math.random()*(maximum-minimum))+minimum;
    let factors = [a,b];
    return factors;
}


function checkAnswer(factors) {
    let answer = document.getElementById("answer");
    let given = answer.value;
    let product = factors[0]*factors[1];
    if (given == product) displayFeedback(product + " is right.");
    else {
        displayFeedback("Wrong answer");
        mistakes.push(factors[0],factors[1]);
    }
    let button = document.getElementById("button");
    var button2 = button.cloneNode(true);
    button.parentNode.replaceChild(button2, button);
    button2.innerHTML = "Next question";
    button2.style.backgroundColor = "yellow";
    button2.addEventListener("click", newQuestion);
}
   
function displayFeedback(message){
    let feedback = document.getElementById("feedback");
    feedback.innerHTML = message;
}


function analyzeMistakes(){
    document.getElementById("feedback").remove();
    document.getElementById("button").remove();
    document.getElementById("answer").remove();
    let textBox = document.getElementById("question");
    if (mistakes.length == 0){ 
        let errorList = "you made no errors";
        textBox.innerHTML = errorList;
        let playagain = document.createElement("button");
        playagain.innerHTML = "play again";
        playagain.addEventListener("click",newGame);
        let inputs = document.getElementById("inputs");
        inputs.appendChild(playagain);
    }
    else{
        let countMistakes = [];
        for (let f = 0; f < mistakes.length; f++ ){
            if (isNaN(countMistakes[mistakes[f]])){
                    countMistakes[mistakes[f]]=1;
            }
            else {
                    countMistakes[mistakes[f]]++;
            }
        }
        let errorList = "you made these errors:<br>";
        for (let f = 0; f <= maximum; f++){
            if (isNaN(countMistakes[f])) {
                countMistakes[f]=0;
            }
            else if (countMistakes[f] > 0) {
                errorList +=  f + ":" + countMistakes[f] + "<br>";
            }
        }
        textBox.innerHTML = errorList;
        let button = document.createElement("button");
        button.innerHTML = "show times table";
        button.addEventListener("click",createTable);
        textBox.appendChild(button);

        
    }
     
}
function createTable(){
    let table = "Times Table for ";
    let factor = prompt("what times table do you want");
    table += factor+"<br>";
    for (let row = minimum; row <= maximum; row++) {
        table += factor+" * "+row+" = "+(factor * row)+"<br>";
    }
    let question = document.getElementById("question");
    question.innerHTML = table;
    let playagain = document.createElement("button");
    playagain.innerHTML = "play again";
    playagain.addEventListener("click",newGame);
    let inputs = document.getElementById("inputs");
    inputs.appendChild(playagain);
}

function newGame(){
    window.location.reload();
}