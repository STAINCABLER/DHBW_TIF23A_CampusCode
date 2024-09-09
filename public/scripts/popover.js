// Funktion zum Anzeigen des Popovers
export function showPopover() {
    document.getElementById('pop').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Funktion zum Verbergen des Popovers
export function hidePopover() {
    document.getElementById('pop').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}