import {SimpleSpellChecker} from "./SimpleSpellChecker";
import {NGram} from "nlptoolkit-ngram/dist/NGram";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {Candidate} from "./Candidate";
import {Operator} from "./Operator";
import {SpellCheckerParameter} from "./SpellCheckerParameter";

export class NGramSpellChecker extends SimpleSpellChecker{

    private nGram: NGram<string>
    private parameter: SpellCheckerParameter

    /**
     * A constructor of {@link NGramSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} and an {@link NGram}
     * as inputs. Then, calls its super class {@link SimpleSpellChecker} with given {@link FsmMorphologicalAnalyzer} and
     * assigns given {@link NGram} to the nGram variable.
     *
     * @param fsm   {@link FsmMorphologicalAnalyzer} type input.
     * @param nGram {@link NGram} type input.
     * @param parameter Generic parameter of spell checking
     */
    constructor(fsm: FsmMorphologicalAnalyzer, nGram: NGram<string>, parameter: SpellCheckerParameter) {
        super(fsm);
        this.parameter = parameter
        this.nGram = nGram
    }

    /**
     * Checks the morphological analysis of the given word in the given index. If there is no misspelling, it returns
     * the longest root word of the possible analyses.
     * @param sentence Sentence to be analyzed.
     * @param index Index of the word
     * @return If the word is misspelled, null; otherwise the longest root word of the possible analyses.
     */
    private checkAnalysisAndSetRootForWordAtIndex(sentence: Sentence, index: number): Word{
        if (index < sentence.wordCount()){
            let wordName = sentence.getWord(index).getName()
            if ((wordName.match(".*\\d+.*") && wordName.match(".*[a-zA-ZçöğüşıÇÖĞÜŞİ]+.*")
                && !wordName.includes("'")) || wordName.length <= 3) {
                return sentence.getWord(index)
            }
            let fsmParses = this.fsm.morphologicalAnalysis(sentence.getWord(index).getName());
            if (fsmParses.size() != 0){
                if (this.parameter.isRootNGram()){
                    return fsmParses.getParseWithLongestRootWord().getWord();
                } else {
                    return sentence.getWord(index);
                }
            }  else {
                let upperCaseWordName = Word.toCapital(wordName)
                let upperCaseFsmParses = this.fsm.morphologicalAnalysis(upperCaseWordName)
                if (upperCaseFsmParses.size() != 0) {
                    if (this.parameter.isRootNGram()) {
                        return upperCaseFsmParses.getParseWithLongestRootWord().getWord()
                    } else {
                        return sentence.getWord(index)
                    }
                }
            }
        }
        return undefined
    }

    private checkAnalysisAndSetRoot(word: string): Word{
        let fsmParses = this.fsm.morphologicalAnalysis(word)
        if (fsmParses.size() != 0){
            if (this.parameter.isRootNGram()){
                return fsmParses.getParseWithLongestRootWord().getWord()
            } else {
                return new Word(word)
            }
        }
        return undefined
    }

    private getProbability(word1: string, word2: string): number{
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
    spellCheck(sentence: Sentence): Sentence{
        let previousRoot = undefined
        let result = new Sentence();
        let root = this.checkAnalysisAndSetRootForWordAtIndex(sentence, 0);
        let nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, 1);
        for (let i = 0; i < sentence.wordCount(); i++) {
            let nextWord = null
            let previousWord = null
            let nextNextWord = null
            let previousPreviousWord = null
            let word = sentence.getWord(i);
            if (i > 0){
                previousWord = sentence.getWord(i - 1)
            }
            if (i > 1){
                previousPreviousWord = sentence.getWord(i - 2)
            }
            if (i < sentence.wordCount() - 1){
                nextWord = sentence.getWord(i + 1)
            }
            if (i < sentence.wordCount() - 2){
                nextNextWord = sentence.getWord(i + 2)
            }
            if (this.forcedMisspellCheck(word, result)){
                previousRoot = this.checkAnalysisAndSetRootForWordAtIndex(result, result.wordCount() - 1)
                root = nextRoot
                nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 2)
                continue
            }
            if (this.forcedBackwardMergeCheck(word, result, previousWord) || this.forcedSuffixMergeCheck(word, result, previousWord)){
                previousRoot = this.checkAnalysisAndSetRootForWordAtIndex(result, result.wordCount() - 1)
                root = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 1)
                nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 2)
                continue
            }
            if (this.forcedForwardMergeCheck(word, result, nextWord) || this.forcedHyphenMergeCheck(word, result, previousWord, nextWord)){
                i++;
                previousRoot = this.checkAnalysisAndSetRootForWordAtIndex(result, result.wordCount() - 1)
                root = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 1)
                nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 2)
                continue
            }
            if (this.forcedSplitCheck(word, result) || this.forcedShortcutSplitCheck(word, result)){
                previousRoot = this.checkAnalysisAndSetRootForWordAtIndex(result, result.wordCount() - 1)
                root = nextRoot
                nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 2)
                continue
            }
            if (this.parameter.isDeMiCheck()) {
                if (this.forcedDeDaSplitCheck(word, result) || this.forcedQuestionSuffixSplitCheck(word, result)) {
                    previousRoot = this.checkAnalysisAndSetRootForWordAtIndex(result, result.wordCount() - 1)
                    root = nextRoot
                    nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 2)
                    continue
                }
            }
            if (root == undefined || (word.getName().length <= 3 && this.fsm.morphologicalAnalysis(word.getName()).size() == 0)){
                let candidates : Array<Candidate> = []
                if (root == undefined){
                    candidates = candidates.concat(this.candidateList(word))
                    candidates = candidates.concat(this.splitCandidatesList(word))
                }
                candidates = candidates.concat(this.mergedCandidatesList(previousWord, word, nextWord))
                let bestCandidate = new Candidate(word.getName(), Operator.NO_CHANGE)
                let bestRoot = word
                let bestProbability = this.parameter.getThreshold()
                for (let candidate of candidates) {
                    if (candidate.getOperator() == Operator.SPELL_CHECK || candidate.getOperator() == Operator.MISSPELLED_REPLACE){
                        root = this.checkAnalysisAndSetRoot(candidate.getName())
                    }
                    if (candidate.getOperator() == Operator.BACKWARD_MERGE && previousWord != null){
                        root = this.checkAnalysisAndSetRoot(previousWord.getName() + word.getName())
                        if (previousPreviousWord != null){
                            previousRoot = this.checkAnalysisAndSetRoot(previousPreviousWord.getName())
                        }
                    }
                    if (candidate.getOperator() == Operator.FORWARD_MERGE && nextWord != null){
                        root = this.checkAnalysisAndSetRoot(word.getName() + nextWord.getName())
                        if (nextNextWord != null){
                            nextRoot = this.checkAnalysisAndSetRoot(nextNextWord.getName())
                        }
                    }
                    let previousProbability
                    if (previousRoot != null) {
                        if (candidate.getOperator() == Operator.SPLIT){
                            root = this.checkAnalysisAndSetRoot(candidate.getName().split(" ")[0])
                        }
                        previousProbability = this.getProbability(previousRoot.getName(), root.getName())
                    } else {
                        previousProbability = 0.0
                    }
                    let nextProbability
                    if (nextRoot != undefined) {
                        if (candidate.getOperator() == Operator.SPLIT){
                            root = this.checkAnalysisAndSetRoot(candidate.getName().split(" ")[1])
                        }
                        nextProbability = this.getProbability(root.getName(), nextRoot.getName())
                    } else {
                        nextProbability = 0.0
                    }
                    if (Math.max(previousProbability, nextProbability) > bestProbability) {
                        bestCandidate = candidate
                        bestRoot = root
                        bestProbability = Math.max(previousProbability, nextProbability)
                    }
                }
                if (bestCandidate.getOperator() == Operator.FORWARD_MERGE) {
                    i++
                }
                if (bestCandidate.getOperator() == Operator.BACKWARD_MERGE) {
                    result.replaceWord(i - 1, new Word(bestCandidate.getName()))
                } else{
                    if (bestCandidate.getOperator() == Operator.SPLIT){
                        this.addSplitWords(bestCandidate.getName(), result)
                    } else {
                        result.addWord(new Word(bestCandidate.getName()))
                    }
                }
                root = bestRoot
            } else {
                result.addWord(word)
            }
            previousRoot = root
            root = nextRoot
            nextRoot = this.checkAnalysisAndSetRootForWordAtIndex(sentence, i + 2)
        }
        return result
    }
}