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
let messages = [
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

// cercare eventuli dati salvati in Local Storage 
const localTeamData = JSON.parse(localStorage.getItem('history-messages'));

if(localTeamData !== null) {
    messages = localTeamData;
}

// rendering messaggi all'avvio
renderingMessages();
chatBoxEl.scrollTop = chatBoxEl.scrollHeight;


// evento invio form(nuovo messaggio) 
chatFormEl.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    
    // lettura dato inserito nella form
    const inputChatValue = chatInputEl.value.trim();

    // evitare dati(messaggi) senza nulla
    if(inputChatValue === '')  return;

    addNewmessageData(inputChatValue, 'sent');

    renderingMessages();
    
    // reset form e focus sull'input
    chatFormEl.reset();
    chatInputEl.focus();

    // scorrimento della chat segue l'aggiornamento della chat
    scrollingChat();

    // convertire i dati in modo da renderli interpretabili dall' API
    const formattedMessages = messages.map((message)=> {
        return {
            role: message.type === 'sent' ? 'user' : 'model',
            parts: [
                {
                    text: message.text,
                }
            ]
        }
    })
    
    // Aggiunta del system prompt nella conversazione
    formattedMessages.unshift({
        role: 'user',
        parts: [
            {
                text: geminiConfig.systemPrompt,
            }
        ]
    })

    // Call AJAX in versione POST
    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({contents: formattedMessages}),
        headers: {
            'content-type': 'application/json',
        }
    })
    console.log(response)
    const data = await response.json();
    console.log(data)
    const aiMessage = data.candidates[0].content.parts[0].text;
    console.log(aiMessage)

    addNewmessageData(aiMessage, 'received');

    renderingMessages();

    scrollingChat();

    // impostare la key per salvare la conversazione aggiornata nel localStorage
    localStorage.setItem('history-messages', JSON.stringify(messages));
});



// ******************FUNCTIONS**************************  

/**
 * Aggiornamento UI con i messaggi attuali
 */

function renderingMessages() {
    let messageMarkUp ='';
    
    messages.forEach( (message) => {
        
        // destrutturazione delle proprietà dell'oggetto
        const {text, type, time} = message;
        
        
        messageMarkUp += 
        `<div class="chat-row ${type}">
            <div class="chat-message">
                <p>${text}</p>
                <time>${time}</time>
            </div>
        </div>`;
    });
    
    chatBoxEl.innerHTML = messageMarkUp;
}

/**
 * Aggiungere nuovo messaggio
 * 
 * @param {string} text  il testo del nuovo messaggio
 * @param {string} type  il type del nuovo messaggio aggiunto: 'sent'(se inviato da noi) o 'received'(se ricevuto da API)
 */
function addNewmessageData(text, type) {
       const newMessage =  {
        text,
        type,
        time: getCurrentDayHour() ,
    }

    messages.push(newMessage);
}

function scrollingChat() {
        chatBoxEl.scrollTop = chatBoxEl.scrollHeight;

}