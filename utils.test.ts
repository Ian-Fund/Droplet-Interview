import { createDictionaryMap } from "./utils";
import * as fs from "fs";

describe("createDictionaryMap", () => {
  it("should create a dictionary map", () => {
    const mockData = "word1\nword2\nword3";
    const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
    readFileSyncSpy.mockReturnValue(mockData);

    const result = createDictionaryMap("path/to/dictionary");
    expect(result).toEqual({ word1: true, word2: true, word3: true });
    expect(readFileSyncSpy).toHaveBeenCalledWith("path/to/dictionary", "utf-8");

    readFileSyncSpy.mockRestore();
  });

  it("should create a different dictionary map", () => {
    const mockData = "word4\nword5\nword6";
    const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
    readFileSyncSpy.mockReturnValue(mockData);

    const result = createDictionaryMap("path/to/dictionary");
    expect(result).toEqual({ word4: true, word5: true, word6: true });
    expect(readFileSyncSpy).toHaveBeenCalledWith("path/to/dictionary", "utf-8");

    readFileSyncSpy.mockRestore();
  });
});
