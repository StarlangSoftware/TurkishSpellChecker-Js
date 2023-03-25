(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrieNode = void 0;
    class TrieNode {
        /**
         * A constructor of {@link TrieNode} class which constructs a new TrieNode with an empty children HashMap
         */
        constructor() {
            this.children = new Map();
            this._isWord = false;
        }
        /**
         * Returns the child TrieNode with the given character as its value.
         * @param ch The character value of the child TrieNode.
         * @return TrieNode with the given character value.
         */
        getChild(ch) {
            return this.children.get(ch);
        }
        /**
         * Adds a child TrieNode to the current TrieNode instance.
         *
         * @param ch the character key of the child node to be added.
         * @param child the TrieNode object to be added as a child.
         */
        addChild(ch, child) {
            this.children.set(ch, child);
        }
        /**
         * Returns a string representation of the keys of all child TrieNodes of the current TrieNode instance.
         *
         * @return a string of characters representing the keys of all child TrieNodes.
         */
        childrenToString() {
            let result = "";
            for (let ch of this.children.keys()) {
                result = result + ch;
            }
            return result;
        }
        /**
         * Returns whether the current TrieNode represents the end of a word.
         * @return true if the current TrieNode represents the end of a word, false otherwise.
         */
        isWord() {
            return this._isWord;
        }
        /**
         * Sets whether the current TrieNode represents the end of a word.
         * @param isWord true if the current TrieNode represents the end of a word, false otherwise.
         */
        setIsWord(isWord) {
            this._isWord = isWord;
        }
    }
    exports.TrieNode = TrieNode;
});
//# sourceMappingURL=TrieNode.js.map