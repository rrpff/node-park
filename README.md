# park

A simple utility and **CLI** for getting and setting values on the closest `package.json`.

Mostly useful for quickly changing values or copying values to the keyboard. If you need anything more, `npm` and `vim package.json` have you covered.

## Usage

### CLI

First install it via npm.

```bash
$ npm install -g park
```

It's now available on your command line.

#### Get a value from `package.json`

```bash
$ park description
# => CLI for getting and setting package.json values. Useful for quickly changing values and copying values to the keyboard.
```

Especially useful if you pipe it to your clipboard. For example, I use this all the time when starting Github repos:

```bash
$ park description | clip # clip is Windows. Mac and Linux users use pbcopy and xclip respectively.
```

`park` accepts object strings as keys for getting nested values.

For example, `scripts.test` will access the `test` key of `scripts`.

```bash
$ park "scripts.test"
# => cd test/ && mocha . && cd ..
```

#### Set a value in `package.json`

```bash
$ park main park.js
# => package.json contents
```

Or with an object string:

```bash
$ park "scripts.test" "mocha"
```

#### Stream out the `package.json` object

It's equivalent to using `cat package.json`, but also works from any subdirectory.

```bash
$ park
# => package.json contents
```

### API

The programmatic API is more or less identical.

First install it.

```bash
$ npm install --save park
```

Then require it in your code. `park` is a function which accepts a directory path. 

```js
var park = require("park"),
	pkg = park(__dirname);
```

The following methods will be available on the object `park(dir)` returns.

#### pkg.read()

Returns a readable Stream of the `package.json` file.

```js
pkg.read().pipe(process.stdout);
```

#### pkg.get(key)

Get a key from `package.json`.

```js
pkg.get("version"); // => "1.0.0"
```

You can use object strings in the API too.

```js
var chaiVersion = pkg.get("devDependencies.chai");
```

#### pkg.set(key, val)

Set a key in `package.json` as val and save the file. Returns a writeable Stream.

```js
pkg.set("version", "1.0.1").on("finish", function(){
	console.log("Saved!");
});
```

Or with an object string.

```js
var stream = pkg.set("bin.park", "bin/cli.js");
```

#### pkg.save()

Manually save `package.json` as `pkg.obj`. Useful if you want to edit the object manually.

#### pkg.path

Full path of the `package.json` file.

#### pkg.obj

`package.json` contents as an object.

## Credits

Thanks to `npm`!