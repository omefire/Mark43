
class Match {
    constructor(pattern, name, startingIndex, endingIndex) {
        this.pattern = pattern;
        this.name = name;
        this.startingIndex = startingIndex;
        this.endingIndex = endingIndex;
    }
}

class Node {
    constructor(val = '', index) {
        this.value = val;
        this.children = new Map();
        this.index = index; // position of the character represented by this node within the text
    }

    addChild(ch, index) {
        let node = this.children.get(ch);
        if (!node) {
            node = new Node(ch, index);
            this.children.set(ch, node);
        }
        return node;
    }
}

export default class SuffixTree {
    constructor(str) {
        if (!str) {
            throw 'string cannot be empty';
        }
        this.root = new Node('', -1);
        this.name = str;
        for (let i = 0; i < str.length; i++) {
            this.addString(str.slice(i).toLowerCase(), i);
        }
    }

    addString(str, startIndex) {
        if(!str) {
            return;
        }

        let node = this.root;
        for(let i = 0; i < str.length; i++) {
            let ch = str[i];
            node = node.addChild(ch, i + startIndex);
        }
    }

    // TODO: The pattern could appear multiple places within a name,
    //       In the future, we might look for all of them and return them
    findPattern(pattern) {
        if(!pattern || pattern.length === 0) {
            return null;
        }
        let orginalPattern = pattern;
        let firstNodeMatched = null;
        pattern = pattern.toLowerCase();
        let node = this.root;
        for(let i = 0; i < pattern.length; i++) {
            let n = node.children.get(pattern[i]);
            if(!n) {
                return null; // pattern not found
            }
            if(!firstNodeMatched) {
                firstNodeMatched = n;
            }
            node = n;
        }

        let startingIndex = firstNodeMatched.index;
        return new Match(orginalPattern, this.name, startingIndex, (startingIndex + pattern.length - 1));
    }
}