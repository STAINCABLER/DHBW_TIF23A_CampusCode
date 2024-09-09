//
// ─── COOKIES ─────────────────────────────────────────────────────────────────────
//

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { setCookie } from "./cookies.js";
//
// // Usage
// setCookie("username", "John Doe", 7, 'None');
// Purpose: To set a cookie with the name, value, and days to expire
export function setCookie(name, value, days, sameSite = 'Lax') {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    const sameSiteAttr = `; SameSite=${sameSite}`;
    document.cookie = name + "=" + (value || "") + expires + "; path=/" + sameSiteAttr;
}

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { getCookie } from "./cookies.js";
//
// // Usage
// const username = getCookie("username");
// Purpose: To get a cookie by name
export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { eraseCookie } from "./cookies.js";
//
// // Usage
// eraseCookie("username");
// Purpose: To erase a cookie by name
export function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { eraseCookies } from "./cookies.js";
//
// // Usage
// eraseCookies();
// Purpose: To erase all cookies
export function eraseCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) eraseCookie(cookies[i].split("=")[0]);
}

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { cookieExists } from "./cookies.js";
//
// // Usage
// if (cookieExists("username")) {
//     console.log("Cookie exists");
// }
// Purpose: To check if a cookie exists by name
export function cookieExists(name) {
    return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
}

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { getCookieValue } from "./cookies.js";
//
// // Usage
// const username = getCookieValue("username");
// Purpose: To get the value of a cookie by name
export function getCookieValue(name) {
    return getCookie(name);
}

// Path: scripts/cookies.js
// Compare this snippet from scripts/script.js:
// // Imports
// import { setCookieValue } from "./cookies.js";
//
// // Usage
// setCookieValue("username", "John Doe");
// Purpose: To set the value of a cookie by name
export function setCookieValue(name, value) {
    setCookie(name, value);
}

