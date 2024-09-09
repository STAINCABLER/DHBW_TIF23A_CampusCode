#!/bin/bash
# DEaktivieren von PM2 process manager für die WebApp
# https://pm2.keymetrics.io/docs/usage/quick-start/
sudo pm2 stop all
sudo pm2 delete all