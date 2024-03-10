import { readFileSync } from "fs";
import {
  createDictionaryMap,
  findMisspelledWords,
  findWordPositions,
  getContext,
  getSuggestions,
  createWordList,
} from "./utils";
import * as path from "path";

const filePath = path.resolve(__dirname, process.argv[3]);
const fileData = readFileSync(filePath, "utf8");
const wordList = createWordList(fileData);

const dictionaryPath = path.resolve(__dirname, process.argv[2]);
const dictionaryMap = createDictionaryMap(readFileSync(dictionaryPath, "utf8"));

const misspelledWords = findMisspelledWords(dictionaryMap, wordList);
console.log("The misspelled words are: " + misspelledWords);

misspelledWords.forEach((word) => {
  console.log("Suggestions for " + word + ": ");
  console.log(getSuggestions(word, dictionaryMap));
});

const misspelledWordContext = getContext(misspelledWords, wordList);
misspelledWordContext.forEach(([context, word]) => {
  console.log("Context for word", word, ":", context);
});
console.log();
misspelledWords.forEach((word) => {
  console.log("Misspelled Word: ", word, findWordPositions(fileData, word));
});
