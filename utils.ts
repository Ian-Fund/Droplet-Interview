import { readFileSync } from "fs";
import * as levenshtein from "damerau-levenshtein";

// Read the dictionary file and convert it to a map
export function createDictionaryMap(dictionaryPath: string): {
  [key: string]: boolean;
} {
  const dictionaryMap: { [key: string]: boolean } = {};
  try {
    const dictionaryData = readFileSync(dictionaryPath, "utf8");
    const dictionaryList = dictionaryData
      .replace(/[^\w\s]|[\d]/g, "")
      .replace(/[\r]/g, "")
      .split("\n");

    dictionaryList.forEach((word) => {
      dictionaryMap[word] = true;
    });
  } catch (err) {
    console.error(err);
  }
  return dictionaryMap;
}

export function readTextFile(filePath: string): string[] {
  let wordList: string[] = [];
  try {
    const data = readFileSync(filePath, "utf8");
    wordList = data
      .replace(/[^\w\s]|[\d]/g, "")
      .replace(/[\n\r]/g, "")
      .split(" ");
    console.log("wordList: ", wordList);
  } catch (err) {
    console.error(err);
  }
  return wordList;
}
// Compare the list of words to the dictionary and output the misspelled words
export function findMisspelledWords(
  dictionary: { [key: string]: boolean },
  wordList: string[]
): string[] {
  let misspelledWords: string[] = [];
  for (let i = 0; i < wordList.length; i++) {
    if (!dictionary[wordList[i].toLowerCase()]) {
      misspelledWords.push(wordList[i]);
    }
  }
  return misspelledWords;
}

export function getSuggestions(
  word: string,
  dictionary: { [key: string]: boolean }
): string[] {
  interface LevenshteinResponse {
    steps: number;
    relative: number;
    similarity: number;
  }
  const suggestions: string[] = [];
  for (const dictWord in dictionary) {
    const lev: LevenshteinResponse = levenshtein(word, dictWord);
    if (lev.steps < 3 && lev.similarity > 0.6) {
      suggestions.push(dictWord);
    }
  }
  return suggestions;
}
