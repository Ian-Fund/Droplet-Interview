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
      if (!misspelledWords.includes(wordList[i])) {
        misspelledWords.push(wordList[i]);
      }
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

export function getContext(
  misspelledWords: string[],
  wordList: string[]
): string[] {
  const surroundingContext: string[] = [];
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    if (misspelledWords.includes(word)) {
      const startIndex = Math.max(0, i - 2);
      const endIndex = Math.min(i + 2, wordList.length - 1);
      const contextWords = wordList.slice(startIndex, endIndex + 1).join(" ");
      surroundingContext.push(contextWords);
    }
  }
  return surroundingContext;
}

export function findWordPositions(
  filePath: string,
  word: string
): { row: number; column: number }[] {
  const wordPositions: { row: number; column: number }[] = [];
  try {
    const data = readFileSync(filePath, "utf8");
    const lines = data
      .replace(/[^\w\s]|[\r]/g, "")
      .split("\n")
      .map((line) => line.split(" "));
    for (let row = 0; row < lines.length; row++) {
      const line = lines[row];
      for (let column = 0; column < line.length; column++) {
        if (line[column] === word) {
          wordPositions.push({ row: row + 1, column: column + 1 });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return wordPositions;
}
