console.log('Facciamoci una chiacchera')
// set up endpoint gemini
const endpoint = `${geminiConfig.endpoint}?key=${geminiConfig.apiKey}`;



// DOM Ref
const chatBoxEl = document.querySelector('.chat-box');
const chatFormEl = document.getElementById('chat-form');
const chatInputEl = chatFormEl.querySelector('input');

// set up data-ora
const opzioni = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
} 

const formatter =  new Intl.DateTimeFormat('it-IT', opzioni);
function getCurrentDayHour() {
    return formatter.format(new Date());
}

// storia conversazione 
const messages = [
    {
        text:'ciao sono Ama, come stai?',
        type:'sent',
        time:'15/09/26 14:57',
    },   
    {
        text:'io sto molto bene, tu?',
        type:'received',
        time:'15/09/26 15:00',
    }
];

// rendering messaggi
messages.forEach( (message) => {

    // destrutturazione delle proprietà dell'oggetto
    const {text, type, time} = message;

    
    const messageMarkUp = 
        `<div class="chat-row ${type}">
            <div class="chat-message">
                <p>${text}</p>
                <time>${time}</time>
            </div>
        </div>`;


chatBoxEl.innerHTML += messageMarkUp;
});        

chatFormEl.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const inputChatValue = chatInputEl.value;

    const newMessage =  {
        text:inputChatValue,
        type:'sent',
        time: getCurrentDayHour() ,
    }
    // inputChatValue.reset();
    // chatInputEl.focus();

    
})
