import { NGramSpellChecker } from "./NGramSpellChecker";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { NGram } from "nlptoolkit-ngram/dist/NGram";
import { SpellCheckerParameter } from "./SpellCheckerParameter";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
import { Candidate } from "./Candidate";
export declare class ContextBasedSpellChecker extends NGramSpellChecker {
    private contextList;
    /**
     * A constructor of {@link ContextBasedSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer}, an {@link NGram}
     * and a {@link SpellCheckerParameter} as inputs. Then, calls its super class {@link NGramSpellChecker} with given inputs.
     *
     * @param fsm       {@link FsmMorphologicalAnalyzer} type input.
     * @param nGram     {@link NGram} type input.
     * @param parameter {@link SpellCheckerParameter} type input.
     */
    constructor(fsm: FsmMorphologicalAnalyzer, nGram: NGram<string>, parameter?: SpellCheckerParameter);
    /**
     * {@inheritDoc}
     * This method also loads context information from a file.
     */
    protected loadContextDictionaries(): void;
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
    candidateList(word: Word, sentence: Sentence): Array<Candidate>;
    /**
     * Calculates the Damerau-Levenshtein distance between two strings.
     * This method also allows for the transposition of adjacent characters,
     * which is not possible in a standard Levenshtein distance calculation.
     *
     * @param first  the first string
     * @param second the second string
     * @return the Damerau-Levenshtein distance between the two strings
     */
    private damerauLevenshteinDistance;
}
