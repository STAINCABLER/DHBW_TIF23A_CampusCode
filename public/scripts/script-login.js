document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.querySelector('#submit');
    var passwordInput = document.querySelector('#password');
    var isSubmitting = false; // Variable zum Verfolgen des Anfragezustands

    function validateAndSubmitForm() {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;
        var rememberMe = document.querySelector('#remember-me').checked;

        // Überprüfe, ob Benutzername und Passwort eingegeben wurden
        if (username.trim() === '') {
            alert('Bitte geben Sie Ihren Benutzernamen ein.');
            return false;
        }

        if (password.trim() === '') {
            alert('Bitte geben Sie Ihr Passwort ein.');
            return false;
        }

        // Senden Sie eine HTTP-Anfrage an den Server
        isSubmitting = true;
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, rememberMe})
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
                if (data.success) {
                    console.log('Login erfolgreich!');

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
                    alert('Falscher Nutzername oder falsches Passwort!');
                }
                isSubmitting = false;
            })
            .catch(error => console.error('Fehler beim Überprüfen des Passworts:', error));
    }

    // Event-Listener für das 'click'-Event des Submit-Buttons hinzufügen
    submitButton.addEventListener('click', function (event) {
        if (isSubmitting) {
            return;
        }
        event.preventDefault();
        validateAndSubmitForm();
    });

    // Event-Listener für das 'keydown'-Event des Passwort-Feldes hinzufügen
    passwordInput.addEventListener('keydown', function (event) {
        // Überprüfen, ob die Enter-Taste gedrückt wurde
        if (event.key === 'Enter') {
            if (isSubmitting) {
                return;
            }
            event.preventDefault();
            validateAndSubmitForm();
        }
    });
});
