// Temporary redirect to the correct port!!!
// As the main chat is not available at the moment, the user should be redirected to the open-chat page.

console.log("Aktuelle Domain: " + window.location.hostname);
console.log("Aktueller Port: " + window.location.port);

if (window.location.port !== "80" && window.location.port !== "443") {
    window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/";

} else {
    if (window.location.port === "443") {
        window.location.href = "https://" + window.location.hostname + "/";

    } else {
        window.location.href = "http://" + window.location.hostname + "/";

    }
}