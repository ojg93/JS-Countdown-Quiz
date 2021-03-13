// Getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");


const option_list = document.querySelector(".option_list")

// If start Quiz Button Clicked
start_btn.onclick = () =>{
    info_box.classList.add("activateInfo"); //Shows the info box
};

//  If Exit Button Clicked
 exit_btn.onclick = () =>{
     info_box.classList.remove("activateInfo"); //hides the info box
 }

//  If Contine Button clicked
 continue_btn.onclick = () =>{
    info_box.classList.remove("activateInfo"); //hides the info box
    quiz_box.classList.add("activateQuiz"); //shows the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(45);
}


let que_count = 0;
let que_numb = 1;
let counter;
let timerValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector (".result_box");
const restart_quiz = result_box.querySelector (".buttons restart");
const quit_quiz = result_box.querySelector ( ".buttons .quit")


quit_quiz.onclick = function (){
    window.location.reload();
}


// If next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        // clearInterval(counter)
        // startTimer(timerValue);
    }else{
        console.log("Questions Completed");
        showResultBox();
    }    
}

// Getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text")
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] +"<span></span></div>"
                       + '<div class="option">' + questions[index].options[1] +"<span></span></div>"
                       + '<div class="option">' + questions[index].options[2] +"<span></span></div>"
                       + '<div class="option">' + questions[index].options[3] +"<span></span></div>";
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i= 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
    function optionSelected(answer){
        // clearInterval(counter)
        let userAns = answer.textContent;
        let correctAns = questions[que_count].answer;
        let allOptions = option_list.children.length;
        if (userAns === correctAns){
            userScore += 1;
            console.log(userScore);
            answer.classList.add("correct");
            console.log("correctAns");
        }else{
            answer.classList.add("incorrect");
            console.log("wrong");
            

        }
    

// / disabling all answers once user selects
for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled")
    
    }
}

function showResultBox(){
    info_box.classList.remove("activateInfo"); //hides info box
    quiz_box.classList.remove("activateQuiz"); //hides quiz box 
    result_box.classList.add("activateResult"); //shows result box
    const scoreText =  result_box.querySelector(".score_text")
    if(userScore > 3){
        let scoreTag = '<span>and congrats!, You got <p>' + userScore  + '</p> out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice, You got only <p>' + userScore  + '</p> out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag   
    }

    else{
        let scoreTag = '<span>and sorry, You got only <p>' + userScore  + '</p> out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag   
    }

};

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        

        }
    }
}





function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index + '</p>Of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}