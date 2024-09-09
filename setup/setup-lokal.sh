#!/bin/bash

# Author: Tobias Maimone

# This script is used to setup all dependencies on a client
# (Tested Windows WSL and Linux)

# Function to check if the script is run as root
check_root() {
  if [ "$(id -u)" -ne 0 ]; then
    echo "This script needs to install some packages with administrative privileges." 1>&2
    USE_SUDO='sudo'
  else
    USE_SUDO=''
  fi
}

# Function to detect the operating system
detect_os() {
  OS="unknown"
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if command -v apt-get &> /dev/null; then
      OS="linux-debian"
    elif command -v yum &> /dev/null; then
      OS="linux-redhat"
    fi
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
  elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    OS="windows"
  elif [[ "$OS" == "windowsnt" ]]; then
    OS="windows-native"
  fi
}

# Function to check if running in WSL
check_wsl() {
  if grep -qEi "(Microsoft|WSL)" /proc/version &> /dev/null; then
    echo "WSL detected."
  else
    echo "This script must be run in a WSL environment." 1>&2
    exit 1
  fi
}

# Function to install dependencies on Ubuntu/Debian
install_debian_dependencies() {
  $USE_SUDO apt-get update
  $USE_SUDO apt-get install -y snapd git
  $USE_SUDO snap install node --classic
  npm install
}

# Function to install dependencies on macOS
install_macos_dependencies() {
  brew update
  brew install snapd git
  $USE_SUDO snap install node --classic
  npm install
}

# Function to install dependencies on Windows (WSL or Git Bash)
install_windows_dependencies() {
  check_wsl
  $USE_SUDO apt-get update
  $USE_SUDO apt-get install -y snapd git
  $USE_SUDO snap install node --classic
  npm install
}

# Function to install dependencies on native Windows
install_windows_native_dependencies() {
  echo "Native Windows detected. Please install the following manually:"
  echo "1. Git: https://git-scm.com/download/win"
  echo "2. Node.js: https://nodejs.org/en/download/"
  echo "Then run the following commands in your command prompt or PowerShell:"
  echo "npm install"
}

# Main script
check_root
detect_os

case "$OS" in
  "linux-debian")
    install_debian_dependencies
    ;;
  "macos")
    install_macos_dependencies
    ;;
  "windows")
    install_windows_dependencies
    ;;
  "windows-native")
    install_windows_native_dependencies
    ;;
  *)
    echo "Unsupported operating system: $OSTYPE"
    exit 1
    ;;
esac

echo "Setup completed successfully"