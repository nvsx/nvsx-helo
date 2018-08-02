const colors    = require('colors');
const path      = require('path');
const commandLineArgs = require('command-line-args');


const version   = '2.0.0';
let outputFormat = 'json';


module.exports = { 
	getOutputFormat(){
		console.log(outputFormat)
		return outputFormat
	},
	setOutputFormat(myFormat) {
		if(myFormat != null && typeof(myFormat)==='string') {
			outputFormat = myFormat
		}
	},
	print(arg) {
		// child process is not a module, it lives in the standard node.js
		// find more info at http://nodejs.org/api.html#_child_processes
		let execute_command = require('child_process').exec;
		let this_os = /^win/.test(process.platform) ? 'windows' : 'unixoid';
		// DEBUG:
		// this_os='windows';
		let infoObject = {};
		infoObject.nvsxHelo = {};
		infoObject.nvsxHelo.version = version;
		infoObject.npm = {};
		infoObject.npm.path = {};
		infoObject.node = {};
		infoObject.node.version = process.version;
		infoObject.node.versions = process.versions;
		
		// decicde which outputFormat to use:
		if(arg) {
			if(arg.format) {
				outputFormat = arg.format;
			}
		}
		else {
			// READ from command line
			const optionDefinitions = [
				{ name: 'format', type: String },
			]
			const options = commandLineArgs(optionDefinitions)
			let formatRequested = options.format;
			if( formatRequested && typeof(formatRequested) === 'string' ) {
				formatRequested = formatRequested.toLowerCase();
			}
			else {
				formatRequested = '';
			}
			if(formatRequested == 'json' ) { 
				outputFormat = 'json'; 
			}
			else if(formatRequested === 'txt' ||formatRequested === 'text') {
				outputFormat = 'txt';
			}
		}

		execute_command("npm config get prefix", function (error, stdout, stderr) {
			// process("pwd", function (error, stdout, stderr) {
			if (error !== null) {
				console.log('ERROR: ' + error);
				console.log('STDERR: ' + stderr);
			}
			else {
				let globalDir = stdout;
				globalDir = globalDir.replace(/\r\n|\r|\n/g, '');
				infoObject.npm.path.global = globalDir;
				infoObject.npm.path.lib    = path.join(globalDir, "/lib");
				infoObject.npm.path.bin    = path.join(globalDir + "/bin");
				infoObject.npm.path.share  = path.join(globalDir + "/share");

				if(outputFormat === 'json' ) {
					console.log(JSON.stringify(infoObject, null, 2));
				}
				else {
					console.log("---------------------------------------------------------------");
					console.log("about npm on this machine:".blue);
					console.log(" "); // empty line
					console.log("PREFIX of your GLOBAL npm installation: ".green);
					console.log("    " + infoObject.npm.path.global.red);
					console.log(" "); // empty line

					if(this_os === 'windows') {
						console.log("That means, in general the following locations will be used:".green);
						console.log("Use \"" + "npm config ls".red + "\" or \"" + "npm config ls -l".red + "\" for more information.");
						console.log("The " + "node_modules".blue + " directory should be: ");
						console.log("    " + infoObject.npm.path.global.red + "\\node_modules".red);
						console.log("(You can create this directory manually if there are problems with installation of modules.)");
					}
					else {
						console.log("That means, in general all global npm files will be found in these 3 directories:".green);
						console.log("    " + infoObject.npm.path.bin.red);
						console.log("    " + infoObject.npm.path.lib.red);
						console.log("    " + infoObject.npm.path.share.red);
						console.log("The " + "node_modules".blue + " directory is: ");
						console.log("    " + infoObject.npm.path.global.red + "/lib/node_modules".red);
					}
					console.log(" "); // empty line

					if(this_os !== 'windows') {
						console.log("On Windows:");
						console.log("Having trouble with installing node modules because of missing rights?".green);
						console.log("I do not recommend using sudo at all.");
						console.log("Better change the location of your global npm direcory, or...");
						console.log("I prefer to have a certain user (myuser) owning the files and beeing responsible for npm.");
						console.log("So just change file permissions for user myuser: ");
						console.log("    \"sudo chown -R myuser ".red + globalDir.red + "\"".red);
						console.log(" "); // empty line
					}

					console.log("using npm:".blue);
					console.log("you can display the GLOBAL directory with:");
					console.log("    \"npm config get prefix\"".red);
					console.log("you can set the GLOBAL directory for yourself with:");
					console.log("    \"npm config set prefix /some/directory/foobar\"".red);
					console.log("if you change this, you'll probably also want to update your path with e.g.: ");
					console.log("    echo \"export PATH=/some/directory/foobar/bin:$PATH\" >> $HOME/.profile\"".red);
					console.log(" "); // empty line

					console.log("inside a project folder use".blue);
					console.log("\"npm ls\"".red + "                     for listing modules");
					console.log("\"npm outdated\"".red + "               for listing outdated modules");
					console.log("\"npm update\"".red + "                 for updating the local packages");
					console.log("\"npm uninstall package_name\"".red + " for deleting the local package");
					console.log("\"npm uninstall package_name --save\"".red + " for also updating the package.json");
					console.log("\"npm prune\"".red + "                  for deleting packages not in package.json but existent in node_modules");
					console.log(" "); // empty line
					console.log("---------------------------------------------------------------");
					console.log("(nvsx-helo version " + infoObject.nvsxHelo.version +")");
				}
			}
		});
	}
}

// EOF
