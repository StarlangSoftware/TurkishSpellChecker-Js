export declare class SpellCheckerParameter {
    private threshold;
    private deMiCheck;
    private rootNGram;
    private minWordLength;
    private domain;
    /**
     * Constructs a SpellCheckerParameter object with default values.
     *
     * The default threshold is 0.0, the De-Mi check is enabled, the root ngram is enabled and
     * the minimum word length is 4.
     */
    constructor();
    /**
     * Sets the threshold value used in calculating the n-gram probabilities.
     *
     * @param threshold the threshold for the spell checker
     */
    setThreshold(threshold: number): void;
    /**
     * Enables or disables De-Mi check for the spell checker.
     * @see SimpleSpellChecker#forcedDeDaSplitCheck(Word, Sentence)
     * @see SimpleSpellChecker#forcedQuestionSuffixSplitCheck(Word, Sentence) (Word, Sentence)
     *
     * @param deMiCheck a boolean indicating whether the De-Mi check should be enabled (true) or disabled (false)
     */
    setDeMiCheck(deMiCheck: boolean): void;
    /**
     * Enables or disables the root n-gram for the spell checker.
     *
     * @param rootNGram a boolean indicating whether the root n-gram should be enabled (true) or disabled (false)
     */
    setRootNGram(rootNGram: boolean): void;
    /**
     * Sets the minimum length of words viable for spell checking.
     *
     * @param minWordLength the minimum word length for the spell checker
     */
    setMinWordLength(minWordLength: number): void;
    /**
     * Sets the _domain name to the specified value.
     *
     * @param domain the new _domain name to set for this object
     */
    setDomain(domain: string): void;
    /**
     * Returns the threshold value used in calculating the n-gram probabilities.
     *
     * @return the threshold for the spell checker
     */
    getThreshold(): number;
    /**
     * Returns whether De-Mi check is enabled for the spell checker.
     * @see SimpleSpellChecker#forcedDeDaSplitCheck(Word, Sentence)
     * @see SimpleSpellChecker#forcedQuestionSuffixSplitCheck(Word, Sentence) (Word, Sentence)
     *
     * @return a boolean indicating whether De-Mi check is enabled for the spell checker
     */
    isDeMiCheck(): boolean;
    /**
     * Returns whether the root n-gram is enabled for the spell checker.
     *
     * @return a boolean indicating whether the root n-gram is enabled for the spell checker
     */
    isRootNGram(): boolean;
    /**
     * Returns the minimum length of words viable for spell checking.
     *
     * @return the minimum word length for the spell checker
     */
    getMinWordLength(): number;
    /**
     * Returns the domain name
     *
     * @return the domain name
     */
    getDomain(): string;
}
