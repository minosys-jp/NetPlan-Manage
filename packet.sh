#!/bin/bash

if [ ! -d "packet" ]; then
	mkdir packet
fi
if [ ! -d "packet/public" ]; then
	mkdir "packet/public"
fi
cp -rfp dist/* packet/public/
cp -fp server.js packet
cp -fp start.sh packet
