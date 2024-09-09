// This Page is property of Tobias Maimone (c)

// Funktion, die beim Laden der Seite ausgeführt wird
// Hier wird das Verhalten der Textfeld-Labels für den Benutzernamen und das Passwort definiert
document.addEventListener('DOMContentLoaded', function () {
    var usernameInput = document.getElementById('username');
    var passwordInput1 = document.getElementById('password1');
    var passwordInput2 = document.getElementById('password2');

    usernameInput.addEventListener('input', function () {
        var label = this.nextElementSibling; // Das nächste Label-Element (Platzhalter)

        if (this.value.trim() !== '') {
            label.style.display = 'none'; // Verstecke das Label, wenn Text im Eingabefeld vorhanden ist
        } else {
            label.style.display = 'inline-block'; // Zeige das Label wieder an, wenn das Eingabefeld leer ist
        }
    });

    passwordInput1.addEventListener('input', function () {
        var label = this.nextElementSibling; // Das nächste Label-Element (Platzhalter)

        if (this.value.trim() !== '') {
            label.style.display = 'none'; // Verstecke das Label, wenn Text im Eingabefeld vorhanden ist
        } else {
            label.style.display = 'inline-block'; // Zeige das Label wieder an, wenn das Eingabefeld leer ist
        }
    });

    passwordInput2.addEventListener('input', function () {
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

    if (passwordInput1.value.trim() !== '') {
        passwordInput1.nextElementSibling.style.display = 'none'; // Verstecke das Label, wenn Text im Textfeld vorhanden ist
    }

    if (passwordInput2.value.trim() !== '') {
        passwordInput2.nextElementSibling.style.display = 'none'; // Verstecke das Label, wenn Text im Textfeld vorhanden ist
    }
});