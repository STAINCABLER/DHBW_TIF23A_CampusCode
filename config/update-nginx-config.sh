#!/bin/bash

# Pfade definieren
SCRIPT_DIR=$(dirname "$(realpath "$0")")
CONFIG_SOURCE_DIR="$SCRIPT_DIR/nginx"
CONFIG_DEST_DIR="/etc/nginx/sites-available"
ENABLED_DIR="/etc/nginx/sites-enabled"

# Durch das Quellverzeichnis iterieren und jede .config-Datei verarbeiten
# shellcheck disable=SC2231
for CONFIG_FILE in $CONFIG_SOURCE_DIR/*.config; do
    # Überprüfen, ob die Quelldatei existiert
    if [ -f "$CONFIG_FILE" ]; then
        # Dateinamen ohne .config erhalten
        FILE_NAME=$(basename "$CONFIG_FILE" .config)

        # Überprüfen, ob die Zielkonfigurationsdatei bereits existiert
        if [ -f "$CONFIG_DEST_DIR/$FILE_NAME" ]; then
            # Datei im Zielverzeichnis löschen, bevor sie ersetzt wird
            sudo rm -f "$CONFIG_DEST_DIR/$FILE_NAME"
            echo "Vorhandene Datei $FILE_NAME im Zielverzeichnis wurde gelöscht."
        fi

        # Inhalt kopieren
        sudo cp "$CONFIG_FILE" "$CONFIG_DEST_DIR/$FILE_NAME"
        echo "$FILE_NAME.config wurde erfolgreich nach $CONFIG_DEST_DIR/$FILE_NAME kopiert."

        # Überprüfen, ob der Link in 'enabled' bereits existiert
        if [ -L "$ENABLED_DIR/$FILE_NAME" ]; then
            # Link im 'enabled'-Verzeichnis löschen, bevor er neu erstellt wird
            sudo rm -f "$ENABLED_DIR/$FILE_NAME"
            echo "Vorhandener Link $FILE_NAME im enabled-Verzeichnis wurde gelöscht."
        fi

        # Link in 'enabled' erstellen
        sudo ln -s "$CONFIG_DEST_DIR/$FILE_NAME" "$ENABLED_DIR/$FILE_NAME"
        echo "Symbolischer Link $FILE_NAME wurde erfolgreich im enabled-Verzeichnis erstellt."
    else
        echo "Fehler: $CONFIG_FILE existiert nicht."
        exit 1
    fi
done

# Nginx-Konfiguration testen und neu starten
sudo nginx -t && sudo systemctl restart nginx

echo "Nginx wurde erfolgreich neu gestartet."
