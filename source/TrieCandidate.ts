import {Candidate} from "./Candidate";
import {Operator} from "./Operator";

export class TrieCandidate extends Candidate {

    private currentIndex: number
    private currentPenalty: number

    /**
     * Constructs a TrieCandidate object.
     *
     * @param word the candidate word
     * @param currentIndex the current index of the candidate word
     * @param currentPenalty the currentPenalty associated with the candidate word
     */
    constructor(word: string, currentIndex: number, currentPenalty: number) {
        super(word, Operator.TRIE_BASED)
        this.currentIndex = currentIndex
        this.currentPenalty = currentPenalty
    }

    /**
     * Returns the current index of the candidate word.
     *
     * @return the current index of the candidate word
     */
    getCurrentIndex(): number{
        return this.currentIndex
    }

    /**
     * Returns the currentPenalty value associated with the candidate word.
     *
     * @return the currentPenalty value associated with the candidate word
     */
    getCurrentPenalty(): number{
        return this.currentPenalty
    }

    /**
     * Increments the current index of the candidate word by 1.
     */
    nextIndex(){
        this.currentIndex += 1
    }
}