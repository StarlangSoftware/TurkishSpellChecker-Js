import { SpellChecker } from "./SpellChecker";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { Candidate } from "./Candidate";
export declare class SimpleSpellChecker implements SpellChecker {
    protected fsm: FsmMorphologicalAnalyzer;
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
     * @return candidates {@link Array}.
     */
    candidateList(word: Word): Array<Candidate>;
    /**
     * A constructor of {@link SimpleSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} as an input and
     * assigns it to the fsm variable.
     *
     * @param fsm {@link FsmMorphologicalAnalyzer} type input.
     */
    constructor(fsm: FsmMorphologicalAnalyzer);
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
    protected forcedMisspellCheck(word: Word, result: Sentence): boolean;
    protected forcedBackwardMergeCheck(word: Word, result: Sentence, previousWord: Word): boolean;
    protected forcedForwardMergeCheck(word: Word, result: Sentence, nextWord: Word): boolean;
    protected addSplitWords(multiWord: string, result: Sentence): void;
    protected forcedSplitCheck(word: Word, result: Sentence): boolean;
    protected forcedShortcutSplitCheck(word: Word, result: Sentence): boolean;
    protected forcedDeDaSplitCheck(word: Word, result: Sentence): boolean;
    protected forcedSuffixMergeCheck(word: Word, result: Sentence, previousWord: Word): boolean;
    protected forcedHyphenMergeCheck(word: Word, result: Sentence, previousWord: Word, nextWord: Word): boolean;
    protected forcedQuestionSuffixSplitCheck(word: Word, result: Sentence): boolean;
    protected mergedCandidatesList(previousWord: Word, word: Word, nextWord: Word): Array<Candidate>;
    protected splitCandidatesList(word: Word): Array<Candidate>;
    private loadDictionaries;
    protected getCorrectForm(wordName: string, dictionary: Map<string, string>): string;
    private getSplitPair;
}
