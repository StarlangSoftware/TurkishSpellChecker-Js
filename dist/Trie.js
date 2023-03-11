(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TrieNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Trie = void 0;
    const TrieNode_1 = require("./TrieNode");
    class Trie {
        /**
         * A constructor of {@link Trie} class which constructs a new Trie with an empty root node
         */
        constructor() {
            this.rootNode = new TrieNode_1.TrieNode();
        }
        /**
         * Inserts a new word into the Trie
         *
         * @param word The word to be inserted
         */
        insert(word) {
            let currentNode = this.rootNode;
            for (let i = 0; i < word.length; i++) {
                let character = word.charAt(i);
                if (currentNode.getChild(character) == undefined) {
                    currentNode.addChild(character, new TrieNode_1.TrieNode());
                }
                currentNode = currentNode.getChild(character);
            }
            currentNode.setIsWord(true);
        }
        /**
         * Checks if a word is in the Trie
         *
         * @param word The word to be searched for
         * @return true if the word is in the Trie, false otherwise
         */
        search(word) {
            let node = this.getTrieNode(word.toLocaleLowerCase("tr"));
            if (node == null) {
                return false;
            }
            else {
                return node.isWord();
            }
        }
        /**
         * Checks if a given prefix exists in the Trie
         *
         * @param prefix The prefix to be searched for
         * @return true if the prefix exists, false otherwise
         */
        startsWith(prefix) {
            if (this.getTrieNode(prefix.toLocaleLowerCase("tr")) == null) {
                return false;
            }
            else {
                return true;
            }
        }
        /**
         * Returns the TrieNode corresponding to the last character of a given word
         *
         * @param word The word to be searched for
         * @return The TrieNode corresponding to the last character of the word
         */
        getTrieNode(word) {
            let currentNode = this.rootNode;
            for (let i = 0; i < word.length; i++) {
                let character = word.charAt(i);
                if (currentNode.getChild(character) == null) {
                    return null;
                }
                currentNode = currentNode.getChild(character);
            }
            return currentNode;
        }
    }
    exports.Trie = Trie;
});
//# sourceMappingURL=Trie.js.map