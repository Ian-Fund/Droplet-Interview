import { createDictionaryMap, createWordList } from "./utils";
import * as fs from "fs";

describe("createDictionaryMap", () => {
  it("should create a dictionary map", () => {
    const mockData = "wordA\nwordB\nwordC";
    const result = createDictionaryMap(mockData);
    expect(result).toEqual({ wordA: true, wordB: true, wordC: true });
  });
  it("should strip carriage returns", () => {
    const mockData = "wordA\nwordB\r\nwordC";
    const result = createDictionaryMap(mockData);
    expect(result).toEqual({ wordA: true, wordB: true, wordC: true });
  });
});

describe("createWordList", () => {
  it("should create word list", () => {
    const mockData = "wordA wordB wordC";
    const result = createWordList(mockData);
    expect(result).toEqual(["wordA", "wordB", "wordC"]);
  });
  it("should strip newlines and carriage returns", () => {
    const mockData = "wordA\nwordB\r\nwordC";
    const result = createWordList(mockData);
    expect(result).toEqual(["wordA", "wordB", "wordC"]);
  });
  it("removes puncuation", () => {
    const mockData = "wordA, wordB. wordC!";
    const result = createWordList(mockData);
    expect(result).toEqual(["wordA", "wordB", "wordC"]);
  });
});
