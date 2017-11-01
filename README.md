## nvsx-helo

* A simple test module. This is a test project. It tries to find out about the npm installation on the local machine and prints out some text.

## Installation

* global install: npm install -g nvsx-helo

* local install: npm install nvsx-helo

* local install and save to current project: npm i -S nvsx-helo

## Dependencies

* The "color" module gets automatically installed.

## Usage

* if globally installed just run "nvsx-helo"

* "npm nvsx-helo"

* use it in your own script like this:  
    var nvsxHelo = require('nvsx-helo');  
    nvsxHelo.print();

* You can also run the function directly from the command line like this:  
    node -e "var nvsxHelo =
    require('nvsx-helo');nvsxHelo.print();"

## Purpose

* Only purpose is to print out some (colored) text with infos about npm.

## API Reference

* There is only one function: nvsxHelo.print();

## Changes

* v1.0.5 (2017-11-01): added "nvx-helo" command to run from the command line
