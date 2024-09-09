// Path: scripts/sidebar.js

// Importieren der benötigten Funktionen
import {swapClassesByClass, toggleVisibilityByClass} from './functions.js';

// Access the necessary elements
const toggleElements = document.querySelectorAll('.sidebar-toggle');

// Add event listener to all elements with the class 'sidebar-stack'
toggleElements.forEach(button => {

    button.addEventListener('click', () => {

        // Toggle sidebar class
        const sidebar = document.querySelector('.sidebar');
        const main = document.querySelector('.main-area');

        if (sidebar) {
            sidebar.classList.toggle('schmal');
            main.classList.toggle('breit');
            // Debugging: Log the new class list of the sidebar
            console.log('Sidebar class list after toggle:', sidebar.classList);
        } else {
            // Debugging: Log an error if the sidebar element is not found
            console.error('Sidebar element not found');
        }


        // Toggle visibility of span elements
        toggleVisibilityByClass('sb-max');
        toggleVisibilityByClass('sb-mini');

        // Swap classes 'rect-input-button' and 'square-input-button' for all elements with the class 'input-button'
        swapClassesByClass('input-button', 'rect-input-button', 'square-input-button');

        // Debugging: Log the action of toggling visibility
        console.log('Sidebar was clicked');
    });
});

const loginButton = document.querySelector('#sidebar-login');
loginButton.addEventListener('click', () => {
    console.log('Login button clicked');
    window.location.href = '/login'; // Pfad zur Login-Seite
});

const registerButton = document.querySelector('#sidebar-register');
registerButton.addEventListener('click', () => {
    console.log('Register button clicked');
    window.location.href = '/register'; // Pfad zur Register-Seite
});

const infoButton = document.querySelector('#sidebar-help');
infoButton.addEventListener('click', () => {
    console.log('Info button clicked');
    window.location.href = '/info'; // Pfad zur Info-Seite
});