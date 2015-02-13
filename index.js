var findRoot = require("find-root"),
	Path = require("path"),
	utils = require("./lib/utils"),
	fs = require("fs");

// dir should be the dir you want to find the
// nearest package.json to.
module.exports = function(dir){

	// Module object
	var park = {};

	// Returns package.json readable stream
	park.read = function(){
		return fs.createReadStream(park.path);
	}

	// Get value from package.json
	// If key contains dots, it assumes object string syntax.
	park.get = function(key){
		return utils.getSubObject(park.obj, key);
	}

	// Set value on package object and save
	// If key contains dots, it assumes object string syntax.
	// Returns writeable stream
	park.set = function(key, val){
		// Set value on object key
		utils.setSubObject(park.obj, key, val);
		return park.save();
	}

	// Save package.json as prettified JSON from park.obj
	// Returns writeable stream
	park.save = function(){
		// Pretty JSON buffer
		var json = new Buffer(JSON.stringify(park.obj, null, 2));

		var stream = fs.createWriteStream(park.path, json);
		stream.write(json);
		stream.end();

		// Returns a writeable stream
		return stream;		
	}

	// Get closest package.json to dir, recursing upwards
	// until it's found.
	park.path = Path.join(findRoot(dir), "package.json");

	// package.json as an object
	park.obj = require(park.path);

	// Return module
	return park;

}