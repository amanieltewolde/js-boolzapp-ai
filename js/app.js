console.log('Facciamoci una chiacchera')
// set up endpoint gemini
const endpoint = `${geminiConfig.endpoint}?key=${geminiConfig.apiKey}`;

// DOM Ref
const chatBoxEl = document.querySelector('.chat-box');
const chatFormEl = document.getElementById('chat-form');
const chatInputEl = chatFormEl.querySelector('input')

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

    
    let messageMarkUp = 
        `<div class="chat-row ${type}">
            <div class="chat-message">
                <p>${text}</p>
                <time>${time}</time>
            </div>
        </div>`;


chatBoxEl.innerHTML += messageMarkUp;
});        

