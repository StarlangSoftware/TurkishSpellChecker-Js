"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextBasedSpellChecker = void 0;
const NGramSpellChecker_1 = require("./NGramSpellChecker");
const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
const Candidate_1 = require("./Candidate");
const Operator_1 = require("./Operator");
class ContextBasedSpellChecker extends NGramSpellChecker_1.NGramSpellChecker {
    contextList;
    /**
     * A constructor of {@link ContextBasedSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer}, an {@link NGram}
     * and a {@link SpellCheckerParameter} as inputs. Then, calls its super class {@link NGramSpellChecker} with given inputs.
     *
     * @param fsm       {@link FsmMorphologicalAnalyzer} type input.
     * @param nGram     {@link NGram} type input.
     * @param parameter {@link SpellCheckerParameter} type input.
     */
    constructor(fsm, nGram, parameter) {
        super(fsm, nGram, parameter);
        this.loadContextDictionaries();
    }
    /**
     * {@inheritDoc}
     * This method also loads context information from a file.
     */
    loadContextDictionaries() {
        this.contextList = new Map();
        let data = this.getFile("context_list.txt");
        let lines = data.split("\n");
        for (let line of lines) {
            let items = line.split("\t");
            if (items.length == 2) {
                let word = items[0];
                let otherWords = items[1].split(" ");
                this.contextList.set(word, otherWords);
            }
        }
    }
    /**
     * Uses context information to generate candidates for a misspelled word.
     * The candidates are the words that are in the context of the neighbouring words of the misspelled word.
     * Uses the {@Link damerauLevenshteinDistance(String, String) method to calculate the distance between the misspelled word and
     * the candidates and to determine whether the candidates are valid.
     *
     * @param word     the misspelled word
     * @param sentence the sentence containing the misspelled word
     * @return an ArrayList of valid candidates for the misspelled word
     */
    candidateList(word, sentence) {
        let words = new Array();
        let candidates = new Set();
        let validCandidates = new Array();
        for (let w of sentence.getWords()) {
            if (w != word) {
                words.push(w);
            }
        }
        for (let w of words) {
            let parses = this.fsm.morphologicalAnalysis(Word_1.Word.toCapital(w.getName()));
            if (parses.size() > 0) {
                let root = parses.getParseWithLongestRootWord().getWord().getName();
                if (this.contextList.has(root)) {
                    for (let s of this.contextList.get(root)) {
                        candidates.add(new Candidate_1.Candidate(s, Operator_1.Operator.CONTEXT_BASED));
                    }
                }
            }
        }
        for (let candidate of candidates) {
            let distance;
            if (candidate.getName().length < 5) {
                distance = 1;
            }
            else {
                if (candidate.getName().length < 7) {
                    distance = 2;
                }
                else {
                    distance = 3;
                }
            }
            if (this.damerauLevenshteinDistance(word.getName(), candidate.getName()) <= distance) {
                validCandidates.push(candidate);
            }
        }
        return validCandidates;
    }
    /**
     * Calculates the Damerau-Levenshtein distance between two strings.
     * This method also allows for the transposition of adjacent characters,
     * which is not possible in a standard Levenshtein distance calculation.
     *
     * @param first  the first string
     * @param second the second string
     * @return the Damerau-Levenshtein distance between the two strings
     */
    damerauLevenshteinDistance(first, second) {
        if (first == null || first.length == 0) {
            return second == null || second.length == 0 ? 0 : second.length;
        }
        if (second == null || second.length == 0) {
            return first.length;
        }
        let firstLength = first.length;
        let secondLength = second.length;
        let distanceMatrix = new Array();
        for (let firstIndex = 0; firstIndex <= firstLength; firstIndex++) {
            distanceMatrix.push(new Array());
            for (let secondIndex = 0; secondIndex <= secondLength; secondIndex++) {
                distanceMatrix[firstIndex].push(0);
            }
        }
        for (let firstIndex = 0; firstIndex <= firstLength; firstIndex++) {
            distanceMatrix[firstIndex][0] = firstIndex;
        }
        for (let secondIndex = 0; secondIndex <= secondLength; secondIndex++) {
            distanceMatrix[0][secondIndex] = secondIndex;
        }
        for (let firstIndex = 1; firstIndex <= firstLength; firstIndex++) {
            for (let secondIndex = 1; secondIndex <= secondLength; secondIndex++) {
                let cost = first.charAt(firstIndex - 1) == second.charAt(secondIndex - 1) ? 0 : 1;
                distanceMatrix[firstIndex][secondIndex] = Math.min(Math.min(distanceMatrix[firstIndex - 1][secondIndex] + 1, distanceMatrix[firstIndex][secondIndex - 1] + 1), distanceMatrix[firstIndex - 1][secondIndex - 1] + cost);
                if (firstIndex == 1 || secondIndex == 1) {
                    continue;
                }
                if (first.charAt(firstIndex - 1) == second.charAt(secondIndex - 2) && first.charAt(firstIndex - 2) == second.charAt(secondIndex - 1)) {
                    distanceMatrix[firstIndex][secondIndex] = Math.min(distanceMatrix[firstIndex][secondIndex], distanceMatrix[firstIndex - 2][secondIndex - 2] + cost);
                }
            }
        }
        return distanceMatrix[firstLength][secondLength];
    }
}
exports.ContextBasedSpellChecker = ContextBasedSpellChecker;
//# sourceMappingURL=ContextBasedSpellChecker.js.map