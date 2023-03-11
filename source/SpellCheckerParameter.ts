export class SpellCheckerParameter {

    private threshold: number
    private deMiCheck: boolean
    private rootNGram: boolean
    private minWordLength: number

    /**
     * Constructs a SpellCheckerParameter object with default values.
     *
     * The default threshold is 0.0, the De-Mi check is enabled, the root ngram is enabled and
     * the minimum word length is 4.
     */
    constructor() {
        this.threshold = 0.0
        this.deMiCheck = true
        this.rootNGram = true
        this.minWordLength = 4
    }

    /**
     * Sets the threshold value used in calculating the n-gram probabilities.
     *
     * @param threshold the threshold for the spell checker
     */
    public setThreshold(threshold: number){
        this.threshold = threshold
    }

    /**
     * Enables or disables De-Mi check for the spell checker.
     * @see SimpleSpellChecker#forcedDeDaSplitCheck(Word, Sentence)
     * @see SimpleSpellChecker#forcedQuestionSuffixSplitCheck(Word, Sentence) (Word, Sentence)
     *
     * @param deMiCheck a boolean indicating whether the De-Mi check should be enabled (true) or disabled (false)
     */
    public setDeMiCheck(deMiCheck: boolean){
        this.deMiCheck = deMiCheck
    }

    /**
     * Enables or disables the root n-gram for the spell checker.
     *
     * @param rootNGram a boolean indicating whether the root n-gram should be enabled (true) or disabled (false)
     */
    public setRootNGram(rootNGram: boolean){
        this.rootNGram = rootNGram
    }

    /**
     * Sets the minimum length of words viable for spell checking.
     *
     * @param minWordLength the minimum word length for the spell checker
     */
    public setMinWordLength(minWordLength: number){
        this.minWordLength = minWordLength
    }

    /**
     * Returns the threshold value used in calculating the n-gram probabilities.
     *
     * @return the threshold for the spell checker
     */
    public getThreshold(): number{
        return this.threshold
    }

    /**
     * Returns whether De-Mi check is enabled for the spell checker.
     * @see SimpleSpellChecker#forcedDeDaSplitCheck(Word, Sentence)
     * @see SimpleSpellChecker#forcedQuestionSuffixSplitCheck(Word, Sentence) (Word, Sentence)
     *
     * @return a boolean indicating whether De-Mi check is enabled for the spell checker
     */
    public isDeMiCheck(): boolean{
        return this.deMiCheck
    }

    /**
     * Returns whether the root n-gram is enabled for the spell checker.
     *
     * @return a boolean indicating whether the root n-gram is enabled for the spell checker
     */
    public isRootNGram(): boolean{
        return this.rootNGram
    }

    /**
     * Returns the minimum length of words viable for spell checking.
     *
     * @return the minimum word length for the spell checker
     */
    public getMinWordLength(): number{
        return this.minWordLength
    }

}