// Auswahl aller Buttons mit der Klasse 'selection-pl'
const selectionPlButtons = document.querySelectorAll('.selection-pl');

// Hinzufügen eines Event-Listeners zu jedem Button
selectionPlButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Suche nach dem aktuell ausgewählten Button
        const selectedPlButton = document.getElementById('selection-pl-button-selected');

        // Wenn ein anderer Button ausgewählt ist und der geklickte Button nicht der bereits ausgewählte ist
        if (selectedPlButton && selectedPlButton !== button) {
            // Entfernen der ID vom vorher ausgewählten Button
            selectedPlButton.removeAttribute('id');
        }

        // Wenn der geklickte Button nicht bereits ausgewählt ist
        if (button !== selectedPlButton) {
            // Zuweisen der ID zum geklickten Button
            button.id = 'selection-pl-button-selected';

            // Zugriff auf das Element mit der ID 'selection-kl'
            const selectionKL = document.getElementById('selection-kl');

            // Überprüfen, ob das Element existiert
            if (selectionKL) {
                // Anwendung der Animation auf das Element
                selectionKL.style.transform = 'translateX(0)';
                selectionKL.style.display = 'flex'; // Macht das Element wieder zu einem Flex-Child
            }
        }
    });
});



// Auswahl aller Buttons mit der Klasse 'selection-kl'
const selectionKlButtons = document.querySelectorAll('.selection-kl');

// Hinzufügen eines Event-Listeners zu jedem Button
selectionKlButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Suche nach dem aktuell ausgewählten Button
        const selectedKlButton = document.getElementById('selection-kl-button-selected');

        // Wenn ein anderer Button ausgewählt ist und der geklickte Button nicht der bereits ausgewählte ist
        if (selectedKlButton && selectedKlButton !== button) {
            // Entfernen der ID vom vorher ausgewählten Button
            selectedKlButton.removeAttribute('id');
        }

        // Wenn der geklickte Button nicht bereits ausgewählt ist
        if (button !== selectedKlButton) {
            // Zuweisen der ID zum geklickten Button
            button.id = 'selection-kl-button-selected';
        }
    });
});



// Auswahl aller Buttons mit den Klassen 'selection-pl' und 'selection-kl'
const selectionButtons = document.querySelectorAll('.selection-pl, .selection-kl');

// Auswahl des Buttons mit der ID 'selection-start'
const selectionStartButton1 = document.getElementById('selection-start');

// Hinzufügen eines Event-Listeners zu jedem Button
selectionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Suche nach den ausgewählten Buttons
        const selectedPlButton = document.getElementById('selection-pl-button-selected');
        const selectedKlButton = document.getElementById('selection-kl-button-selected');

        // Wenn beide Buttons ausgewählt sind
        if (selectedPlButton && selectedKlButton) {
            // Entfernen der Klasse 'hidden' vom Button mit der ID 'selection-start'
            selectionStartButton1.classList.remove('hidden');
        }
    });
});



// Auswahl des Buttons mit der ID 'selection-start'
const selectionStartButton2 = document.getElementById('selection-start');

// Auswahl der Selection- und Chat-Container
const selectionsContainer = document.getElementById('selections-container');
const chatContainer = document.getElementById('chat-container');

// Hinzufügen eines Event-Listeners zum Button
selectionStartButton2.addEventListener('click', () => {
    // Verstecken der Selection-Section
    selectionsContainer.style.display = 'none';

    // Anzeigen der Chat-Section
    chatContainer.style.display = 'block';
});