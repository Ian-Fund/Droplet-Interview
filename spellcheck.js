"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var filePath = __dirname + "\\" + process.argv[3];
console.log("filePath: ", filePath);
var wordList = (0, utils_1.readTextFile)(filePath);
var dictionaryPath = __dirname + "\\" + process.argv[2];
console.log("dictionaryPath: ", dictionaryPath);
var dictionaryMap = (0, utils_1.createDictionaryMap)(dictionaryPath);
console.log("dictionary: ", dictionaryMap);
var misspelledWords = (0, utils_1.findMisspelledWords)(dictionaryMap, wordList);
console.log("The misspelled words are: " + misspelledWords);
misspelledWords.forEach(function (word) {
    console.log("Suggestions for " + word + ": ");
    console.log((0, utils_1.getSuggestions)(word, dictionaryMap));
});
