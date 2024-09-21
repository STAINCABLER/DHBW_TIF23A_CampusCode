# Anwendungsprojekt TIF23A Gruppe C

Webseite Application-Test:
~~[CampusCode](https://cc.thulium-labs.de)~~

Lizenz der Software:
[Licence.md](/licence.md)

## Gruppenmitglieder
- Tobias Maimone
- Maria Happ
- Quentin Risy
- Brandon Evans
- Maximilian Ritter

[Management](/documentation/management.md)


## Grobes Konzept
Die App erhält als Input eine Aufgabe oder allgemeinen Text zu einem Thema als Roh-Text (eventuell ein Bild) und generiert je nach Auswahl eine Zusammenfassung zu dem Thema oder (weitere) Aufgaben zu dem Thema.

## Ziele
- Relevante aufgaben zum vom Benutzer gegebenen Themen generieren
   -> generiert Beispielaufgaben (mit Musterlösung und Erklärung?) basierend auf den gegebenen Aufgaben/Thema/Bild (optional) vom Benutzer.
  
- Benutzer Output Anpassung:
   -> Dem Benutzer die Möglichkeit geben, auf verschiedene "Output"-Möglichkeiten umzuschalten, wie z.B.:
     - Zusammenfassung des Input, oder relevante Aufgaben zum Input generieren 
     - Bei "weitere Aufgaben": Schwierigkeit anpassen, also einfachere oder schwierigere Aufgaben als die gegebenen oder welche auf einem ungefähr gleichen Schwierigkeitsgrad
     - Allgemein: die Zusatzmöglichkeit bieten, dass der Output auch Folgendes wiedergibt
        -> Websites, die das relevante Thema behandeln oder enthalten
        -> Quellen des gegebenen Outputs angeben 

### Optionale Features
- Bilderkennung
  -> Dem Nutzer erlauben, seine Aufschriebe oder Notizen, die Aufgaben oder das relevante thema enthalten, hochzuladen, und dazu relevante Aufgaben zu generieren.
-  Jeweils Musterlösung und Erklärung zu generierten aufgaben darstellen und verstecken, welches der user aufdecken kann.
-	Accountverwaltung
-	Erstellte „Threads“ automatisch fachspeziefisch kategorisieren
-	Readme Tutorial?

## Eingränzung/Überarbeitung des Produkts
Wir haben eine Desktop Lernplattform, um den Einstieg in das duale Studium Informatik zu erleichtern. Den Fokus legen wir auf das Programmieren und beschränken uns auf die drei Programmiersprachen Python, Java und Javascript.
Aufbau der Lernplattform:
- Startseite mit Wahl der Programmiersprach
- Wahl der Programmiererfahrung
- Anfänger:
  - simplen Code der sich mehr auf grundlegende Funktionen bezieht
  - Viele Kommentare, erklären Grundlangen vom Programmeiren
- Fortgeschritten
  - Code beinhaltet mehr funktionen
  - Weniger Kommentare zu dem Basics
- Experte
  - Komplexen code
  - keine Kommentare zu den Basics
  - Fortgeschrittene Funktionen
  
- Weiterleitung auf die Hauptlernumgebung (chat)

- Wenn Aufgaben generiert wurden, kann man diese direkt in einer Lernumgebung testen
  Man bekommt Verbesserungsvorschläge und weitere Aufgaben gestellt

- Bei Erklärungen von Code kann man wie bei den Aufgaben in einer Lernumgebung selbst Code schreiben, dieser von der KI bewertet wird
  
  
### Genutze Technologien:
-	Figma / Excalidraw
-	HTML / CSS / Vite
-	JS / NodeJS
-	GPT-4o evtl. andere
-	...

## Weitere Links
- [Link Overview](/documentation/link-overview.md)
