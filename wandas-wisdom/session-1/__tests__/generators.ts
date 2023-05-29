/**
 * @jest-environment jsdom
 */

import createHeading from '../src/generators/createHeading'
import createButton from '../src/generators/createButton'
import createQuoteSection from '../src/generators/createQuoteSection'
import createDescription from '../src/generators/createDescription'
import title from '../src/data/title'
import buttonText from '../src/data/buttonText'
import description from '../src/data/description'
import displayRandomQuote from '../src/mutators/displayRandomQuote'

jest.mock("../src/mutators/displayRandomQuote", () => ({
    default: jest.fn(() => {
        const body: HTMLBodyElement | null = document.querySelector('body');
        const newPtag: HTMLParagraphElement = document.createElement('p');
        newPtag.innerText = 'displayed';
        newPtag.id = "displayed";
        body?.appendChild(newPtag);
        return 'displayed';
    }),
}));

beforeEach(() => {
    document.body.innerHTML = ``;
});

describe("createHeading", () => {
    test("should return an HTML h1 with the title from ../src/data/title.ts", () => {
        expect(createHeading().innerText).toBe(title);
    });
});

describe("createButton", () => {
    test("should return an html button with the buttonText from ../src/data/buttonText.ts", () => {
        expect(createButton().innerText).toBe(buttonText);
    });

    test("should call 'displayRandomQuote' when clicked", () => {
        document.body.innerHTML = ``;

        const button: HTMLButtonElement = createButton();
        const body = document.querySelector('body') as HTMLBodyElement;
        body.appendChild(button);
        const btn: HTMLButtonElement | null = document.querySelector('button');
        expect(btn).not.toBe(null);
        btn?.click();
        expect(displayRandomQuote).toHaveBeenCalled();
        const pTag: HTMLParagraphElement | null = document.querySelector('#displayed');  
        expect(pTag).not.toBe(null);
        expect(pTag?.innerText).toBe('displayed');

    });
});

describe("createQuoteSection", () => {
    test("should return an html section containing: article, p(with a span), and a div with id's", () => {
        const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;
        const secEl: HTMLElement = createQuoteSection();
        expect(secEl.id).toBe('quote');
        expect(secEl.childElementCount).toBe(3);
        expect(secEl.childNodes.item(0).nodeName).toBe('ARTICLE');
        expect(secEl.childNodes.item(1).nodeName).toBe('P');
        expect(secEl.childNodes.item(2).nodeName).toBe('DIV');
        expect(secEl.childNodes.item(1).hasChildNodes()).toBe(true);
        expect(secEl.childNodes.item(1).childNodes.item(0).nodeName).toBe('SPAN');
        body.appendChild(secEl);
        expect(document.querySelector('#text')).not.toBeNull();
        expect(document.querySelector('#byline')).not.toBeNull();
        expect(document.querySelector('#author')).not.toBeNull();
        expect(document.querySelector('#tags')).not.toBeNull();
        expect((document.querySelector('#byline') as HTMLParagraphElement)?.innerText).toBe('—');        
    });
});

describe("createDescription", () => {
    test("should return an html p element with the text from ../src/data/description.ts", () => {
        expect(createDescription().innerText).toBe(description);
    });
});

