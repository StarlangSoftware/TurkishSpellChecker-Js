"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrieCandidate = void 0;
const Candidate_1 = require("./Candidate");
const Operator_1 = require("./Operator");
class TrieCandidate extends Candidate_1.Candidate {
    currentIndex;
    currentPenalty;
    /**
     * Constructs a TrieCandidate object.
     *
     * @param word the candidate word
     * @param currentIndex the current index of the candidate word
     * @param currentPenalty the currentPenalty associated with the candidate word
     */
    constructor(word, currentIndex, currentPenalty) {
        super(word, Operator_1.Operator.TRIE_BASED);
        this.currentIndex = currentIndex;
        this.currentPenalty = currentPenalty;
    }
    /**
     * Returns the current index of the candidate word.
     *
     * @return the current index of the candidate word
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
    /**
     * Returns the currentPenalty value associated with the candidate word.
     *
     * @return the currentPenalty value associated with the candidate word
     */
    getCurrentPenalty() {
        return this.currentPenalty;
    }
    /**
     * Increments the current index of the candidate word by 1.
     */
    nextIndex() {
        this.currentIndex += 1;
    }
}
exports.TrieCandidate = TrieCandidate;
//# sourceMappingURL=TrieCandidate.js.map