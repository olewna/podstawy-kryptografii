"use strict";
//autor: Oskar Lewna

const fs = require("fs");

switch (process.argv[2]) {
  case "-p":
    console.log("Opcja -p");
    break;
  case "-e":
    console.log("Opcja -e");
    break;
  case "-k":
    console.log("Opcja -k");
    break;
  default:
    console.log("Proszę wybrać odpowienią opcję.");
    process.exit(0);
}
