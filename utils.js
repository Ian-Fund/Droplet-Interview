"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWordPositions = exports.getContext = exports.getSuggestions = exports.findMisspelledWords = exports.readTextFile = exports.createDictionaryMap = void 0;
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
            if (!misspelledWords.includes(wordList[i])) {
                misspelledWords.push(wordList[i]);
            }
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
function getContext(misspelledWords, wordList) {
    var surroundingContext = [];
    for (var i = 0; i < wordList.length; i++) {
        var word = wordList[i];
        if (misspelledWords.includes(word)) {
            var startIndex = Math.max(0, i - 2);
            var endIndex = Math.min(i + 2, wordList.length - 1);
            var contextWords = wordList.slice(startIndex, endIndex + 1).join(" ");
            surroundingContext.push(contextWords);
        }
    }
    return surroundingContext;
}
exports.getContext = getContext;
function findWordPositions(filePath, word) {
    var wordPositions = [];
    try {
        var data = (0, fs_1.readFileSync)(filePath, "utf8");
        var lines = data
            .replace(/[^\w\s]|[\r]/g, "")
            .split("\n")
            .map(function (line) { return line.split(" "); });
        for (var row = 0; row < lines.length; row++) {
            var line = lines[row];
            for (var column = 0; column < line.length; column++) {
                if (line[column] === word) {
                    wordPositions.push({ row: row + 1, column: column + 1 });
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
    return wordPositions;
}
exports.findWordPositions = findWordPositions;
