(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Language/TurkishLanguage", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleSpellChecker = void 0;
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const TurkishLanguage_1 = require("nlptoolkit-dictionary/dist/Language/TurkishLanguage");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class SimpleSpellChecker {
        /**
         * A constructor of {@link SimpleSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} as an input and
         * assigns it to the fsm variable.
         *
         * @param fsm {@link FsmMorphologicalAnalyzer} type input.
         */
        constructor(fsm) {
            this.fsm = fsm;
        }
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
        generateCandidateList(word) {
            let s = TurkishLanguage_1.TurkishLanguage.LOWERCASE_LETTERS;
            let candidates = new Array();
            for (let i = 0; i < word.length; i++) {
                if (i < word.length - 1) {
                    let swapped = word.substring(0, i) + word.charAt(i + 1) + word.charAt(i) + word.substring(i + 2);
                    candidates.push(swapped);
                }
                if (TurkishLanguage_1.TurkishLanguage.LETTERS.includes(word.charAt(i)) || "wxq".includes(word.charAt(i))) {
                    let deleted = word.substring(0, i) + word.substring(i + 1);
                    if (!deleted.match("^\\d+$")) {
                        candidates.push(deleted);
                    }
                    for (let j = 0; j < s.length; j++) {
                        let replaced = word.substring(0, i) + s.charAt(j) + word.substring(i + 1);
                        candidates.push(replaced);
                    }
                    for (let j = 0; j < s.length; j++) {
                        let added = word.substring(0, i) + s.charAt(j) + word.substring(i);
                        candidates.push(added);
                    }
                }
            }
            return candidates;
        }
        /**
         * The candidateList method takes a {@link Word} as an input and creates a candidates {@link Array} by calling generateCandidateList
         * method with given word. Then, it loop i times where i ranges from 0 to size of candidates {@link Array} and creates a
         * {@link FsmParseList} by calling morphologicalAnalysis with each item of candidates {@link Array}. If the size of
         * {@link FsmParseList} is 0, it then removes the ith item.
         *
         * @param word Word input.
         * @return candidates {@link Array}.
         */
        candidateList(word) {
            let candidates = this.generateCandidateList(word.getName());
            for (let i = 0; i < candidates.length; i++) {
                let fsmParseList = this.fsm.morphologicalAnalysis(candidates[i]);
                if (fsmParseList.size() == 0) {
                    let newCandidate = this.fsm.getDictionary().getCorrectForm(candidates[i]);
                    if (newCandidate != undefined && this.fsm.morphologicalAnalysis(newCandidate).size() > 0) {
                        candidates.splice(i, 1, newCandidate);
                    }
                    else {
                        candidates.splice(i, 1);
                        i--;
                    }
                }
            }
            return candidates;
        }
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
        spellCheck(sentence) {
            let result = new Sentence_1.Sentence();
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                let fsmParseList = this.fsm.morphologicalAnalysis(word.getName());
                let newWord;
                if (fsmParseList.size() == 0) {
                    let candidates = this.candidateList(word);
                    if (candidates.length > 0) {
                        let randomCandidate = Math.floor(Math.random() * candidates.length);
                        newWord = new Word_1.Word(candidates[randomCandidate]);
                    }
                    else {
                        newWord = word;
                    }
                }
                else {
                    newWord = word;
                }
                result.addWord(newWord);
            }
            return result;
        }
    }
    exports.SimpleSpellChecker = SimpleSpellChecker;
});
//# sourceMappingURL=SimpleSpellChecker.js.map