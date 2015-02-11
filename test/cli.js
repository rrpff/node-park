require("chai").should();

var sys = require("sys"),
	exec = require("child_process").exec;

describe("Park as a CLI", function(){

	describe("with no arguments", function(){

		it("should print out the contents of package.json", function(done){
			exec("park", function(err, out){
				out.should.be.a("string");
				JSON.parse(out).should.be.a("object");
				done();
			});
		});

	});

	describe("with one argument", function(){

		it("should return the value of that key", function(done){
			exec("park someNumber", function(err, out){
				var num = parseInt(out, 10);
				num.should.be.a("number");
				done();
			});
		});

	});

	describe("with two arguments", function(){

		it("should change the key (first arg) to the value of the second arg", function(done){
			var num = Math.ceil(Math.random() * 100);
			exec("park someOtherNumber " + num, function(err, out){
				var obj = JSON.parse(out);
				obj.should.be.a("object");
				parseInt(obj.someOtherNumber, 10).should.equal(num);
				done();
			});
		});

	});

});