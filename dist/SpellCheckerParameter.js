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
    exports.SpellCheckerParameter = void 0;
    class SpellCheckerParameter {
        /**
         * Constructs a SpellCheckerParameter object with default values.
         *
         * The default threshold is 0.0, the De-Mi check is enabled, the root ngram is enabled and
         * the minimum word length is 4.
         */
        constructor() {
            this.threshold = 0.0;
            this.deMiCheck = true;
            this.rootNGram = true;
            this.minWordLength = 4;
        }
        /**
         * Sets the threshold value used in calculating the n-gram probabilities.
         *
         * @param threshold the threshold for the spell checker
         */
        setThreshold(threshold) {
            this.threshold = threshold;
        }
        /**
         * Enables or disables De-Mi check for the spell checker.
         * @see SimpleSpellChecker#forcedDeDaSplitCheck(Word, Sentence)
         * @see SimpleSpellChecker#forcedQuestionSuffixSplitCheck(Word, Sentence) (Word, Sentence)
         *
         * @param deMiCheck a boolean indicating whether the De-Mi check should be enabled (true) or disabled (false)
         */
        setDeMiCheck(deMiCheck) {
            this.deMiCheck = deMiCheck;
        }
        /**
         * Enables or disables the root n-gram for the spell checker.
         *
         * @param rootNGram a boolean indicating whether the root n-gram should be enabled (true) or disabled (false)
         */
        setRootNGram(rootNGram) {
            this.rootNGram = rootNGram;
        }
        /**
         * Sets the minimum length of words viable for spell checking.
         *
         * @param minWordLength the minimum word length for the spell checker
         */
        setMinWordLength(minWordLength) {
            this.minWordLength = minWordLength;
        }
        /**
         * Returns the threshold value used in calculating the n-gram probabilities.
         *
         * @return the threshold for the spell checker
         */
        getThreshold() {
            return this.threshold;
        }
        /**
         * Returns whether De-Mi check is enabled for the spell checker.
         * @see SimpleSpellChecker#forcedDeDaSplitCheck(Word, Sentence)
         * @see SimpleSpellChecker#forcedQuestionSuffixSplitCheck(Word, Sentence) (Word, Sentence)
         *
         * @return a boolean indicating whether De-Mi check is enabled for the spell checker
         */
        isDeMiCheck() {
            return this.deMiCheck;
        }
        /**
         * Returns whether the root n-gram is enabled for the spell checker.
         *
         * @return a boolean indicating whether the root n-gram is enabled for the spell checker
         */
        isRootNGram() {
            return this.rootNGram;
        }
        /**
         * Returns the minimum length of words viable for spell checking.
         *
         * @return the minimum word length for the spell checker
         */
        getMinWordLength() {
            return this.minWordLength;
        }
    }
    exports.SpellCheckerParameter = SpellCheckerParameter;
});
//# sourceMappingURL=SpellCheckerParameter.js.map