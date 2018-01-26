
class Match {
    constructor(pattern, name) {
        this.pattern = pattern;
        this.name = name;
    }
}

class Node {
    constructor(val = '') {
        this.value = val;
        this.children = new Map();
    }

    addChild(ch) {
        let node = this.children.get(ch);
        if (!node) {
            node = new Node(ch);
            this.children.set(ch, node);
        }
        return node;
    }
}

// TODO: Compress this suffix tree
export default class SuffixTree {
    constructor(str) {
        if (!str) {
            throw 'string cannot be empty';
        }
        this.root = new Node('', -1);
        this.name = str;
        for (let i = 0; i < str.length; i++) {
            this.addString(str.slice(i).toLowerCase());
        }
    }

    addString(str) {
        if(!str) {
            return;
        }

        let node = this.root;
        for(let i = 0; i < str.length; i++) {
            let ch = str[i];
            node = node.addChild(ch);
        }
    }

    // TODO: The pattern could appear multiple places within a name,
    //       In the future, we might look for all of them and return them
    findPattern(pattern) {
        if(!pattern || pattern.length === 0) {
            return null;
        }
        let orginalPattern = pattern;
        pattern = pattern.toLowerCase();
        let node = this.root;
        for(let i = 0; i < pattern.length; i++) {
            let n = node.children.get(pattern[i]);
            if(!n) {
                return null; // pattern not found
            }
            node = n;
        }
        return new Match(orginalPattern, this.name);
    }
}