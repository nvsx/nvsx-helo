# nvsx-helo

npm package: https://www.npmjs.com/package/nvsx-helo

* This is a simple test and practice project. 
* It just prints out some info about the currently used npm installation. 

## Quickstart:
```sh
    $ npm install -g nvsx-helo
    $ nvsx-helo
```

## Installation
* global install: 
```sh
    $ npm install -g nvsx-helo
```
* local install: ```$ npm install nvsx-helo```
* local install and save to current project: ```$ npm i -S nvsx-helo```

## Dependencies
* The "colors" module and the "command-line-args" module get automatically installed.

## Usage
* if globally installed just run "nvsx-helo" or "$  nvsx-helo --format=json"
* if installed locally: "node node_modules/nvsx-helo/nvsx-helo"
* use it in your own script like this:  
    var nvsxHelo = require('nvsx-helo');  
    nvsxHelo.print();
    nvsxHelo.setFormat('json');
    nvsxHelo.print();
* You can also run the function directly from the command line like this:  
    node -e "var nvsxHelo=require('nvsx-helo');nvsxHelo.print();"

## Purpose
* Only purpose is to print out some infos about npm. Either in colored text or json format. 

## API Reference
* print(): There is one default function: nvsxHelo.print();
  * print can be called with a config object, e.g. nvsxHelo.print({"format": "json"})
* getOutputFormat()
* setOutputFormat(txt|json)
* command line arguments are applied, e.g. nvsx-helo --format=json

## Sourcecode
https://github.com/nvsx/nvsx-helo

## Changes
* v2.0.0 (???-??-??): default output format changed to json
* v1.0.9 (2018-07-29): added option for output format as json
* v1.0.8 (2018-04-13): also print out version info
* v1.0.7 (2017-11-01): bugfix (updated README)
* v1.0.6 (2017-11-01): bugfix (broken command)
* v1.0.5 (2017-11-01): added "nvx-helo" command to run from the command line

// EOF
