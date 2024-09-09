#!/bin/bash
# Setup von PM2 process manager für die WebApp
# https://pm2.keymetrics.io/docs/usage/quick-start/
sudo pm2 start "/home/WebstormProjects/TIF23A_AnwProjekt_C/application/server.js" --name "web-app" --watch -f --log "/home/WebstormProjects/TIF23A_AnwProjekt_C/application/logs/pm2.log" --port 8080
sudo pm2 startup
sudo pm2 save