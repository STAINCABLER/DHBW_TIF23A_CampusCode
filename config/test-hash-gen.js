import bcrypt from 'bcryptjs';


// Passwort, das gehasht werden soll
const password = 'maximiliantest1234';

// Testen des Passwort-Hashing-Algorithmus
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log("Das Passwort ist:   " + password);
console.log("Das gehashte Passwort ist:   " + hashedPassword);