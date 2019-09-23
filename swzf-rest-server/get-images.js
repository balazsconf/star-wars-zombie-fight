const db = require('./db.json');
const { curly } = require('node-libcurl');
const DOMParser = require('xmldom').DOMParser;
const noop = () => {};
const writeJsonFile = require('write-json-file');
const requestPromiseNative = require('request-promise-native');
const fs = require('fs');

const DOWNLOAD_PATH = './public/';

const getImageFileName = (url) => {
    const parts = url.split('/');
    for ( const part of parts ) {
        if( part.match(/\.jpg|\.jpeg|\.png/) ) {
            return part;
        }
    }
};

async function curlyWithRedirect(url) {
    let redirect = true;
    while(redirect) {
        let { statusCode = 0, data = '<html></html>', headers } = await curly.get(url);
        if ( statusCode === 301 ) {
            url = headers[0].Location;
        } else {
            redirect = false;
            if ( data === '' ) {
                data = '<html></html>';
            }
            return { statusCode, data, headers };
        }
    }
}

async function getSearchResult(name) {
    const searchString = name.replace(/\s+/g, '+');
    const url = `https://starwars.fandom.com/wiki/Special:Search?query=${searchString}`;
    let { statusCode, data = '<html></html>', headers } = await curlyWithRedirect(url);
    return new DOMParser({errorHandler:{warning:noop},error:noop,fatalError:()=>noop}).parseFromString(data, "text/xml");
}

async function getCharacterPageResult(url) {
    let { statusCode, data = '<html></html>', headers } = await curlyWithRedirect(url);
    return new DOMParser({errorHandler:{warning:noop},error:noop,fatalError:()=>noop}).parseFromString(data, "text/xml");
}

function filterForClass(className) {
    return (element) => {
        return element.getAttribute('class') === className;
    }
}

function getElementByNameAndClass(element, name, className) {
    const elements = element.getElementsByTagName(name);
    for (let index = 0 ; index < elements.length ; index++) {
        if ( className === undefined ) {
            return elements[index];
        }
        if ( filterForClass(className)(elements[index]) ) {
            return elements[index];
        }
    }
}

async function getCharacterUrl(character) {
    const searchResult = await getSearchResult(character.name);
    try {
        const ul = getElementByNameAndClass(searchResult.documentElement, 'ul', 'Results');
        const li = getElementByNameAndClass(ul, 'li', 'result');
        const a = getElementByNameAndClass(li, 'a');
        return a.getAttribute('href');
    } catch(e) {
        console.log(e);
    }
}


async function getCharacterImageUrl(url) {
    const characterPageResult = await getCharacterPageResult(url);
    try {
        const figure = getElementByNameAndClass(characterPageResult.documentElement, 'figure');
        const a = getElementByNameAndClass(figure, 'a');
        return a.getAttribute('href');
    } catch(e) {
        console.log(e);
    }
}

async function downloadImage(url, path) {
    const result = await requestPromiseNative({
        uri: url,
        encoding: null
    });
    fs.writeFileSync(path + getImageFileName(url), result, {encoding: "binary"});
}

async function getImage() {
    db.peopleImages = [];
    for ( const character of db.people ) {
        character.name = character.name === 'Captain Phasma' ? 'Phasma' : character.name;
        character.name = character.name === 'Ackbar' ? 'Gial Ackbar' : character.name;
        console.log(`Getting image for ${character.name} ...`);
        const characterUrl = await getCharacterUrl(character);
        const characterImageUrl = await getCharacterImageUrl(characterUrl);
        db.peopleImages.push({
            id: character.id,
            url: characterImageUrl
        });
        console.log(`Downloading ${DOWNLOAD_PATH}${getImageFileName(characterImageUrl)} ...`);
        await downloadImage(characterImageUrl, DOWNLOAD_PATH);
        await writeJsonFile('db-with-images.json', db);
    }

    return 'done.';
}

getImage().then(console.log);

