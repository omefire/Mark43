import faker from 'faker';
import { map, range } from 'lodash';
import SuffixTree from './SuffixTree';

/**
 * List of all names 
 */
const ALL_NAMES = generateData();
function generateData(count = 10000) {
    return map(range(count), () => {
        return faker.name.findName();
    });
}

/**
 * Use this function to filter the results you want to return to the client.
 * Any edits to this file should only be made in the body of this function,
 * unless you have some really good reason to make other changes
 * @param  {String} input       user input
 * @return {String[]}           Filtered names
 */
function filterNames(input) {
    let matches = [];
    for (let i = 0; i < ALL_NAMES.length; i++) {
        let st = SUFFIX_TREES[i];
        let match = st.findPattern(input);
        if (match) {
            matches.push(match);
        }
    }
    return matches;
}

/**
 * Mock server to return list of names
 * @param  {String} input   user input 
 * @param  {Function} cb    callback
 */
export function getNames(input, cb) {
    if (!ALL_NAMES_PROCESSED) {
        processNames();
    }
    return cb(filterNames(input));
};


// TODO: Use promises insted of callback ?
// Process all the names and store them in suffix trees to make pattern searching faster
let ALL_NAMES_PROCESSED = false;
let SUFFIX_TREES = [];
function processNames() {
    for (let i = 0; i < ALL_NAMES.length; i++) {
        SUFFIX_TREES.push(new SuffixTree(ALL_NAMES[i]));
    }
    ALL_NAMES_PROCESSED = true;
}
