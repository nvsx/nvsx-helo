// only for development/testing:
// cd nvsx-helo
// run this with "node test"

const nvsxHelo = require(__dirname + "/index.js");
// nvsxHelo.getOutputFormat();
// nvsxHelo.setOutputFormat('json');
// nvsxHelo.getOutputFormat();
// nvsxHelo.setOutputFormat('txt');
// nvsxHelo.getOutputFormat();
// nvsxHelo.print({"format": "json"});
nvsxHelo.print();

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
