// Imports
import {cookieExists, setCookie} from "cookies.js";


// Usage

// Check if a "username"-cookie exists
if (cookieExists("username")) {
    console.log("Cookie exists");
}

//Check if a "session"-cookie exists
if (!cookieExists("session")) {
    setCookie("username", "John Doe", 7);
} else {
    console.log("Cookie exists");
}