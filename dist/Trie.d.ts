import { TrieNode } from "./TrieNode";
export declare class Trie {
    private readonly rootNode;
    /**
     * A constructor of {@link Trie} class which constructs a new Trie with an empty root node
     */
    constructor();
    /**
     * Inserts a new word into the Trie
     *
     * @param word The word to be inserted
     */
    insert(word: string): void;
    /**
     * Checks if a word is in the Trie
     *
     * @param word The word to be searched for
     * @return true if the word is in the Trie, false otherwise
     */
    search(word: string): boolean;
    /**
     * Checks if a given prefix exists in the Trie
     *
     * @param prefix The prefix to be searched for
     * @return true if the prefix exists, false otherwise
     */
    startsWith(prefix: string): boolean;
    /**
     * Returns the TrieNode corresponding to the last character of a given word
     *
     * @param word The word to be searched for
     * @return The TrieNode corresponding to the last character of the word
     */
    getTrieNode(word: string): TrieNode;
}
