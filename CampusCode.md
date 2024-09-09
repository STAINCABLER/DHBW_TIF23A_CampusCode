# Webanwendung mit OpenAI SDK

Verwendung der [OpenAI](https://openai.com/)-API mit dem
[JavaScript-SDK](https://platform.openai.com/docs/libraries/typescript-javascript-library)
in einer Webanwendung mit einem einfachen [Node.js](https://nodejs.org)-Backend auf
Basis von [Express](https://expressjs.com).

Verwendet werden die [Chat-](https://platform.openai.com/docs/api-reference/chat/create?lang=node.js)

## Verwendung:

1. git-Repository klonen oder Code herunterladen
2. Im Terminal/Powershell ins Projektverzeichnis wechseln
3. `npm install` ausführen
4. Neue Datei `.env` erstellen
5. API-Key von OpenAI in Datei `.env` eintragen: \
   `OPENAI_API_KEY=hier_muss_der_API_key_stehen`
6. Webserver starten: \
   `npm start`
7. Webanwendung im Browser öffnen (`http://localhost:3000`)
