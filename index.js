// How to write a node module: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry

// old require:
// const path      = require('path');
// const colors    = require('colors');
// let execute_command = require('child_process').exec;

import path from 'path';
import('colors');
import { exec } from 'child_process';

const version = '3.0.7';
let outputFormat = 'json';

const nvsxHelo = { 
  getVersion(){
    console.log(version)
    return version
  },
  getOutputFormat(){
    console.log(outputFormat)
    return outputFormat
  },
  setOutputFormat(myFormat) {
      if(typeof(myFormat)==='string') {
        // by now there is ony text and json
        if(myFormat === 'txt' || myFormat === 'text' || myFormat == 'json'){
          outputFormat = myFormat
        }
    }
  },
  print(arg) {
  // child process is not a module, it lives in the standard node.js, alread exported "exec", see above
  // find more info at http://nodejs.org/api.html#_child_processes
  let this_os = /^win/.test(process.platform) ? 'windows' : 'unixoid';

  let infoObject = {};
  infoObject.nvsxHelo = {};
  infoObject.nvsxHelo.version = version;

  infoObject.nvsxHelo.comments = {};
  infoObject.nvsxHelo.comments.npm_version         = 'npm -v';
  infoObject.nvsxHelo.comments.npm_local_pkgs      = 'npm ls --depth=0';
  infoObject.nvsxHelo.comments.npm_global_pkgs     = 'npm ls --depth=0 --global';
  infoObject.nvsxHelo.comments.npm_config_list     = 'npm config list';
  infoObject.nvsxHelo.comments.npm_config_list_xl  = 'npm config ls -l';
  infoObject.nvsxHelo.comments.npm_show_global_dir = 'npm config get prefix';

  infoObject.nvsxHelo.comments.npm_set_global_dir  = 'npm config set prefix=$HOME/.node_modules_global';
  infoObject.nvsxHelo.comments.shell_update_path   = 'export PATH=$HOME/.node_modules_global/bin:$PATH >> $HOME/.profile';
  infoObject.nvsxHelo.comments.shell_show_config   = 'cat $HOME/.npmrc';

  infoObject.nvsxHelo.comments.local_list_modules  = 'npm ls';
  infoObject.nvsxHelo.comments.local_list_outdated = 'npm outdated';
  infoObject.nvsxHelo.comments.local_pkgs_update   = 'npm update';
  infoObject.nvsxHelo.comments.local_pkg_uninstall = 'npm uninstall package_name';
  infoObject.nvsxHelo.comments.local_pkg_uninstall_modify_package_json = 'npm uninstall package_name --save';
  infoObject.nvsxHelo.comments.local_pkg_delete_when_not_in_package_json = 'npm prune';
  infoObject.nvsxHelo.comments.nodejs_homepage     = 'https://nodejs.org/';

  infoObject.npm = {};
  infoObject.npm.path = {};
  infoObject.node = {};
  infoObject.node.version = process.version;
  infoObject.node.versions = process.versions;
  infoObject.node.uptime = process.uptime();

  // check command line arguments:
  let req_v = false;
  process.argv.forEach( par => {
    if (par === '-v' || par === '--version') {
      req_v = true;
    }
    if (par === '--format=txt' || par === '--format=text') {
      outputFormat = 'txt';
    }
  })

  // check print arg (config object):
  if(arg) {
    if(arg.format) {
      outputFormat = arg.format;
    }
  }

  exec("npm config get prefix", function (error, stdout, stderr) {
    // process("pwd", function (error, stdout, stderr) {
    if ( req_v === true ) {
      console.log("nvsx-helo version " + version)
    }
    else if (error !== null) {
      console.log('ERROR: ' + error);
      console.log('STDERR: ' + stderr);
    }
    else {
      let globalDir = stdout;
      globalDir = globalDir.replace(/\r\n|\r|\n/g, '');
      infoObject.npm.path.global  = globalDir;
      infoObject.npm.path.lib     = path.join(globalDir, "/lib");
      infoObject.npm.path.bin     = path.join(globalDir + "/bin");
      infoObject.npm.path.share   = path.join(globalDir + "/share");
      infoObject.npm.path.modules = path.join(globalDir + "/lib/node_modules");

      if(outputFormat === 'json' ) {
        console.log(JSON.stringify(infoObject, null, 2));
      }
      else {
        console.log("##### about npm on this machine #####".blue);
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
          console.log("unixoid user rights:");
          console.log("Having trouble with installing node modules because of missing rights?".green);
          console.log("I do not recommend using sudo at all.");
          console.log("Better change the location of your global npm direcory, or...");
          console.log("I prefer to have a certain user (myuser) owning the files and beeing responsible for npm.");
          console.log("So just change file permissions for user myuser: ");
          console.log("    \"sudo chown -R myuser ".red + globalDir.red + "\"".red);
          console.log("BEST SOLUTION: Use nvm (node version manager, https://github.com/nvm-sh/nvm)");
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
        console.log("(nvsx-helo version " + infoObject.nvsxHelo.version +")");
        console.log(" "); // empty line
      }
    }
  });
  }
}

export default nvsxHelo;

// EOF
