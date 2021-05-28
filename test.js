// this file is only for development/testing

// cd nvsx-helo
// run this with "node test": 
// node test --format=txt
// node test -v
// node test --version
// node test --format=json
// node test --format=text

// node -e "const nvsxHelo = require(__dirname + \"/index.js\");;nvsxHelo.print();"
// node -e "const nvsxHelo = require(__dirname + \"/index.js\");;nvsxHelo.print({\"format\": \"txt\"});"

const nvsxHelo = require(__dirname + "/index.js");
nvsxHelo.print();

console.log("----------- debug ---------")
nvsxHelo.getVersion();
nvsxHelo.getOutputFormat();
// nvsxHelo.setOutputFormat('json');
// nvsxHelo.getOutputFormat();
// nvsxHelo.setOutputFormat('txt');
// nvsxHelo.getOutputFormat();
// nvsxHelo.print({"format": "json"});
console.log("----------- debug ---------")

/*
    npm docu: https://docs.npmjs.com/getting-started/what-is-npm

	develop:
    # npm adduser
    npm whoami
    npm login

    npm config ls
	npm config ls -l

    npm version patch (1.0.0 -> 1.0.1)
    npm publish 
*/ 
