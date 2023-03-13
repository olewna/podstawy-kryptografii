"use strict";
//autor: Oskar Lewna
const fs = require("fs");

const tekst = [];
const klucz = [];

const szyfr = "c"; //c a
const odszyfrowywanie = "d"; //e d j k
const a = +klucz[1];

if (szyfr === "c" && odszyfrowywanie === "d") {
  try {
    const data = fs.readFileSync("crypto.txt", "utf8");
    tekst.push(...data.split(""));
    const data2 = fs.readFileSync("key.txt", "utf8");
    klucz.push(...data2.split(" "));
  } catch (err) {
    console.error(err);
  }
  const przesuniecie = +klucz[0];
  console.log(cezarOdszyfrowanie(tekst, przesuniecie));
} else if (szyfr === "c" && odszyfrowywanie === "e") {
  try {
    const data = fs.readFileSync("plain.txt", "utf8");
    tekst.push(...data.split(""));
    const data2 = fs.readFileSync("key.txt", "utf8");
    klucz.push(...data2.split(" "));
  } catch (err) {
    console.error(err);
  }
  const przesuniecie = +klucz[0];
  console.log(cezarSzyfrowanie(tekst, przesuniecie));
}

function cezarSzyfrowanie(tekst, przesuniecie) {
  const zaszyfrowane = tekst
    .map((elem) =>
      elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123
        ? ((elem.charCodeAt(0) - 97 + przesuniecie) % 26) + 97
        : elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91
        ? ((elem.charCodeAt(0) - 65 + przesuniecie) % 26) + 65
        : elem
    )
    .map((x) => (typeof x === "number" ? String.fromCharCode(x) : x))
    .join("");
  return zaszyfrowane;
}

function cezarOdszyfrowanie(tekst, przesuniecie) {
  const zaszyfrowane = tekst
    .map((elem) =>
      elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123
        ? ((elem.charCodeAt(0) - 97 - przesuniecie + 26) % 26) + 97
        : elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91
        ? ((elem.charCodeAt(0) - 65 - przesuniecie + 26) % 26) + 65
        : elem
    )
    .map((x) => (typeof x === "number" ? String.fromCharCode(x) : x))
    .join("");
  return zaszyfrowane;
}
