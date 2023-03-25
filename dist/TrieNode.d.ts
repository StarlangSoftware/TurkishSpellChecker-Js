export declare class TrieNode {
    private readonly children;
    private _isWord;
    /**
     * A constructor of {@link TrieNode} class which constructs a new TrieNode with an empty children HashMap
     */
    constructor();
    /**
     * Returns the child TrieNode with the given character as its value.
     * @param ch The character value of the child TrieNode.
     * @return TrieNode with the given character value.
     */
    getChild(ch: string): TrieNode;
    /**
     * Adds a child TrieNode to the current TrieNode instance.
     *
     * @param ch the character key of the child node to be added.
     * @param child the TrieNode object to be added as a child.
     */
    addChild(ch: string, child: TrieNode): void;
    /**
     * Returns a string representation of the keys of all child TrieNodes of the current TrieNode instance.
     *
     * @return a string of characters representing the keys of all child TrieNodes.
     */
    childrenToString(): string;
    /**
     * Returns whether the current TrieNode represents the end of a word.
     * @return true if the current TrieNode represents the end of a word, false otherwise.
     */
    isWord(): boolean;
    /**
     * Sets whether the current TrieNode represents the end of a word.
     * @param isWord true if the current TrieNode represents the end of a word, false otherwise.
     */
    setIsWord(isWord: boolean): void;
}
