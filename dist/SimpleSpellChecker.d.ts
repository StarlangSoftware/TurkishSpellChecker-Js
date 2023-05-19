import { SpellChecker } from "./SpellChecker";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { Candidate } from "./Candidate";
import { SpellCheckerParameter } from "./SpellCheckerParameter";
export declare class SimpleSpellChecker implements SpellChecker {
    protected fsm: FsmMorphologicalAnalyzer;
    protected parameter: SpellCheckerParameter;
    protected mergedWords: Map<string, string>;
    protected splitWords: Map<string, string>;
    private shortcuts;
    private conditionalShortcuts;
    private questionSuffixList;
    /**
     * The generateCandidateList method takes a String as an input. Firstly, it creates a String consists of lowercase Turkish letters
     * and an {@link Array} candidates. Then, it loops i times where i ranges from 0 to the length of given word. It gets substring
     * from 0 to ith index and concatenates it with substring from i+1 to the last index as a new String called deleted. Then, adds
     * this String to the candidates {@link Array}. Secondly, it loops j times where j ranges from 0 to length of
     * lowercase letters String and adds the jth character of this String between substring of given word from 0 to ith index
     * and the substring from i+1 to the last index, then adds it to the candidates {@link Array}. Thirdly, it loops j
     * times where j ranges from 0 to length of lowercase letters String and adds the jth character of this String between
     * substring of given word from 0 to ith index and the substring from i to the last index, then adds it to the candidates {@link Array}.
     *
     * @param word String input.
     * @return ArrayList candidates.
     */
    generateCandidateList(word: string): Array<Candidate>;
    /**
     * The candidateList method takes a {@link Word} as an input and creates a candidates {@link Array} by calling generateCandidateList
     * method with given word. Then, it loop i times where i ranges from 0 to size of candidates {@link Array} and creates a
     * {@link FsmParseList} by calling morphologicalAnalysis with each item of candidates {@link Array}. If the size of
     * {@link FsmParseList} is 0, it then removes the ith item.
     *
     * @param word Word input.
     * @param sentence Sentence input.
     * @return candidates {@link Array}.
     */
    candidateList(word: Word, sentence: Sentence): Array<Candidate>;
    /**
     * A constructor of {@link SimpleSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} as an input and
     * assigns it to the fsm variable.
     *
     * @param fsm {@link FsmMorphologicalAnalyzer} type input.
     * @param parameter {@link SpellCheckerParameter} type input.
     */
    constructor(fsm: FsmMorphologicalAnalyzer, parameter?: SpellCheckerParameter);
    getFile(fileName: string): string;
    /**
     * The spellCheck method takes a {@link Sentence} as an input and loops i times where i ranges from 0 to size of words in given sentence.
     * Then, it calls morphologicalAnalysis method with each word and assigns it to the {@link FsmParseList}, if the size of
     * {@link FsmParseList} is equal to the 0, it adds current word to the candidateList and assigns it to the candidates {@link Array}.
     * if the size of candidates greater than 0, it generates a random number and selects an item from candidates {@link Array} with
     * this random number and assign it as newWord. If the size of candidates is not greater than 0, it directly assigns the
     * current word as newWord. At the end, it adds the newWord to the result {@link Sentence}.
     *
     * @param sentence {@link Sentence} type input.
     * @return Sentence result.
     */
    spellCheck(sentence: Sentence): Sentence;
    /**
     * Checks if the given word is a misspelled word according to the misspellings list,
     * and if it is, then replaces it with its correct form in the given sentence.
     *
     * @param word   the {@link Word} to check for misspelling
     * @param result the {@link Sentence} that the word belongs to
     * @return true if the word was corrected, false otherwise
     */
    protected forcedMisspellCheck(word: Word, result: Sentence): boolean;
    /**
     * Checks if the given word and its preceding word need to be merged according to the merged list.
     * If the merge is needed, the word and its preceding word are replaced with their merged form in the given sentence.
     *
     * @param word         the {@link Word} to check for merge
     * @param result       the {@link Sentence} that the word belongs to
     * @param previousWord the preceding {@link Word} of the given {@link Word}
     * @return true if the word was merged, false otherwise
     */
    protected forcedBackwardMergeCheck(word: Word, result: Sentence, previousWord: Word): boolean;
    /**
     * Checks if the given word and its next word need to be merged according to the merged list.
     * If the merge is needed, the word and its next word are replaced with their merged form in the given sentence.
     *
     * @param word     the {@link Word} to check for merge
     * @param result   the {@link Sentence} that the word belongs to
     * @param nextWord the next {@link Word} of the given {@link Word}
     * @return true if the word was merged, false otherwise
     */
    protected forcedForwardMergeCheck(word: Word, result: Sentence, nextWord: Word): boolean;
    /**
     * Given a multiword form, splits it and adds it to the given sentence.
     *
     * @param multiWord multiword form to split
     * @param result    the {@link Sentence} to add the split words to
     */
    protected addSplitWords(multiWord: string, result: Sentence): void;
    /**
     * Checks if the given word needs to be split according to the split list.
     * If the split is needed, the word is replaced with its split form in the given sentence.
     *
     * @param word   the {@link Word} to check for split
     * @param result the {@link Sentence} that the word belongs to
     * @return true if the word was split, false otherwise
     */
    protected forcedSplitCheck(word: Word, result: Sentence): boolean;
    /**
     * Checks if the given word is a shortcut form, such as "5kg" or "2.5km".
     * If it is, it splits the word into its number and unit form and adds them to the given sentence.
     *
     * @param word   the {@link Word} to check for shortcut split
     * @param result the {@link Sentence} that the word belongs to
     * @return true if the word was split, false otherwise
     */
    protected forcedShortcutCheck(word: Word, result: Sentence): boolean;
    /**
     * Checks if the given word has a "da" or "de" suffix that needs to be split according to a predefined set of rules.
     * If the split is needed, the word is replaced with its bare form and "da" or "de" in the given sentence.
     *
     * @param word   the {@link Word} to check for "da" or "de" split
     * @param result the {@link Sentence} that the word belongs to
     * @return true if the word was split, false otherwise
     */
    protected forcedDeDaSplitCheck(word: Word, result: Sentence): boolean;
    /**
     * Checks if the given word is a suffix like 'li' or 'lik' that needs to be merged with its preceding word which is a number.
     * If the merge is needed, the word and its preceding word are replaced with their merged form in the given sentence.
     *
     * @param word         the {@link Word} to check for merge
     * @param result     the {@link Sentence} that the word belongs to
     * @param previousWord the preceding {@link Word} of the given {@link Word}
     * @return true if the word was merged, false otherwise
     */
    protected forcedSuffixMergeCheck(word: Word, result: Sentence, previousWord: Word): boolean;
    /**
     * Checks whether the next word and the previous word can be merged if the current word is a hyphen,
     * an en-dash or an em-dash.
     * If the previous word and the next word exist and they are valid words,
     * it merges the previous word and the next word into a single word and add the new word to the sentence
     * If the merge is valid, it returns true.
     *
     * @param word         current {@link Word}
     * @param result       the {@link Sentence} that the word belongs to
     * @param previousWord the {@link Word} before current word
     * @param nextWord     the {@link Word} after current word
     * @return true if merge is valid, false otherwise
     */
    protected forcedHyphenMergeCheck(word: Word, result: Sentence, previousWord: Word, nextWord: Word): boolean;
    /**
     * Checks whether the current word ends with a valid question suffix and split it if it does.
     * It splits the word with the question suffix and adds the two new words to the sentence.
     * If the split is valid, it returns true.
     *
     * @param word   current {@link Word}
     * @param result the {@link Sentence} that the word belongs to
     * @return true if split is valid, false otherwise
     */
    protected forcedQuestionSuffixSplitCheck(word: Word, result: Sentence): boolean;
    /**
     * Checks whether the given {@link Word} can be split into a proper noun and a suffix, with an apostrophe in between
     * and adds the split result to the {@link Sentence} if it's valid.
     *
     * @param word the {@link Word} to check for forced suffix split.
     * @param result the {@link Sentence} that the word belongs to
     * @return true if the split is successful, false otherwise.
     */
    protected forcedSuffixSplitCheck(word: Word, result: Sentence): boolean;
    /**
     * Generates a list of merged candidates for the word and previous and next words.
     *
     * @param previousWord The previous {@link Word} in the sentence.
     * @param word         The {@link Word} currently being checked.
     * @param nextWord     The next {@link Word} in the sentence.
     * @return A list of merged candidates.
     */
    protected mergedCandidatesList(previousWord: Word, word: Word, nextWord: Word): Array<Candidate>;
    /**
     * Generates a list of split candidates for the given word.
     *
     * @param word The {@link Word} currently being checked.
     * @return A list of split candidates.
     */
    protected splitCandidatesList(word: Word): Array<Candidate>;
    /**
     * Loads the merged and split lists from the specified files.
     */
    private loadDictionaries;
    protected getCorrectForm(wordName: string, dictionary: Map<string, string>): string;
    /**
     * Splits a word into two parts, a key and a value, based on the first non-numeric/non-punctuation character.
     *
     * @param word the {@link Word} object to split
     * @return an {@link AbstractMap.SimpleEntry} object containing the key (numeric/punctuation characters) and the value (remaining characters)
     */
    private getSplitPair;
}
