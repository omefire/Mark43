/*Write a function that takes in a string and identifies the longest palindrome in that string through any combination of the letters. 

It doesn't need to be real words, the order of the letters does not matter and you can return back any variation of the word which is a palindrome as long as it is the longest.

You can use any language of your choice.

Examples:
racecar -> racecar || craearc || [other variations]
racecarff -> racfefcar || fcraearcf || [other variations]
abbccc -> bcccb || bcacb || [other variations]

1- Identify all possible palindromes that could be formed from the incoming string
2- Find the length of all the possible palindromes gotten from step 1
3- Return the longest 
*/
function getLongestPalindrome(str) {
    if (!str) {
        return null;
    }
    if (str.length === 1) {
        return str;
    }

    let allPalindromes = getAllPalindromes(str);
    if (allPalindromes.length === 0) {
        return null;
    }

    // ToDO: Further test scenarios to run this code throught
    let maxStr = allPalindromes[0];
    let maxLength = maxStr.length;
    for (let i = 1; i < allPalindromes.length; i++) {
        if (allPalindromes[i].length > maxLength) {
            maxStr = allPalindromes[i];
            maxLength = allPalindromes[i].length;
        }
    }

    return maxStr;
}


function getAllPalindromes(str) {
    let allPossibleStrings = getAllSubstringsPermutations(str);
    let results = allPossibleStrings.filter(s => isPalindrome(s));
    return [...new Set(results)];
}

function getAllSubstringsPermutations(str) {
    let i, j, substrings = [];
  
    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            substrings.push(str.slice(i, j));
        }
    }

    let results = [];
    substrings.forEach(s => {
        let allPerms = getAllPossiblePermutations(s);
        allPerms.forEach(s => results.push(s));
    });
    return results;
}

function getAllPossiblePermutations(str) {
    if (!str) {
        return [];
    }
    if (str.length === 1) {
        return [str];
    }

    let results = [];
    for (let i = 0; i < str.length; i++) {
        let s = str[i];
        let perms = getAllPossiblePermutations(replaceAt(str, i, ''));
        perms.forEach(p => {
            results.push(s + p);
        });
    }

    return [...new Set(results)]; // remote duplicates
}

function replaceAt(str, index, replacement) {
    let res = str.substr(0, index) + replacement + str.substr(index + 1);
    return res;
}

function isPalindrome(str) {
    if(!str) {
        return false;
    }
    return str === str.split('').reverse().join('');
}

//console.log(getLongestPalindrome('abba'));
console.log(getLongestPalindrome('racecar'));