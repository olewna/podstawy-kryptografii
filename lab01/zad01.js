"use strict";
//autor: Oskar Lewna
const fs = require("fs");

const tekst = [];
const klucz = [];

const szyfr = "a"; //c a
const odszyfrowywanie = "d"; //e d j k

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
  const decrypted = cezarOdszyfrowanie(tekst, przesuniecie);

  try {
    fs.writeFileSync("decrypt.txt", decrypted);
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
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
  const crypto = cezarSzyfrowanie(tekst, przesuniecie);

  try {
    fs.writeFileSync("crypto.txt", crypto);
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
} else if (szyfr === "a" && odszyfrowywanie === "e") {
  try {
    const data = fs.readFileSync("plain.txt", "utf8");
    tekst.push(...data.split(""));
    const data2 = fs.readFileSync("key.txt", "utf8");
    klucz.push(...data2.split(" "));
  } catch (err) {
    console.error(err);
  }

  const przesuniecie = +klucz[0];
  const a = +klucz[1];
  const crypto = afinicznySzyfrowanie(tekst, a, przesuniecie);

  try {
    fs.writeFileSync("crypto.txt", crypto);
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
} else if (szyfr === "a" && odszyfrowywanie === "d") {
  try {
    const data = fs.readFileSync("crypto.txt", "utf8");
    tekst.push(...data.split(""));
    const data2 = fs.readFileSync("key.txt", "utf8");
    klucz.push(...data2.split(" "));
  } catch (err) {
    console.error(err);
  }

  const przesuniecie = +klucz[0];
  const a = +klucz[1];
  const decrypted = afinicznyOdszyfrowanie(tekst, a, przesuniecie);

  try {
    fs.writeFileSync("decrypt.txt", decrypted);
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
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

function afinicznySzyfrowanie(tekst, a, przesuniecie) {
  const zaszyfrowane = tekst
    .map((elem) =>
      elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123
        ? ((a * (elem.charCodeAt(0) - 97) + przesuniecie) % 26) + 97
        : elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91
        ? ((a * (elem.charCodeAt(0) - 65) + przesuniecie) % 26) + 65
        : elem
    )
    .map((x) => (typeof x === "number" ? String.fromCharCode(x) : x))
    .join("");
  return zaszyfrowane;
}

function afinicznyOdszyfrowanie(tekst, a, przesuniecie) {
  const a_1 = modInverse(a, 26);
  if (a_1 === -1) {
    return "Nie ma odwrotności do liczby a";
  }

  const zaszyfrowane = tekst
    .map((elem) =>
      elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123
        ? (((elem.charCodeAt(0) - 97 - przesuniecie + 26) * a_1) % 26) + 97
        : elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91
        ? (((elem.charCodeAt(0) - 65 - przesuniecie + 26) * a_1) % 26) + 65
        : elem
    )
    .map((x) => (typeof x === "number" ? String.fromCharCode(x) : x))
    .join("");
  return zaszyfrowane;
}

function modInverse(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m == 1) {
      return x;
    }
  }
  return -1;
}
