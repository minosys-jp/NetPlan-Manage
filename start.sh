#!/bin/bash
if [ ! -d "./public" ]; then
	echo "public directory not found"
	exit
fi
if [ ! -f "./public/index.html" ]; then
	echo "index.html not found"
	exit
fi
if [ ! -f "./server.js" ]; then
	echo "server.js not found"
	exit
fi
sudo node server.js
