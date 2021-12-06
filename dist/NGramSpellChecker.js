(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SimpleSpellChecker", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NGramSpellChecker = void 0;
    const SimpleSpellChecker_1 = require("./SimpleSpellChecker");
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class NGramSpellChecker extends SimpleSpellChecker_1.SimpleSpellChecker {
        /**
         * A constructor of {@link NGramSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} and an {@link NGram}
         * as inputs. Then, calls its super class {@link SimpleSpellChecker} with given {@link FsmMorphologicalAnalyzer} and
         * assigns given {@link NGram} to the nGram variable.
         *
         * @param fsm   {@link FsmMorphologicalAnalyzer} type input.
         * @param nGram {@link NGram} type input.
         * @param rootNGram This parameter must be true, if the nGram is NGram generated from the root words; false otherwise.
         */
        constructor(fsm, nGram, rootNGram) {
            super(fsm);
            this.threshold = 0.0;
            this.rootNGram = rootNGram;
            this.nGram = nGram;
        }
        /**
         * Checks the morphological analysis of the given word in the given index. If there is no misspelling, it returns
         * the longest root word of the possible analyses.
         * @param sentence Sentence to be analyzed.
         * @param index Index of the word
         * @return If the word is misspelled, null; otherwise the longest root word of the possible analyses.
         */
        checkAnalysisAndSetRoot(sentence, index) {
            if (index < sentence.wordCount()) {
                let fsmParses = this.fsm.morphologicalAnalysis(sentence.getWord(index).getName());
                if (fsmParses.size() != 0) {
                    if (this.rootNGram) {
                        return fsmParses.getParseWithLongestRootWord().getWord();
                    }
                    else {
                        return sentence.getWord(index);
                    }
                }
            }
            return undefined;
        }
        setThreshold(threshold) {
            this.threshold = threshold;
        }
        getProbability(word1, word2) {
            return this.nGram.getProbability(word1, word2);
        }
        /**
         * The spellCheck method takes a {@link Sentence} as an input and loops i times where i ranges from 0 to size of words in given sentence.
         * Then, it calls morphologicalAnalysis method with each word and assigns it to the {@link FsmParseList}, if the size of
         * {@link FsmParseList} is equal to the 0, it adds current word to the candidateList and assigns it to the candidates {@link Array}.
         * <p>
         * Later on, it loops through candidates {@link Array} and calls morphologicalAnalysis method with each word and
         * assigns it to the {@link FsmParseList}. Then, it gets the root from {@link FsmParseList}. For the first time, it defines a previousRoot
         * by calling getProbability method with root, and for the following times it calls getProbability method with previousRoot and root.
         * Then, it finds out the best probability and the corresponding candidate as best candidate and adds it to the result {@link Sentence}.
         * <p>
         * If the size of {@link FsmParseList} is not equal to 0, it directly adds the current word to the result {@link Sentence} and finds
         * the previousRoot directly from the {@link FsmParseList}.
         *
         * @param sentence {@link Sentence} type input.
         * @return Sentence result.
         */
        spellCheck(sentence) {
            let previousRoot = undefined;
            let result = new Sentence_1.Sentence();
            let root = this.checkAnalysisAndSetRoot(sentence, 0);
            let nextRoot = this.checkAnalysisAndSetRoot(sentence, 1);
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                if (root == undefined) {
                    let candidates = this.candidateList(word);
                    let bestCandidate = word.getName();
                    let bestRoot = word;
                    let bestProbability = this.threshold;
                    for (let candidate of candidates) {
                        let fsmParses = this.fsm.morphologicalAnalysis(candidate);
                        if (this.rootNGram) {
                            root = fsmParses.getParseWithLongestRootWord().getWord();
                        }
                        else {
                            root = new Word_1.Word(candidate);
                        }
                        let previousProbability;
                        if (previousRoot != null) {
                            previousProbability = this.getProbability(previousRoot.getName(), root.getName());
                        }
                        else {
                            previousProbability = 0.0;
                        }
                        let nextProbability;
                        if (nextRoot != undefined) {
                            nextProbability = this.getProbability(root.getName(), nextRoot.getName());
                        }
                        else {
                            nextProbability = 0.0;
                        }
                        if (Math.max(previousProbability, nextProbability) > bestProbability) {
                            bestCandidate = candidate;
                            bestRoot = root;
                            bestProbability = Math.max(previousProbability, nextProbability);
                        }
                    }
                    root = bestRoot;
                    result.addWord(new Word_1.Word(bestCandidate));
                }
                else {
                    result.addWord(word);
                }
                previousRoot = root;
                root = nextRoot;
                nextRoot = this.checkAnalysisAndSetRoot(sentence, i + 2);
            }
            return result;
        }
    }
    exports.NGramSpellChecker = NGramSpellChecker;
});
//# sourceMappingURL=NGramSpellChecker.js.map