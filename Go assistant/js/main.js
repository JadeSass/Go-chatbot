const micPhone = document.querySelector('i');
const micButton = document.querySelector('button');
const content = document.querySelector('.content');

// **************BOTS REPLY***********************
greetings = ['i am good and you my name is jadebot i am a product of jade code studio may i know you', 'i am fine, i am a bot and a product of jade code studio, jadebot is my name', 'i am fine and you, may i know your name'];
// **************BOT REPLY END HERE*****************

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;


recognition.addEventListener("start", startSpeechRecognition);
    console.log("Speech Recognition activated");    
    function startSpeechRecognition(){
        // micPhone.classList.remove("fa-microphone");
        micPhone.classList.add("record");
    };

    micButton.addEventListener("click", micBtnTrigger);
    function micBtnTrigger(){
        if(micButton.classList.contains("fa-microphone")){
            recognition.start();
        }else{
            recognition.stop();
        }
    }

recognition.onresult = function(event){
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOut(transcript);

    if(transcript.toLowerCase().trim()=== 'stop recording'){
        recognition.stop();
    }else{
        if(transcript.toLowerCase().trim()=== 'start recording'){
            recognition.start();
        }
    }
};
recognition.addEventListener("end", endSpeechRecognition);
    function endSpeechRecognition(){
        micPhone.classList.remove("record");
        micPhone.classList.add("fa-microphone");
        console.log("Recognition ended");
    }

micButton.addEventListener('click', ()=>{
    recognition.start();
});

function readOut(message){
    const speech = new SpeechSynthesisUtterance();

    errorFeed = ["i don\'t get you", "please come again","please can you kindly explain it well","i don\'t understand what you are saying","kindly repeat",'i have not been trained to reply such question'];

    speech.text = errorFeed[Math.floor(Math.random() * errorFeed.length)];
    humanQuest = ['hello', 'good day','how are you doing','holla'];

    if(message.includes(humanQuest[Math.floor(Math.random() * humanQuest.length)])){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;  
    }
    
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 3;   

    window.speechSynthesis.speak(speech);
}