let timer;
let minutes = 25;
let seconds = 0;

function updateDisplay(){
    document.getElementById("time").innerHTML =
        String(minutes).padStart(2,'0') + ":" +
        String(seconds).padStart(2,'0');
}

function startTimer(){

    clearInterval(timer);

    timer = setInterval(function(){

        if(seconds==0){

            if(minutes==0){
                clearInterval(timer);
                alert("🎉 Focus Session Complete!");
                return;
            }

            minutes--;
            seconds=59;

        }
        else{
            seconds--;
        }

        updateDisplay();

    },1000);

}

function resetTimer(){

    clearInterval(timer);

    minutes=25;
    seconds=0;

    updateDisplay();

}

updateDisplay();
const tips = [

"Study for 25 minutes, then take a 5 minute break.",

"Listening to calm instrumental ragas improves concentration.",

"Keep your phone away while studying.",

"Drink water regularly to stay focused.",

"Revise before sleeping for better memory retention.",

"Practice consistently instead of studying for long hours once."

];

document.getElementById("studyTip").innerHTML =
tips[Math.floor(Math.random()*tips.length)];