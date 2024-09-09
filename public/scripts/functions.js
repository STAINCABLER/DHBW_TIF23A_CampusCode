// Path: scripts/functions.js

// Funktion zum Ein- und Ausblenden eines Elements anhand seiner ID
export function toggleVisibilityByElementID(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}

// Funktion zum Ein- und Ausblenden von Elementen anhand ihrer Klasse
export function toggleVisibilityByClass(className) {
    const elements = document.querySelectorAll(`.${className}`);

    // Debugging: Log the elements that will have their visibility toggled
    console.log(`Toggling visibility for elements with class "${className}":`, elements);

    elements.forEach((element, index) => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
            // Debugging: Log the visibility change
            console.log(`Element ${index} with class "${className}" is now visible:`, element);
        } else {
            element.classList.add('hidden');
            // Debugging: Log the visibility change
            console.log(`Element ${index} with class "${className}" is now hidden:`, element);
        }
    });
}

// Funktion zum Hinzufügen oder Entfernen einer anderen Klasse zu einem Element anhand einer anderen Klasse
export function toggleClassByClass(className, newClass) {
    const elements = document.querySelectorAll(`.${className}`);

    // Debugging: Log the elements that will have a class added
    console.log(`Adding class "${newClass}" to elements with class "${className}":`, elements);

    elements.forEach((element, index) => {

        if (element.classList.contains(className)) {
            if (element.classList.contains(newClass)) {
                // Debugging: Log an error if the element already has the new class
                element.classList.add(newClass);

                // Debugging: Log the class addition
                console.log(`Added class "${newClass}" to element ${index} with class "${className}":`, element);
            } else {
                // Debugging: Log an error if the element is not found
                console.error(`Element with class "${className}" not found`);
            }
        } else {
            // Debugging: Log an error if the element is not found
            console.error(`Element with class "${className}" not found`);
        }
    });
}

// Funktion zum Vertauschen zweier Klassen. Sollte einer dieser Klassen vorhanden sein, wird die andere hinzugefügt und die vorhandene entfernt
export function swapClassesByClass(className, class1, class2) {
    const elements = document.querySelectorAll(`.${className}`);

    // Debugging: Log the elements that will have their classes swapped
    console.log(`Swapping classes "${class1}" and "${class2}" for elements with class "${className}":`, elements);

    elements.forEach((element, index) => {
        if (element.classList.contains(class1)) {
            element.classList.remove(class1);
            element.classList.add(class2);
            // Debugging: Log the class swap
            console.log(`Swapped class "${class1}" for "${class2}" for element ${index} with class "${className}":`, element);
        } else if (element.classList.contains(class2)) {
            element.classList.remove(class2);
            element.classList.add(class1);
            // Debugging: Log the class swap
            console.log(`Swapped class "${class2}" for "${class1}" for element ${index} with class "${className}":`, element);
        } else {
            // Debugging: Log an error if neither class is found
            console.error(`Element with class "${className}" not found`);
        }
    });
}