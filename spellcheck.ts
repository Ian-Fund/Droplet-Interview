import {
  createDictionaryMap,
  findMisspelledWords,
  findWordPositions,
  getContext,
  getSuggestions,
  readTextFile,
} from "./utils";
import * as path from "path";

const filePath = path.resolve(__dirname, process.argv[3]);
const wordList = readTextFile(filePath);

const dictionaryPath = path.resolve(__dirname, process.argv[2]);
const dictionaryMap = createDictionaryMap(dictionaryPath);

const misspelledWords = findMisspelledWords(dictionaryMap, wordList);
console.log("The misspelled words are: " + misspelledWords);

misspelledWords.forEach((word) => {
  console.log("Suggestions for " + word + ": ");
  console.log(getSuggestions(word, dictionaryMap));
});

const misspelledWordContext = getContext(misspelledWords, wordList);
console.log("The misspelled word context is: ", misspelledWordContext);

misspelledWords.forEach((word) => {
  console.log(findWordPositions(filePath, word));
});
