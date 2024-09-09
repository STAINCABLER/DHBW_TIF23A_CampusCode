import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import {fileURLToPath} from 'url';
import showdown from "showdown";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Laden der .env-Datei aus dem application-Ordner
dotenv.config({path: path.join(__dirname, '.env')});

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables.');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Express-Webserver initialisieren
const app = express();

// Verwenden Sie das cookie-parser-Middleware
app.use(cookieParser());

// Überprüfen Sie bei jedem Seitenaufruf der Login-Page das Session-Token
app.use((req, res, next) => {
    const loginPath = '/login';
    const mainPageRedirect = '/main';
    const token = req.cookies.sessionToken;

    if (req.path === loginPath) {
        console.log(`Received request for ${req.path} with token: ${token}`);

        if (token && isValidToken(token, process.env.SECRET_KEY)) {
            console.log(`Token for ${loginPath} is valid. Redirecting to main page.`);
            return res.redirect(mainPageRedirect);
        } else {
            console.log(`Token for ${loginPath} is not valid or not present. Proceeding to next middleware.`);
        }
    }
    next();
});


// Logging Middleware hinzufügen
app.use(morgan('dev'));


// Source Array
const source = [
    'public',       // Production
    'testing'       // Development
];


// Array von Benutzerobjekten
const users = [
    {
        username: 'maimonet@dhbw-loerrach.de',
        passwordHash: '$2a$10$73k9gTKTo/U28gGhYUo9bOrSrI3C4NAJtd7QfiDr98LmBCDmRrYci' // Passwort: tobiastest1234
    },
    {
        username: 'happm@dhbw-loerrach.de',
        passwordHash: '$2a$10$9BEPdpGn949j2R1RNKG47ejQ40EcVo1vtYcqInWO36gLOUrUlrila' // Passwort: mariatest1234
    },
    {
        username: 'risyq@dhbw-loerrach.de',
        passwordHash: '$2a$10$MZC06G7Ag1MdYOpaY.6vVOLS369GTnVFrYz2AoIBh2Iw6h7DLC.nC' // Passwort: quentintest1234
    },
    {
        username: 'evansb@dhbw-loerrach.de',
        passwordHash: '$2a$10$8ZwsmWbSAnGQWKIkYz7jLevipn2PJCdT3v7/Ty/IMugbEfJAnjyay' // Passwort: brandontest1234
    },
    {
        username: 'ritterm@dhbw-loerrach.de',
        passwordHash: '$2a$10$XG6vsA1OnFzEY4pagYPQbeHsxYf4NF5OAxTpHDXjk1uEa6Eo8k.Ay' // Passwort: maximiliantest1234
    },

];


// Erstellen Sie ein Session-Token
function createSessionToken(username, secretKey) {
    console.log(`Creating session token for username: ${username}`);
    // Erstellen Sie ein neues Token mit dem Benutzernamen und dem geheimen Schlüssel
    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
    console.log(`Session token for ${username} created: ${token}`);
    return token;
}

// Überprüfen Sie, ob ein Token gültig ist
function isValidToken(token, secretKey) {
    console.log(`Validating token: ${token}`);
    try {
        // Überprüfen Sie das Token mit dem geheimen Schlüssel
        jwt.verify(token, secretKey);
        console.log(`Token is valid.`);
        return true;
    } catch (error) {
        // Wenn die Überprüfung fehlschlägt, ist das Token ungültig
        console.log(`Token validation failed: ${error}`);
        return false;
    }
}


// Select WebApp Source Path
const sourcePath = 1;
if (sourcePath < 1 || sourcePath > source.length) {
    throw new Error('Invalid sourcePath value');
}

// Korrekter Pfad zum statischen Verzeichnis
const staticPath = path.join(__dirname, source[(sourcePath - 1)]);
console.log(`Statischer Pfad: ${staticPath}`);

// Frontend-Code wird „statisch“ ausgeliefert
app.use(express.static(staticPath));
app.use(express.static(path.join(staticPath, 'pages')));


// Definieren Sie Routen für Ihre HTML-Seiten
app.get('/login', function (req, res) {
    res.sendFile(path.join(staticPath, 'pages', 'login.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(staticPath, 'pages', 'register.html'));
});

app.get('/info', function (req, res) {
    res.sendFile(path.join(staticPath, 'pages', 'info.html'));
});

app.get('/main', function (req, res) {
    res.sendFile(path.join(staticPath, 'pages', 'main.html'));
});


// Showdown Markdown-Konverter
let converter = new showdown.Converter();
//console.log("Showdown-Konverter erstellt:", converter);

function mdToHTML(markdownText) {
    // Konvertieren des Markdown-Textes in HTML
    //console.log("Konvertierter HTML-Text:", markdownText);
    let htmlText = converter.makeHtml(markdownText);

    // Überschreiben des innerHTML des Ziel-Elements
    //console.log("Konvertierter HTML-Text:", htmlText);
    return htmlText;
}


// API-Endpunkt im Backend des Express-Webservers unter /api/login für die Anmeldung
app.use(express.json());

app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
});

app.post('/api/login', function (req, res) {
    const {username, password, rememberMe} = req.body;

    console.log(`Received login request for username: ${username}`);

    const user = users.find(user => user.username === username);
    if (user) {
        console.log(`User ${username} found in the database.`);
        if (bcrypt.compareSync(password, user.passwordHash)) {
            console.log(`Password for ${username} matched.`);
            if (rememberMe) {
                const token = createSessionToken(username, process.env.SECRET_KEY);
                console.log(`Session token for ${username} created.`);
                res.cookie('sessionToken', token, {maxAge: 900000, httpOnly: true});
            }
            res.json({success: true});
        } else {
            console.log(`Password for ${username} did not match.`);
            res.json({success: false});
        }
    } else {
        console.log(`User ${username} not found in the database.`);
        res.json({success: false});
    }
});


// Definition der System-Prompts für die Presets
const limitations = 'Deine Beschränkungen: ' +
    'Regel 1, antworte auf Englisch. ' +
    'Regel 2, Gib deinen Response als NUR den Inhalt des bodys, einer HTML Webseite, mit tailwind css formatierung. ' +
    'Regel 3, der Inhalt des response soll ohne <pre><code></code></pre> wrapper ausgegeben werden, das sowohl code als auch text kopierbar sind. ' +
    'Regel 4, deine Antwort soll die Textfarbe #D6D6D6 haben, der Text des Inhalts deiner Antwort soll links orientiert sein und die Antwort soll nur 80% der Breite einnehmen. ' +
    'Regel 5, der Hintergrund deiner Antwort soll die Hintergrundfarbe #222330 haben. ' +
    'Regel 6, <code> Blöcke sollen einen Schwarzen Hintergrund haben, und Code soll in der jeweiligen Programmiersprache, logisch, farbig gehighlighted sein. ' +
    'Regel 7, bleibe nur Programmier relevanten Themen und Schweife nicht ab, selbst wenn du darum gebietet wirst!' +
    'Regel 8, deine Antwort soll in einem angemessenen Tonfall sein, und nicht beleidigend oder abwertend sein.' +
    'Regel 9, wenn du code beispiele gibst müssen diese zwingend in einem <code> block sein, und die Syntax muss korrekt sein. ' +
    'Regel 10, füge NIEMALS fremde ressourcen wie JavaScript, CSS oder Bilder hinzu. ';

const presets_pl = {
    option1: 'Deine Aufgabe: Schreibe für die Programmiersprache Python, ',
    option2: 'Deine Aufgabe: Schreibe für die Programmiersprache Java, ',
    option3: 'Deine Aufgabe: Schreibe für die Programmiersprache JavaScript, ',
};

const presets_kl = {
    option1: 'mit einer Ausführlichen Aufstellung der Punkte mit Beispielen und Erklärungen, ',
    option2: 'mit einer eher allgemeinen Aufstellung der Punkte mit Beispielen, ',
    option3: 'mit einer kurzgefassten Aufstellung der konkretesten Punkte, ',
};

const presets_sl = {
    option1: 'als Erklärung zu dem genannten Thema in Englisch:',
    option2: 'als Aufgaben zu dem genannten Thema in Englisch:',
};


// API-Endpunkt im Backend des Express-Webservers unter /api/chat
// (Anfrage an die Chat-API von OpenAI)
app.get('/api/chat', async (req, res) => {
    const { option_pl, option_kl, option_ct, topic } = req.query;
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `${limitations} ${presets_pl[option_pl]} ${presets_kl[option_kl]} ${presets_sl[option_ct]}`
                },
                {
                    role: 'user',
                    content: `${topic}`,
                },
            ],
            model: 'gpt-4o',
        });

        res.json({message: mdToHTML(chatCompletion.choices[0].message.content)});
    } catch (error) {
        console.error('Fehler bei der Kommunikation mit der OpenAI API:', error);
        res.status(500).json({error: 'Fehler bei der Kommunikation mit der OpenAI API'});
    }
});


// Express-Webserver unter Port 3000 starten
const PORT = process.env.PORT || 3000;

const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server läuft auf: http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        if (error.code === 'EADDRINUSE') {
            console.error(`Fehler: Port ${PORT} ist bereits belegt. Bitte einen anderen Port verwenden.`);
        } else {
            console.error('Fehler beim Starten des Servers:', error);
        }
        process.exit(1);
    }
};

startServer();