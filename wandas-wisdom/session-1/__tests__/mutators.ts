/**
 * @jest-environment jsdom
 */
import displayRandomQuote from "../src/mutators/displayRandomQuote";
import replaceTags from "../src/mutators/replaceTags";
import { Quote } from "../src/data/quotes";
import { mock_quotes } from "../mockups/mock_quotes";

//mock functions
jest.mock('../src/utilities/chooseUniqueQuote', () => ({
    default: jest.fn((oldQuote: string, quotes: Quote[]): Quote => {
        return mock_quotes[0];
    }),
}));

jest.mock('../src/utilities/makeAllCaps', () => ({
    default: jest.fn((str: string): string => {
        return str.toUpperCase();
    }),
}));

jest.mock('../src/utilities/sortTags', () => ({
    default: jest.fn((tags: string[]): string[] => {
        return tags.sort();
    }),
}));

describe("replaceTags", () => {
    test("should remove current tags and add new tags to dom", () => {
        document.body.innerHTML = `
        <section id="quote">
            <article id="text"></article>
            <p id="byline">—
                <span id="author"></span>
            </p>
            <div id="tags">
                <span>five</span>
                <span>six</span>
                <span>seven</span>
                <span>eight</span>
                <span>nine</span>
            </div>
        </section>
        `
        const tagsDiv: HTMLDivElement = document.querySelector("#tags") as HTMLDivElement;
        expect(tagsDiv.childElementCount).toBe(5);
        replaceTags(mock_quotes[0].tags);
        expect(tagsDiv.childElementCount).toBe(4);
        const tagsDivChildren: NodeListOf<HTMLSpanElement> = document.querySelectorAll("#tags > span");
        expect(tagsDivChildren.length).toBe(4);
        expect(tagsDivChildren[0].innerText).toBe("one");
        expect(tagsDivChildren[1].innerText).toBe("two");
        expect(tagsDivChildren[2].innerText).toBe("three");
        expect(tagsDivChildren[3].innerText).toBe("four");
    });

    test("should throw error if 'tags' div not found in DOM", () => {
        document.body.innerHTML = `
        <section id="quote">
            <article id="text"></article>
            <p id="byline">—
                <span id="author"></span>
            </p>
            <div></div>
        </section>
        `
        expect(() => {replaceTags(mock_quotes[0].tags)}).toThrowError();
    });
});

describe("displayRandomQuote", () => {
    test("should update DOM with a new quote", () => {
        document.body.innerHTML = `
        <section id="quote">
            <article id="text"></article>
            <p id="byline">—
                <span id="author"></span>
            </p>
            <div id="tags"></div>
        </section>
        `
        displayRandomQuote();
        const textArticle: HTMLElement | null = document.querySelector('#text') as HTMLElement;
        const authorP: HTMLElement | null = document.querySelector('#author');
        expect(textArticle?.innerText).toBe(mock_quotes[0].text);
        expect(authorP?.innerText).toBe(mock_quotes[0].author.toUpperCase());
    });
    
    test("should throw error if 'text' or 'author' elements are not found in DOM", () => {
        document.body.innerHTML = `
        <section id="quote">
            <article></atricle>
            <p>
                <span></span>
            </p>
            <div></div>
        </section>
        `
        expect(() => {displayRandomQuote()}).toThrowError();

    });
});

