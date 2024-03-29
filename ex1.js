#!/usr/bin/env node
import path from "path";
import fs from "node:fs";
import util from "node:util";
import getStdin from "get-stdin";
import minimist from "minimist";

("use strict");

// var path = require("path");
// var fs = require("fs");
// var util = require("util");

// var getStdin = require("get-stdin");

var args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (process.env.HELLO) {
  console.log(process.env.HELLO);
}

if (args.help) {
  printHelp();
} else if (args.in || args._.includes("-")) {
  getStdin().then(processFile).catch(error);
} else if (args.file) {
  fs.readFile(
    path.join(BASE_PATH, args.file),
    function onContents(err, contents) {
      if (err) {
        error(err.toString());
      } else {
        processFile(contents.toString());
      }
    }
  );
} else {
  error("Incorrect usage.", true);
}

//*********************************************/

function processFile(contents) {
  contents = contents.toUpperCase();
  console.log(contents); //string
  process.stdout.write(contents); //buffer
}

function error(msg, includeHelp = false) {
  console.error(msg);
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}

function printHelp() {
  console.log("ex1 usage");
  console.log("  ex1.js --file={FILENAME}");
  console.log("");
  console.log("--help                 print this help");
  console.log("--file={FILENAME}      process the file");
  console.log("--in, -                process stdin");
  console.log("");
}
