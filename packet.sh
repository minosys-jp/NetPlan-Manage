#!/bin/bash

if [ ! -d "packet" ]; then
	mkdir packet
fi
cp -rfp public packet
cp -fp server.js packet
cp -fp start.sh packet
