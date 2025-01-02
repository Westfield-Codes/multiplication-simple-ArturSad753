// webapp
function setup(){
    let console = document.getElementById("console");
    let button = document.createElement("button");
    button.addEventListener("click",main);
    button.innerHTML = "<h3> Start Multiplication </h3>";
    console.appendChild(button);

}
/* MULTIPLICATION QUIZ
 * This program should ask five multiplication questions, displaying which question
 * is being asked, and counting the number of equations with at least one error.
 * FLOWCHART: https://lucid.app/lucidchart/5a3164fd-459f-494d-9cae-b4a6be593b13/view
 */
var mistakes = [];

/* main controls the program. Calling askFive() it provides feedback depending on the 
 * number wrong returned: 0 = "Perfect!" otherwise it says how many wrong. 
 * @param none
 * @return none
 */
function main() {
    let wrong = 0;
    wrong = askFive();
    if (wrong == 0) alert("Perfect");
    else{ 
        alert("You got " + wrong + " out of five wrong");
        analyzeMistakes();
    }
}

/* askFive calls askQuestion() five times, sending the question number as an argument. 
 * It counts number wrong returned, and return number wrong to main().
 * @param: none
 * @return: score (0-5)
 */
function askFive() {
    let wrong = 0;
    for (let question = 1; question < 6; question++){
        wrong+= askQuestion(question);
    }
    return wrong;
}

/* askQuestion asks a multiplication question, using the quesiton parameter to say which
 * question is being asked.  It returns 1 if incorrect, 0 if correct.
 * @param: question (integer 1-5)
 * @return: integer (0 or 1)
 */
function askQuestion(question){
    let a = Math.floor(Math.random()*7)+3;
    let b = Math.floor(Math.random()*7)+3;
    let product = a*b;
    let equation = "question " + question + " : " + a + " * " + b + " = ?";
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
    let countMistakes = [];
    let errorList = "you made these errors:\n";
    for(let factor = 0; factor < mistakes.length; factor++){
        countMistakes[factor]++;
    }
    for(let factor = 3; factor < 9; factor++){
        if(countMistakes[factor] > 0){
            errorList+= "factor " + factor + ":" + countMistakes[factor] + "\n";
        }
    }
    alert("mistakes = " + errorList);



}
