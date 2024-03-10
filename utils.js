"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestions = exports.findMisspelledWords = exports.readTextFile = exports.createDictionaryMap = void 0;
var fs_1 = require("fs");
var levenshtein = require("damerau-levenshtein");
// Read the dictionary file and convert it to a map
function createDictionaryMap(dictionaryPath) {
    var dictionaryMap = {};
    try {
        var dictionaryData = (0, fs_1.readFileSync)(dictionaryPath, "utf8");
        var dictionaryList = dictionaryData
            .replace(/[^\w\s]|[\d]/g, "")
            .replace(/[\r]/g, "")
            .split("\n");
        dictionaryList.forEach(function (word) {
            dictionaryMap[word] = true;
        });
    }
    catch (err) {
        console.error(err);
    }
    return dictionaryMap;
}
exports.createDictionaryMap = createDictionaryMap;
function readTextFile(filePath) {
    var wordList = [];
    try {
        var data = (0, fs_1.readFileSync)(filePath, "utf8");
        wordList = data
            .replace(/[^\w\s]|[\d]/g, "")
            .replace(/[\n\r]/g, "")
            .split(" ");
        console.log("wordList: ", wordList);
    }
    catch (err) {
        console.error(err);
    }
    return wordList;
}
exports.readTextFile = readTextFile;
// Compare the list of words to the dictionary and output the misspelled words
function findMisspelledWords(dictionary, wordList) {
    var misspelledWords = [];
    for (var i = 0; i < wordList.length; i++) {
        if (!dictionary[wordList[i].toLowerCase()]) {
            misspelledWords.push(wordList[i]);
        }
    }
    return misspelledWords;
}
exports.findMisspelledWords = findMisspelledWords;
function getSuggestions(word, dictionary) {
    var suggestions = [];
    for (var dictWord in dictionary) {
        var lev = levenshtein(word, dictWord);
        if (lev.steps < 3 && lev.similarity > 0.6) {
            suggestions.push(dictWord);
        }
    }
    return suggestions;
}
exports.getSuggestions = getSuggestions;
