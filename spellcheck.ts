import {
  createDictionaryMap,
  findMisspelledWords,
  getSuggestions,
  readTextFile,
} from "./utils";

const filePath = __dirname + "\\" + process.argv[3];
console.log("filePath: ", filePath);
const wordList = readTextFile(filePath);

const dictionaryPath = __dirname + "\\" + process.argv[2];
console.log("dictionaryPath: ", dictionaryPath);
const dictionaryMap = createDictionaryMap(dictionaryPath);
console.log("dictionary: ", dictionaryMap);

const misspelledWords = findMisspelledWords(dictionaryMap, wordList);
console.log("The misspelled words are: " + misspelledWords);

misspelledWords.forEach((word) => {
  console.log("Suggestions for " + word + ": ");
  console.log(getSuggestions(word, dictionaryMap));
});
