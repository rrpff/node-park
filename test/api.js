require("chai").should();

var park = require("../"),
	pkg = park(__dirname),
	Path = require("path");

describe("Park as a module", function(){

	it("should be a function which accepts a path and returns an object", function(){
		park.should.be.a("function");
		pkg.should.be.a("object");
	});

	it("should walk up directories until it finds a package.json, if not in the path specified", function(){
		var pkg = park(Path.join(__dirname, "../node_modules/"));
		pkg.should.be.a("object");
	});

	it("should have path and obj properties", function(){
		pkg.path.should.be.a("string");
		pkg.obj.should.be.a("object");
		pkg.obj.description.should.be.a("string");
	});

	describe("#read", function(){

		it("should return a readable stream", function(){
			var stream = pkg.read();
			stream.readable.should.equal(true);
			stream.pipe.should.be.a("function");
		});

	});

	describe("#get", function(){

		it("should return the value of the key passed", function(){
			var description = pkg.get("description");
			description.should.be.a("string");
		});

		it("should traverse objects if key contains dots (eg object.key.key)", function(){
			var number = pkg.get("here.is.a.number");
			number.should.be.a("number");
		});

	});

	describe("#set", function(){

		var oldNum = pkg.get("someNumber"),
			newNum = Math.ceil(Math.random() * 100);

		var stream = pkg.set("someNumber", newNum);

		it("should change the value of key", function(){
			pkg.get("someNumber").should.equal(newNum);
		});

		it("should traverse objects if key has dots", function(){
			var newObjNum = Math.ceil(Math.random() * 100);

			pkg.set("here.is.a.number", newObjNum);
			pkg.get("here.is.a.number").should.equal(newObjNum);
		});

		it("should return a writeable stream", function(){
			stream.writable.should.equal(true);
		});

	});

});