"use strict";
//autor: Oskar Lewna
const fs = require("fs");

const tekst = [];
const klucz = [];
const alfabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const liczby = alfabet.map((_, i) => i);

const szyfr = "d"; //c a
const odszyfrowywanie = "e"; //e d j k

switch (odszyfrowywanie) {
  case "e":

  case "d":

  case "j":

  case "k":

  default:
    console.log(
      "Prosze wybrać czy odszyfrowujemy, szyfrujemy lub robimy to bez klucza."
    );
}

switch (szyfr) {
  case "a":

  case "c":

  default:
    console.log("Prosze wybrac szyfrowanie: a (afiniczny) lub c (cezara).");
}

try {
  const data = fs.readFileSync("plain.txt", "utf8");
  tekst.push(...data.split(""));
  const data2 = fs.readFileSync("key.txt", "utf8");
  klucz.push(...data2.split(" "));
} catch (err) {
  console.error(err);
}

const przesuniecie = klucz[0];
const a = klucz[1];

function cezarSzyfrowanie(tekst,przesuniecie) {
  tekst.split("").map((elem,i,arr) => )
}

console.log(tekst);
console.log(klucz);
