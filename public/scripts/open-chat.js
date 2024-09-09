import {hidePopover, showPopover} from "./popover.js";

const caption_pl = {
    option1: 'I would like to learn Python.',
    option2: 'I would like to learn Java.',
    option3: 'I would like to learn JavaScript.',
};

const caption_kl = {
    option1: 'I am a beginner.',
    option2: 'I have some experience.',
    option3: 'I am an expert.',
};


// Auswahl aller Buttons mit der Klasse 'change-context-button'
const contextButtons = document.querySelectorAll('.change-context-button');

// Hinzufügen eines Event-Listeners zu jedem Button
contextButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Suche nach dem aktuell ausgewählten Button
        const contextButton = document.getElementById('active');

        // Wenn ein anderer Button ausgewählt ist und der geklickte Button nicht der bereits ausgewählte ist
        if (contextButton && contextButton !== button) {
            // Entfernen der ID vom vorher ausgewählten Button
            contextButton.removeAttribute('id');
        }

        // Wenn der geklickte Button nicht bereits ausgewählt ist
        if (button !== contextButton) {
            // Zuweisen der ID zum geklickten Button
            button.id = 'active';
        }
    });
});


document.getElementById('chat-send-button').addEventListener('click', async function() {
    const button = this;
    button.disabled = true;
    document.getElementById("chat-input").disabled = true;

    try {
        await asyncFunction();
    } catch (error) {
        console.error(error);
    } finally {
        button.disabled = false;
        document.getElementById("chat-input").disabled = false;
    }
});


document.addEventListener("keydown", async function checkEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const button = document.getElementById('chat-send-button');
        button.disabled = true;
        document.getElementById("chat-input").disabled = true;

        try {
            await asyncFunction();
        } catch (error) {
            console.error(error);
        } finally {
            button.disabled = false;
            document.getElementById("chat-input").disabled = false;
        }
    }
});


async function asyncFunction() {

    const pl = document.getElementById('selection-pl-button-selected').value;
    //const pl = "option2";  // Placeholder value for testing
    const kl = document.getElementById('selection-kl-button-selected').value;
    //const kl = "option2";  // Placeholder value for testing
    const option = document.getElementById('active').value;
    const topic = document.getElementById('chat-input').value;

    // Dynamische Animation der Nachricht
    document.getElementById('api_info').style.display = 'block';
    const steps = ["Response will be generated", "Response will be generated.", "Response will be generated..", "Response will be generated..."];
    let currentStep = 0;
    const interval = setInterval(() => {
        document.getElementById('api_info').textContent = steps[currentStep];
        currentStep = (currentStep + 1) % steps.length;
    }, 1000);

    try {
        document.getElementById('history').innerHTML += '<div class="answer-block">';
        document.getElementById('history').innerHTML += `<div class="w-4/5 ml-6"><h4 class="text-blue-500">You:  </h4></div>`;
        document.getElementById('history').innerHTML += `<div class="w-4/5 ml-6">${document.getElementById('chat-input').value}</div>`;
        document.getElementById('history').innerHTML += '<br>';
        const response = await fetch(`/api/chat?option_pl=${pl}&option_kl=${kl}&option_ct=${option}&topic=${topic}`);
        const data = await response.json();
        clearInterval(interval);
        document.getElementById('history').innerHTML += '<div class="w-4/5 ml-6"><h4 class="text-green-500">CampusCode:  </h4>';
        document.getElementById('history').innerHTML += data.message;
        document.getElementById('history').innerHTML += '</div>';
        document.getElementById('history').innerHTML += '<br><br>';
        document.getElementById("chat-input").value = "";
        document.getElementById('api_info').style.display = 'none';
    } catch (error) {
        console.error(error);
        clearInterval(interval);
        document.getElementById('api_info').textContent = 'Error during communication with the API!';
        showPopover()
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('selection-start').addEventListener('click', function () {
        const pl = document.getElementById('selection-pl-button-selected').value;
        const kl = document.getElementById('selection-kl-button-selected').value;

        try {
            document.getElementById('history').innerHTML += '<div class="answer-block">';
            document.getElementById('history').innerHTML += '<div class="w-4/5 ml-6"><h4 class="text-green-500">CampusCode:</h4>  Hello, what do you want to learn today?</div><br>';
            document.getElementById('history').innerHTML += `<div class="w-4/5 ml-6"><h4 class="text-blue-500">You:</h4>  ${caption_pl[pl]}</div>`;
            document.getElementById('history').innerHTML += '</div><br><br>';
            document.getElementById('history').innerHTML += '<div class="answer-block">';
            document.getElementById('history').innerHTML += '<div class="w-4/5 ml-6"><h4 class="text-green-500">CampusCode:</h4>  Good choice! What is your knowledge level?</div><br>';
            document.getElementById('history').innerHTML += `<div class="w-4/5 ml-6"><h4 class="text-blue-500">You:</h4>  ${caption_kl[kl]}</div>`;
            document.getElementById('history').innerHTML += '</div><br><br>';
            document.getElementById('history').innerHTML += '<div class="answer-block">';
            document.getElementById('history').innerHTML += '<div class="w-4/5 ml-6"><h4 class="text-green-500">CampusCode:</h4>  Great! How can I help you?</div>';
            document.getElementById('history').innerHTML += '</div><br>';
        } catch (error) {
            console.error(error);
        }
    });
});

// Event Listener für den Schließen-Button des no API Popovers
document.getElementById('closePopover').addEventListener('click', hidePopover);

// Event Listener für den Zurück-Button für die Auswahl
document.getElementById('backto-selection-button').addEventListener('click', function () {

    // Vorherige Auswahl aufheben
    const selectedPlButton = document.getElementById('selection-pl-button-selected');
    const selectedKlButton = document.getElementById('selection-kl-button-selected');
    const selectionStartButton = document.getElementById('selection-start');

    selectedPlButton.removeAttribute('id');
    selectedKlButton.removeAttribute('id');
    selectionStartButton.classList.add('hidden');

    document.getElementById('selection-kl').style.display = 'none';

    // Chat verstecken
    document.getElementById('chat-container').style.display = 'none';

    // Chat leeren
    document.getElementById('history').innerHTML = '';

    // Auswahl wieder anzeigen
    document.getElementById('selections-container').style.display = 'flex';
});