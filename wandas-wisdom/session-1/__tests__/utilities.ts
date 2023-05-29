import checkIfIdentical from "../src/utilities/checkIfIdentical";
import chooseUniqueQuote from "../src/utilities/chooseUniqueQuote";
import { mock_quotes } from "../mockups/mock_quotes"
import generateRandomNumber from "../src/utilities/generateRandomNumber";
import makeAllCaps from "../src/utilities/makeAllCaps";
import selectRandomQuote from "../src/utilities/selectRandomQuote";
import sortTags from "../src/utilities/sortTags";

describe("checkIfIdentical", () => {
    test("should return true if both strings are the same", () => {
        expect(checkIfIdentical("blue", "blue")).toBe(true);
    });
    
    test("should return false if the strings are different", () => {
        expect(checkIfIdentical("blue", "red")).toBe(false);
    });
});

describe("chooseUniqueQuote", () => {
    test("should return a valid quote", () => {
        expect(chooseUniqueQuote("", mock_quotes)).not.toBeNull();
    });
    test("should return a different quote", () => {
        expect(chooseUniqueQuote(mock_quotes[0].text, mock_quotes).text).toBe(mock_quotes[1].text);
        expect(chooseUniqueQuote(mock_quotes[0].text, mock_quotes).text).toBe(mock_quotes[1].text);
        expect(chooseUniqueQuote(mock_quotes[1].text, mock_quotes).text).toBe(mock_quotes[0].text);
        expect(chooseUniqueQuote(mock_quotes[1].text, mock_quotes).text).toBe(mock_quotes[0].text);
    });
});

describe("generateRandomNumber", () => {
    test("should return a number in range [0, requested value)", () =>{
        expect(generateRandomNumber(10)).toBeGreaterThanOrEqual(0);
        expect(generateRandomNumber(10)).toBeLessThan(10);
        // what if upper limit is negative or 0?
    });
});

describe("makeAllCaps", () => {
    test("should return fully uppercase string", () => {
        expect(makeAllCaps("the quick brown fox")).toBe("THE QUICK BROWN FOX");
    });
});

describe("selectRandomQuote", () => {
    test("should return a quote", () => {
        expect(selectRandomQuote(mock_quotes)).not.toBeNull();
        expect(selectRandomQuote(mock_quotes).text).toMatch(/test text/i);
    });
});

describe("sortTags", () => {
    test("should return the same tags but sorted in ascending order", () => {
        expect(sortTags(mock_quotes[0].tags)).toBe(mock_quotes[0].tags.sort());
    });
});
