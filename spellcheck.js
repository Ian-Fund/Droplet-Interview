"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var path = require("path");
var filePath = path.resolve(__dirname, process.argv[3]);
var wordList = (0, utils_1.readTextFile)(filePath);
var dictionaryPath = path.resolve(__dirname, process.argv[2]);
var dictionaryMap = (0, utils_1.createDictionaryMap)(dictionaryPath);
var misspelledWords = (0, utils_1.findMisspelledWords)(dictionaryMap, wordList);
console.log("The misspelled words are: " + misspelledWords);
misspelledWords.forEach(function (word) {
    console.log("Suggestions for " + word + ": ");
    console.log((0, utils_1.getSuggestions)(word, dictionaryMap));
});
var misspelledWordContext = (0, utils_1.getContext)(misspelledWords, wordList);
console.log("The misspelled word context is: ", misspelledWordContext);
misspelledWords.forEach(function (word) {
    console.log((0, utils_1.findWordPositions)(filePath, word));
});
