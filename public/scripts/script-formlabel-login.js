// This Page is property of Tobias Maimone (c)

// Funktion, die beim Laden der Seite ausgeführt wird
// Hier wird das Verhalten der Textfeld-Labels für den Benutzernamen und das Passwort definiert
document.addEventListener('DOMContentLoaded', function () {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    usernameInput.addEventListener('input', function () {
        var label = this.nextElementSibling; // Das nächste Label-Element (Platzhalter)

        if (this.value.trim() !== '') {
            label.style.display = 'none'; // Verstecke das Label, wenn Text im Eingabefeld vorhanden ist
        } else {
            label.style.display = 'inline-block'; // Zeige das Label wieder an, wenn das Eingabefeld leer ist
        }
    });

    passwordInput.addEventListener('input', function () {
        var label = this.nextElementSibling; // Das nächste Label-Element (Platzhalter)

        if (this.value.trim() !== '') {
            label.style.display = 'none'; // Verstecke das Label, wenn Text im Eingabefeld vorhanden ist
        } else {
            label.style.display = 'inline-block'; // Zeige das Label wieder an, wenn das Eingabefeld leer ist
        }
    });


    // Überprüfe beim Laden der Seite den Anfangszustand der Textfelder
    if (usernameInput.value.trim() !== '') {
        usernameInput.nextElementSibling.style.display = 'none'; // Verstecke das Label, wenn Text im Textfeld vorhanden ist
    }

    if (passwordInput.value.trim() !== '') {
        passwordInput.nextElementSibling.style.display = 'none'; // Verstecke das Label, wenn Text im Textfeld vorhanden ist
    }
});