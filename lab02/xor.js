"use strict";
//autor: Oskar Lewna

const fs = require("fs");

let option;

switch (process.argv[2]) {
  case "-p":
    option = "p";
    console.log("Opcja -p");
    break;
  case "-e":
    option = "e";
    console.log("Opcja -e");
    break;
  case "-k":
    option = "k";
    console.log("Opcja -k");
    break;
  default:
    console.log("Proszę wybrać odpowienią opcję.");
    process.exit(0);
}

const optionP = () => {};
