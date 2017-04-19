## nvsx-helo

A simple test module. 

This is a test project. It tries to find out about the npm installation on the local machine and prints out some text.

## Installation

npm install nvsx-helo

## Usage 

var nvsxHelo = require('nvsx-helo');  
nvsxHelo.print();

You can also run the function directly from the command line.   
If the module is installed in the local node_modules directory:
node -e "var nvsxHelo = require('nvsx-helo');nvsxHelo.print();"

## Purpose

Only purpose is to print out some (colored) text with infos about npm.

## API Reference

By now there is only one function: nvsxHelo.print();

