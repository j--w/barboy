#!/bin/bash
sudo apt-get update
sudo apt-get install pigpio redis-server
redis-cli config set appendonly yes
redis-cli config set save ""
npm install
npm install pigpio
