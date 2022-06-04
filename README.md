# nvsx-helo

npm package: https://www.npmjs.com/package/nvsx-helo

* This is a project to inspect the local npm and node ecosystem. 
* It prints out some info about the currently used npm and node installations. 

## Quickstart
```sh
    $ npm install -g nvsx-helo
    $ nvsx-helo
```

## Heads-Up
<i>nvsx-helo</i> is a module since version v3. You must import it in your code with 
```import nvsxHelo from 'nvsx-helo'```. 
If you want to use the old "require" syntax, then use the older v2 version like so:
```
npm i -D nvsx-helo@^2
```

## Installation
* global install: 
```sh
    $ npm install -g nvsx-helo
```
* local install: 
```
    $ npm install nvsx-helo
```
* local install and save as dev-dependency: 
```
    $ npm i -D nvsx-helo
```

## Dependencies
* The "colors" module and 'command-line-args' module are getting installed. These module load further modules so we end up with: 
array-back, colors, command-line-args, find-replace, lodash.camelcase, typical

## Usage
* if globally installed, then just run 
```
    $ nvsx-helo
    $ # or:
    $  nvsx-helo --format=txt
````

* if installed locally: 
```
    $ node node_modules/nvsx-helo/nvsx-helo
    $ # or better:
    $ npx nvsx-helo
```
* use it in your own script like this:
```
    // old version2: var nvsxHelo = require('nvsx-helo');  
    import nvsxHelo from 'nvsx-helo';
    nvsxHelo.print();
    nvsxHelo.setFormat('txt');
    nvsxHelo.print();
```
* You can also run the function directly from the command line like this:
```
    $ node -e "var nvsxHelo=require('nvsx-helo');nvsxHelo.print();"
```

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
* v3.0.7 (2022-06-04): add nodejs homepage to infos
* v3.0.6 (2022-05-23): change to module, use import instead of require
* v2.0.4 (2021-05-19): added version parameter (-v, --version)
* v2.0.3 (2021-03-24): bugfix README
* v2.0.2 (2021-03-24): bugfix README
* v2.0.1 (2021-03-24): bugfix README
* v2.0.0 (2021-03-24): default output format changed to json, json content enhanced
* v1.0.9 (2018-07-29): added option for output format as json
* v1.0.8 (2018-04-13): also print out version info
* v1.0.7 (2017-11-01): bugfix (updated README)
* v1.0.6 (2017-11-01): bugfix (broken command)
* v1.0.5 (2017-11-01): added "nvx-helo" command to run from the command line
