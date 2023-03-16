"use strict";
//autor: Oskar Lewna

const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

const szyfr = prompt("Wybierz szyfr: c - szyfr cezara, a - szyfr afiniczny: ");

if (szyfr !== "c" && szyfr !== "a") {
  console.log("Prosze podać dobrą opcję (c lub a).");
  process.exit(0);
}

const odszyfrowywanie = prompt(
  "Wybierz opcję: d - odszyfrowanie, e - szyfrowanie, j - kryptoanaliza z tekstem jawnym, k - kryptoanaliza: "
);

const tekst = [];
const klucz = [];
const extra = [];

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

  if (isNaN(przesuniecie)) {
    console.log("Nieprawidłowy klucz! Podaj klucz w postaci liczby.");
  } else {
    const decrypted = cezarOdszyfrowanie(tekst, przesuniecie);

    try {
      fs.writeFileSync("decrypt.txt", decrypted);
      console.log("Zapisano do pliku");
    } catch (err) {
      console.error(err);
    }
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

  if (isNaN(przesuniecie)) {
    console.log("Nieprawidłowy klucz! Podaj klucz w postaci liczby.");
  } else {
    const crypto = cezarSzyfrowanie(tekst, przesuniecie);

    try {
      fs.writeFileSync("crypto.txt", crypto);
      console.log("Zapisano do pliku");
    } catch (err) {
      console.error(err);
    }
  }
} else if (szyfr === "c" && odszyfrowywanie === "j") {
  try {
    const data = fs.readFileSync("crypto.txt", "utf8");
    tekst.push(...data.split(""));
    const data2 = fs.readFileSync("extra.txt", "utf8");
    extra.push(...data2.split(""));
  } catch (err) {
    console.error(err);
  }

  const wynik = cezarKryptoanalizaZTekstemJawnym(tekst, extra);

  try {
    fs.writeFileSync("key-found.txt", wynik[0]);
    fs.writeFileSync("decrypt.txt", wynik[1]);
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
} else if (szyfr === "c" && odszyfrowywanie === "k") {
  try {
    const data = fs.readFileSync("crypto.txt", "utf8");
    tekst.push(...data.split(""));
  } catch (err) {
    console.error(err);
  }

  const mozliwyTekst = cezarKryptoanaliza(tekst);

  try {
    fs.writeFileSync("decrypt.txt", mozliwyTekst);
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
  if (isNaN(przesuniecie)) {
    console.log("Nieprawidłowy klucz! Podaj klucz w postaci liczby.");
  } else {
    const crypto = afinicznySzyfrowanie(tekst, a, przesuniecie);

    try {
      fs.writeFileSync("crypto.txt", crypto);
      console.log("Zapisano do pliku");
    } catch (err) {
      console.error(err);
    }
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
  if (isNaN(przesuniecie)) {
    console.log("Nieprawidłowy klucz! Podaj klucz w postaci liczby.");
  } else {
    const decrypted = afinicznyOdszyfrowanie(tekst, a, przesuniecie);

    try {
      fs.writeFileSync("decrypt.txt", decrypted);
      console.log("Zapisano do pliku");
    } catch (err) {
      console.error(err);
    }
  }
} else if (szyfr === "a" && odszyfrowywanie === "j") {
  try {
    const data = fs.readFileSync("crypto.txt", "utf8");
    tekst.push(...data.split(""));
    const data2 = fs.readFileSync("extra.txt", "utf8");
    extra.push(...data2.split(""));
  } catch (err) {
    console.error(err);
  }

  const wynik = afinicznyKryptoanalizaZTekstem(tekst, extra);

  try {
    fs.writeFileSync("decrypt.txt", wynik[1]);
    fs.writeFileSync("key-found.txt", wynik[0].join(" "));
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
} else if (szyfr === "a" && odszyfrowywanie === "k") {
  try {
    const data = fs.readFileSync("crypto.txt", "utf8");
    tekst.push(...data.split(""));
  } catch (err) {
    console.error(err);
  }

  const mozliwyTekst = afinicznyKryptoanaliza(tekst);

  try {
    fs.writeFileSync("decrypt.txt", mozliwyTekst);
    console.log("Zapisano do pliku");
  } catch (err) {
    console.error(err);
  }
} else {
  console.log("Proszę podać dobrą opcję (e,d,j,k).");
  process.exit(0);
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

function cezarKryptoanalizaZTekstemJawnym(tekst, extra) {
  let szyfrLiczba = tekst[0].charCodeAt(0);
  let extraLiczba = extra[0].charCodeAt(0);
  szyfrLiczba > 96 && szyfrLiczba < 123
    ? (szyfrLiczba -= 97) && (extraLiczba -= 97)
    : (szyfrLiczba -= 65) && (extraLiczba -= 65);
  const nowyKlucz = (szyfrLiczba - extraLiczba + 26) % 26;
  return [nowyKlucz, cezarOdszyfrowanie(tekst, nowyKlucz)];
}

function cezarKryptoanaliza(tekst) {
  const decrypted = [];
  for (let i = 1; i < 26; i++) {
    const zaszyfrowane = cezarOdszyfrowanie(tekst, i);
    decrypted.push(zaszyfrowane);
  }
  return decrypted.join("\n");
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

function afinicznyKryptoanalizaZTekstem(tekst, extra) {
  if (extra.length < 2) return "Za mało liter w tekście jawnym";
  const mozliweKlucze = [];

  for (let i = 0; i < extra.length; i++) {
    for (let b = 0; b < 26; b++) {
      for (let a = 1; a <= 26; a++) {
        if (modInverse(a, 26) !== -1) {
          if (extra[i].charCodeAt(0) > 96 && extra[i].charCodeAt(0) < 123) {
            if (
              ((a * (extra[i].charCodeAt(0) - 97) + b) % 26) + 97 ===
              tekst[i].charCodeAt(0)
            ) {
              mozliweKlucze.push([a, b]);
            }
          } else if (
            extra[i].charCodeAt(0) > 64 &&
            extra[i].charCodeAt(0) < 91
          ) {
            if (
              ((a * (extra[i].charCodeAt(0) - 65) + b) % 26) + 65 ===
              tekst[i].charCodeAt(0)
            ) {
              mozliweKlucze.push([a, b]);
            }
          }
        }
      }
    }
  }

  const unikalneKlucze = mozliweKlucze.reduce((acc, curr) => {
    const elem = acc[curr.flat()] ?? 0;
    return {
      ...acc,
      [curr]: elem + 1,
    };
  }, {});
  const klucz = Object.keys(unikalneKlucze)
    .reduce((a, b) => (unikalneKlucze[a] > unikalneKlucze[b] ? a : b))
    .split(",")
    .map((x) => parseInt(x));
  return [klucz, afinicznyOdszyfrowanie(tekst, klucz[1], klucz[0])];
}

function afinicznyKryptoanaliza(tekst) {
  const decrypted = [];
  for (let a = 1; a <= 26; a++) {
    if (modInverse(a, 26) === -1) {
      continue;
    }
    for (let b = 0; b < 26; b++) {
      if (
        afinicznyOdszyfrowanie(tekst, a, b) !== "Nie ma odwrotności do liczby a"
      ) {
        decrypted.push(afinicznyOdszyfrowanie(tekst, a, b));
      }
    }
  }
  return decrypted.join("\n");
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
