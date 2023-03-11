import { Candidate } from "./Candidate";
export declare class TrieCandidate extends Candidate {
    private currentIndex;
    private currentPenalty;
    /**
     * Constructs a TrieCandidate object.
     *
     * @param word the candidate word
     * @param currentIndex the current index of the candidate word
     * @param currentPenalty the currentPenalty associated with the candidate word
     */
    constructor(word: string, currentIndex: number, currentPenalty: number);
    /**
     * Returns the current index of the candidate word.
     *
     * @return the current index of the candidate word
     */
    getCurrentIndex(): number;
    /**
     * Returns the currentPenalty value associated with the candidate word.
     *
     * @return the currentPenalty value associated with the candidate word
     */
    getCurrentPenalty(): number;
    /**
     * Increments the current index of the candidate word by 1.
     */
    nextIndex(): void;
}
