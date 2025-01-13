// webapp
function setup(){
    let gameboard = document.getElementById("gameboard");
    let button = document.createElement("button");
    button.addEventListener("click",main);
    button.innerHTML = "<h3> Start Multiplication </h3>";
    button.id = "button";
    gameboard.appendChild(button);

}
/* MULTIPLICATION QUIZ
 * This program should ask five multiplication questions, displaying which question
 * is being asked, and counting the number of equations with at least one error.
 * FLOWCHART: https://lucid.app/lucidchart/5a3164fd-459f-494d-9cae-b4a6be593b13/view
 */
var mistakes = [];
let minimum = 3;
var maximum = 2;
var questions = 0;
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
    // Create Answer input
    let answer = document.createElement("input");
    answer.id = "answer";
    gameboard.appendChild(answer);
    // Create button
    let button = document.getElementById("button");
    button.removeEventListener("click",main);
    button.innerHTML = "submit answer";
    gameboard.appendChild(button);
    // Create feedback
    let feedback = document.createElement("div");
    feedback.id = "feedback";
    feedback.innerHTML = "";
    gameboard.appendChild(feedback);
    newQuestion();

}
function newQuestion(){
    let gameboard = document.getElementById("gameboard");
    questions++;
    console.log("question"+questions);
    if (questions > maximum) {
        console.log(questions+" maxreached");
        analyzeMistakes();
    }
    else {
        button.removeEventListener("click",newQuestion);
        button.innerHTML = "submit answer";
        displayFeedback("");
        document.getElementById("answer").value = "";
        let factors = newFactors();
        let question = document.getElementById("question");
        question.innerHTML = "question: "+questions+": \n"+factors[0]+" * "+factors[1];
        button.addEventListener("click", function(){
            checkAnswer(factors);
        }, false)
    }
}

function checkAnswer(factors) {
    let answer = document.getElementById("answer").value;
    console.log("Answer = "+answer);
    let product = factors[0]*factors[1];
    if (answer == product) displayFeedback(product + " is right.");
    else{
        displayFeedback("Wrong answer");
        mistakes.push(factors[0],factors[1]);
    }
    let button = document.getElementById("button");
    button.innerHTML = "Next question";
    button.removeEventListener("click",function(){
        checkAnswer(factors);
    }, false);
    button.addEventListener("click",newQuestion);
    button.style.backgroundColor = "yellow";
   
}
   
function displayFeedback(message){
    let feedback = document.getElementById("feedback");
    feedback.innerHTML = message;
}

/* askFive calls askQuestion() five times, sending the question number as an argument. 
 * It counts number wrong returned, and return number wrong to main().
 * @param: none
 * @return: score (0-5)
 */
function askFive() {
    let wrong = 0;
    for (let q = 1; q< 6; q++){
        wrong+= askQuestion(q);
    }
    return wrong;
}

function newFactors(){
    let a = Math.floor(Math.random()*(maximum+1))+minimum;
    let b = Math.floor(Math.random()*(maximum+1))+minimum;
    let factors = [a,b];
    console.log("factors:"+factors.toString());
    return factors;
}

/* askQuestion asks a multiplication question, using the quesiton parameter to say which
 * question is being asked.  It returns 1 if incorrect, 0 if correct.
 * @param: question (integer 1-5)
 * @return: integer (0 or 1)
 */
function askQuestion(questions){
    let a = Math.floor(Math.random()*(maximum+1))+minimum;
    let b = Math.floor(Math.random()*(maximum+1))+minimum;
    let product = a*b;
    let equation = "question " + questions + " : " + a + " * " + b + " = ?";
    let answer = prompt(equation);
    if (answer == product){
        alert("Correct");
        return 0;
    }
    else{  
        alert("Incorrect");
        mistakes.push(a,b);
        console.log(mistakes.toString());
        return 1;
    }
}

function analyzeMistakes(){
    //alert("Analize Mistakes");
    document.getElementById("feedback").remove();
    document.getElementById("button").remove();
    document.getElementById("answer").remove();
    let textBox = document.getElementById("question");
    let countMistakes = [];
    console.log("mistakes: "+ mistakes.toString());
    for (let f = 0; f < mistakes.length; f++ ){
       if (isNaN(countMistakes[mistakes[f]])){
            countMistakes[mistakes[f]]=1;
       }
       else {
            countMistakes[mistakes[f]]++;
       }
    }
    console.log("count: "+ countMistakes.toString());
    let errorList = "you made these errors:\n";
    for(let f = 0; f < maximum; f++){
        if (isNaN(countMistakes[f])) {
            countMistakes[f]=0;
        }
        else if (countMistakes[f] > 0) {
            errorList += "factor " + f + ":" + countMistakes[f] + "\n";
        }
    }
    console.log("error list: "+errorList);
    textBox.innerHTML = "mistakes = " + errorList;

}
