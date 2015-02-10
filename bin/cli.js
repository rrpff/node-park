#!/usr/bin/env node

var CLI = module.exports = {},
	park = require("../"),
	pkg = park(process.cwd());

// Prints out package.json
CLI.read = function(){
	pkg.read().pipe(process.stdout);
};

// Get key from package.json
// Prints out value
CLI.get = function(key){
	console.log(pkg.get(key));
}

// Set key and save package.json
// Prints out package.json
CLI.set = function(key, val){
	pkg.set(key, val)
		.on("finish", CLI.read);
}

// Run CLI commands
CLI.run = function(key, val){
	if(val) CLI.set(key, val);
	else CLI.get(key);
}

// Run any commands
var args = process.argv.slice(2);
if(args.length) CLI.run.apply(this, args);
else CLI.read();