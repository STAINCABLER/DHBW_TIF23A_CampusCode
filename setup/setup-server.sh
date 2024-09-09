#!/bin/bash

# Author: Tobias Maimone

# This script is used to setup the application on a fresh Linux Server
# It will install all dependencies and setup the application
# It will also setup the website proxy and install a SSL certificate
# (This script is only tested on Ubuntu 20.04 LTS)
# It has to be run as root

# Function to check if the script is run as root
check_root() {
  if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root." 1>&2
    exit 1
  fi
}

# Function to install dependencies on Ubuntu/Debian
install_dependencies() {
  apt update
  apt upgrade -y
  apt install -y snapd git nginx rclone certbot python3-certbot-nginx
  snap install node --classic
  npm install -g pm2
}

# Main script
check_root
install_dependencies

# Install application dependencies
npm install

# Setup website proxy and SSL certificate
../config/update-nginx-config.sh

# Reboot the server to apply all changes
reboot now
