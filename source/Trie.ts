import {TrieNode} from "./TrieNode";

export class Trie {

    private readonly rootNode: TrieNode

    /**
     * A constructor of {@link Trie} class which constructs a new Trie with an empty root node
     */
    constructor() {
        this.rootNode = new TrieNode()
    }

    /**
     * Inserts a new word into the Trie
     *
     * @param word The word to be inserted
     */
    insert(word: string){
        let currentNode = this.rootNode
        for (let i = 0; i < word.length; i++) {
            let character = word.charAt(i)
            if (currentNode.getChild(character) == undefined) {
                currentNode.addChild(character, new TrieNode())
            }
            currentNode = currentNode.getChild(character)
        }
        currentNode.setIsWord(true)
    }

    /**
     * Checks if a word is in the Trie
     *
     * @param word The word to be searched for
     * @return true if the word is in the Trie, false otherwise
     */
    search(word: string): boolean{
        let node = this.getTrieNode(word.toLocaleLowerCase("tr"))
        if (node == null) {
            return false
        } else {
            return node.isWord()
        }
    }

    /**
     * Checks if a given prefix exists in the Trie
     *
     * @param prefix The prefix to be searched for
     * @return true if the prefix exists, false otherwise
     */
    startsWith(prefix: string): boolean{
        if (this.getTrieNode(prefix.toLocaleLowerCase("tr")) == null) {
            return false
        } else {
            return true
        }
    }

    /**
     * Returns the TrieNode corresponding to the last character of a given word
     *
     * @param word The word to be searched for
     * @return The TrieNode corresponding to the last character of the word
     */
    getTrieNode(word: string): TrieNode{
        let currentNode = this.rootNode
        for (let i = 0; i < word.length; i++) {
            let character = word.charAt(i)
            if (currentNode.getChild(character) == null) {
                return null
            }
            currentNode = currentNode.getChild(character)
        }
        return currentNode
    }
}