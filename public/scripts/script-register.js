// Überprüfen der Login Daten beim Absenden des Formulars
document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.querySelector('#submit');
    var passwordInput = document.querySelector('#password2');
    var isSubmitting = false; // Variable zum Verfolgen des Anfragezustands

    function validateAndSubmitForm() {

        function validateEmail(username) {
            // Regulärer Ausdruck, der überprüft, ob der Text vor dem "@" vorhanden ist und mit "@dhbw-loerrach.de" endet
            const regex = /^[^\s@]+@dhbw-loerrach\.de$/;

            // Überprüfen, ob der Benutzername dem regulären Ausdruck entspricht
            return regex.test(username);
        }

        function validateForm() {
            var username = document.querySelector('#username').value;
            var password1 = document.querySelector('#password1').value;
            var password2 = document.querySelector('#password2').value;

            // Überprüfe, ob Benutzername und Passwort eingegeben wurden
            if (username.trim() === '') {
                alert('Bitte geben Sie Ihre DHBW E-Mail ein.');
                return false;
            }

            if (password1.trim() === '') {
                alert('Bitte geben Sie Ihr Passwort ein.');
                return false;
            }

            if (password2.trim() === '') {
                alert('Bitte wiederholen Sie Ihr Passwort.');
                return false;
            }

            isSubmitting = true;
            if (validateEmail(username)) {
                console.log('Die E-Mail-Adresse ist gültig.');

                if (password1.trim() === password2.trim()) {

                    console.log('Registrierung erfolgreich!');

                    // Leite den Benutzer auf die Hauptseite weiter
                    console.log("Aktuelle Domain: " + window.location.hostname);
                    console.log("Aktueller Port: " + window.location.port);

                    if (window.location.port !== "80" && window.location.port !== "443") {
                        window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/main";

                    } else {
                        if (window.location.port === "443") {
                            window.location.href = "https://" + window.location.hostname + "/main";

                        } else {
                            window.location.href = "http://" + window.location.hostname + "/main";

                        }
                    }
                } else {
                    alert('Das Passwort stimmt nicht überein!');
                    return false;
                }

            } else {
                alert('Die E-Mail-Adresse ist ungültig!');
                return false;
            }
            isSubmitting = false;
        }

        validateForm(); // Aufruf der Funktion zur Formularvalidierung
    };

    // Event-Listener für das 'click'-Event des Submit-Buttons hinzufügen
    submitButton.addEventListener('click', function (event) {
        if (isSubmitting) {
            return;
        }
        validateAndSubmitForm();
    });

    // Event-Listener für das 'keydown'-Event des Passwort-Feldes hinzufügen
    passwordInput.addEventListener('keydown', function (event) {
        // Überprüfen, ob die Enter-Taste gedrückt wurde
        if (event.key === 'Enter') {
            if (isSubmitting) {
                return;
            }
            validateAndSubmitForm();
        }
    });
});
