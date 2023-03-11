export class TrieNode {

    private readonly children: Map<string, TrieNode>
    private _isWord: boolean

    /**
     * A constructor of {@link TrieNode} class which constructs a new TrieNode with an empty children HashMap
     */
    constructor() {
        this.children = new Map<string, TrieNode>()
        this._isWord = false
    }

    /**
     * Returns the child TrieNode with the given character as its value.
     * @param ch The character value of the child TrieNode.
     * @return TrieNode with the given character value.
     */
    getChild(ch: string): TrieNode{
        return this.children.get(ch)
    }

    addChild(ch: string, child: TrieNode){
        this.children.set(ch, child)
    }

    childrenToString(): string{
        let result = ""
        for (let ch of this.children.keys()){
            result = result + ch
        }
        return result
    }

    /**
     * Returns whether the current TrieNode represents the end of a word.
     * @return true if the current TrieNode represents the end of a word, false otherwise.
     */
    isWord(): boolean{
        return this._isWord
    }

    /**
     * Sets whether the current TrieNode represents the end of a word.
     * @param isWord true if the current TrieNode represents the end of a word, false otherwise.
     */
    setIsWord(isWord: boolean){
        this._isWord = isWord
    }
}