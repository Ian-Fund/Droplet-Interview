import { readFileSync } from "fs";
import levenshtein from "damerau-levenshtein";
import { text } from "stream/consumers";
import { string } from "yargs";

// Read the dictionary file and convert it to a map
export function createDictionaryMap(dictionaryData: string): {
  [key: string]: boolean;
} {
  const dictionaryMap: { [key: string]: boolean } = {};
  try {
    const dictionaryList = dictionaryData.replace(/[\r]/g, "").split("\n");

    dictionaryList.forEach((word) => {
      dictionaryMap[word] = true;
    });
  } catch (err) {
    console.error(err);
  }
  return dictionaryMap;
}

export function createWordList(textData: string): string[] {
  let wordList: string[] = [];
  try {
    wordList = textData
      .replace(/[\r]/g, "")
      .replace(/[\n]/g, " ")
      .replace(/[^\w\s]/g, "")
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
  const suggestions: string[] = [];
  for (const dictWord in dictionary) {
    const lev = levenshtein(word, dictWord);
    if (lev.steps < 3 && lev.similarity > 0.6) {
      suggestions.push(dictWord);
    }
  }
  return suggestions;
}

export function getContext(
  misspelledWords: string[],
  wordList: string[]
): [string, string][] {
  const surroundingContext: [string, string][] = [];
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    if (misspelledWords.includes(word)) {
      const startIndex = Math.max(0, i - 2);
      const endIndex = Math.min(i + 2, wordList.length - 1);
      const contextWords = wordList.slice(startIndex, endIndex + 1).join(" ");
      surroundingContext.push([contextWords, word]);
    }
  }
  return surroundingContext;
}

export function findWordPositions(
  textData: string,
  word: string
): { row: number; word: number }[] {
  const wordPositions: { row: number; word: number }[] = [];
  try {
    const lines = textData
      .replace(/[^\w\s]|[\r]/g, "")
      .split("\n")
      .map((line) => line.split(" "));
    for (let row = 0; row < lines.length; row++) {
      const line = lines[row];
      for (let wordindex = 0; wordindex < line.length; wordindex++) {
        if (line[wordindex] === word) {
          wordPositions.push({ row: row + 1, word: wordindex + 1 });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return wordPositions;
}
