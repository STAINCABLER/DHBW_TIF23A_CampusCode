// Auswahl des Buttons mit der ID 'landing-start'
const landingStartButton = document.getElementById('landing-start');

// Auswahl der Landingpage- und Selection-Container
const landingContainer = document.getElementById('landing-container');
const selectionsContainer = document.getElementById('selections-container');

// Hinzufügen eines Event-Listeners zum Button
landingStartButton.addEventListener('click', () => {
    // Verstecken der Landingpage-Section
    landingContainer.style.display = 'none';

    // Anzeigen der Selection-Section
    selectionsContainer.style.display = 'flex';
});