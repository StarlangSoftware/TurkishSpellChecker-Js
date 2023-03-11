import { SimpleSpellChecker } from "./SimpleSpellChecker";
import { NGram } from "nlptoolkit-ngram/dist/NGram";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
import { SpellCheckerParameter } from "./SpellCheckerParameter";
export declare class NGramSpellChecker extends SimpleSpellChecker {
    private nGram;
    private parameter;
    /**
     * A constructor of {@link NGramSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} and an {@link NGram}
     * as inputs. Then, calls its super class {@link SimpleSpellChecker} with given {@link FsmMorphologicalAnalyzer} and
     * assigns given {@link NGram} to the nGram variable.
     *
     * @param fsm   {@link FsmMorphologicalAnalyzer} type input.
     * @param nGram {@link NGram} type input.
     * @param parameter Generic parameter of spell checking
     */
    constructor(fsm: FsmMorphologicalAnalyzer, nGram: NGram<string>, parameter: SpellCheckerParameter);
    /**
     * Checks the morphological analysis of the given word in the given index. If there is no misspelling, it returns
     * the longest root word of the possible analyses.
     * @param sentence Sentence to be analyzed.
     * @param index Index of the word
     * @return If the word is misspelled, null; otherwise the longest root word of the possible analyses.
     */
    private checkAnalysisAndSetRootForWordAtIndex;
    /**
     * Checks the morphological analysis of the given word. If there is no misspelling, it returns
     * the longest root word of the possible analysis.
     *
     * @param word Word to be analyzed.
     * @return If the word is misspelled, null; otherwise the longest root word of the possible analysis.
     */
    private checkAnalysisAndSetRoot;
    private getProbability;
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
    spellCheck(sentence: Sentence): Sentence;
}
