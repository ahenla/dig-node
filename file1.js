#!/usr/bin/env node

"use strict";

var args = require("minimist")(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
});
console.log(args);

console.log(process.argv.slice(2)); // the two first arguments are the shebang and the directory of this file

// process.stdout.write("hello world\n");
// process.stderr.write("Oops\n")
// process.stdin.read()

console.log("hello world");
console.error("Oops!");
