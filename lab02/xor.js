"use strict";
//autor: Oskar Lewna

const fs = require("fs");

const generateKey = () => {
  const key = [];
  for (let i = 0; i < 64; i++) {
    const random = Math.floor(Math.random() * (122 - 97) + 97);
    key.push(String.fromCharCode(random));
  }

  try {
    fs.writeFileSync("key.txt", key.join(""));
    console.log("Zapisano klucz do pliku");
  } catch (err) {
    console.error(err);
  }
  return key[0];
};

const preparingText = () => {
  try {
    const data = fs.readFileSync("orig.txt", "utf8");
    const strings64 = data
      .toLowerCase()
      .replace(/[^a-z ]/gi, "")
      .match(/.{1,64}/g)
      .map((x) => {
        if (x.length < 64) {
          for (let i = x.length; i < 64; i++) {
            x += "a";
          }
        }
        return x;
      });

    if (fs.existsSync("plain.txt")) {
      fs.unlinkSync("plain.txt");
    }
    const appender = fs.createWriteStream("plain.txt", { flags: "a" });
    for (let i = 0; i < strings64.length; i++) {
      appender.write(strings64[i]);
      if (i + 1 !== strings64.length) {
        appender.write("\n");
      }
    }
    appender.end();
    console.log("Zapisano do pliku");
  } catch (err) {
    console.log(err);
  }
};

const encryption = () => {
  const text = [];
  const key = [];
  const encrypted = [];

  try {
    const data = fs.readFileSync("plain.txt", "utf-8");
    data.split(/\r?\n/).forEach((line) => {
      text.push(line);
    });
    const k = fs.readFileSync("key.txt", "utf-8");
    if (k.length === 64) {
      key.push(k);
    } else {
      key.push(generateKey());
    }
  } catch (err) {
    console.log(err);
  }

  for (let i = 0; i < text.length; i++) {
    const tmp = [];
    for (let j = 0; j < key[0].length; j++) {
      tmp.push(
        (text[i][j].charCodeAt(0) ^ key[0][j].charCodeAt(0))
          .toString(2)
          .padStart(8, "0")
      );
    }
    encrypted.push(tmp.join(""));
  }

  try {
    if (fs.existsSync("./crypto.txt")) {
      fs.unlinkSync("crypto.txt");
    }
    const appender = fs.createWriteStream("crypto.txt", { flags: "a" });
    for (let i = 0; i < encrypted.length; i++) {
      appender.write(encrypted[i]);
      if (i + 1 !== encrypted.length) {
        appender.write("\n");
      }
    }
    appender.end();
    console.log("Zapisano do pliku");
  } catch (err) {
    console.log(err);
  }
};

switch (process.argv[2]) {
  case "-p":
    preparingText();
    break;
  case "-e":
    encryption();
    break;
  case "-k":
    console.log("Opcja -k");
    break;
  default:
    console.log("Proszę wybrać odpowienią opcję.");
    process.exit(0);
}
