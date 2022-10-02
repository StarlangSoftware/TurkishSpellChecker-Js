(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Language/TurkishLanguage", "nlptoolkit-dictionary/dist/Dictionary/Word", "./Candidate", "./Operator", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleSpellChecker = void 0;
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const TurkishLanguage_1 = require("nlptoolkit-dictionary/dist/Language/TurkishLanguage");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const Candidate_1 = require("./Candidate");
    const Operator_1 = require("./Operator");
    const fs = require("fs");
    class SimpleSpellChecker {
        /**
         * A constructor of {@link SimpleSpellChecker} class which takes a {@link FsmMorphologicalAnalyzer} as an input and
         * assigns it to the fsm variable.
         *
         * @param fsm {@link FsmMorphologicalAnalyzer} type input.
         */
        constructor(fsm) {
            this.mergedWords = new Map();
            this.splitWords = new Map();
            this.shortcuts = ["cc", "cm2", "cm", "gb", "ghz", "gr", "gram", "hz", "inc", "inch", "inç",
                "kg", "kw", "kva", "litre", "lt", "m2", "m3", "mah", "mb", "metre", "mg", "mhz", "ml", "mm", "mp", "ms",
                "mt", "mv", "tb", "tl", "va", "volt", "watt", "ah", "hp"];
            this.fsm = fsm;
            this.loadDictionaries();
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
                    candidates.push(new Candidate_1.Candidate(swapped, Operator_1.Operator.SPELL_CHECK));
                }
                if (TurkishLanguage_1.TurkishLanguage.LETTERS.includes(word.charAt(i)) || "wxq".includes(word.charAt(i))) {
                    let deleted = word.substring(0, i) + word.substring(i + 1);
                    if (!deleted.match("^\\d+$")) {
                        candidates.push(new Candidate_1.Candidate(deleted, Operator_1.Operator.SPELL_CHECK));
                    }
                    for (let j = 0; j < s.length; j++) {
                        let replaced = word.substring(0, i) + s.charAt(j) + word.substring(i + 1);
                        candidates.push(new Candidate_1.Candidate(replaced, Operator_1.Operator.SPELL_CHECK));
                    }
                    for (let j = 0; j < s.length; j++) {
                        let added = word.substring(0, i) + s.charAt(j) + word.substring(i);
                        candidates.push(new Candidate_1.Candidate(added, Operator_1.Operator.SPELL_CHECK));
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
                let fsmParseList = this.fsm.morphologicalAnalysis(candidates[i].getName());
                if (fsmParseList.size() == 0) {
                    let newCandidate = this.fsm.getDictionary().getCorrectForm(candidates[i].getName());
                    if (newCandidate != undefined && this.fsm.morphologicalAnalysis(newCandidate).size() > 0) {
                        candidates.splice(i, 1, new Candidate_1.Candidate(newCandidate, Operator_1.Operator.MISSPELLED_REPLACE));
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
                let nextWord = null;
                let previousWord = null;
                if (i > 0) {
                    previousWord = sentence.getWord(i - 1);
                }
                if (i < sentence.wordCount() - 1) {
                    nextWord = sentence.getWord(i + 1);
                }
                if (this.forcedMisspellCheck(word, result) || this.forcedBackwardMergeCheck(word, result, previousWord)) {
                    continue;
                }
                if (this.forcedForwardMergeCheck(word, result, nextWord)) {
                    i++;
                    continue;
                }
                if (this.forcedSplitCheck(word, result) || this.forcedShortcutCheck(word, result)) {
                    continue;
                }
                let fsmParseList = this.fsm.morphologicalAnalysis(word.getName());
                let newWord;
                if (fsmParseList.size() == 0) {
                    let candidates = this.mergedCandidatesList(previousWord, word, nextWord);
                    if (candidates.length < 1) {
                        candidates = this.candidateList(word);
                    }
                    if (candidates.length < 1) {
                        candidates = candidates.concat(this.splitCandidatesList(word));
                    }
                    if (candidates.length > 0) {
                        let randomCandidate = Math.floor(Math.random() * candidates.length);
                        newWord = new Word_1.Word(candidates[randomCandidate].getName());
                        if (candidates[randomCandidate].getOperator() == Operator_1.Operator.BACKWARD_MERGE) {
                            result.replaceWord(i - 1, newWord);
                            continue;
                        }
                        if (candidates[randomCandidate].getOperator() == Operator_1.Operator.FORWARD_MERGE) {
                            i++;
                        }
                        if (candidates[randomCandidate].getOperator() == Operator_1.Operator.SPLIT) {
                            this.addSplitWords(candidates[randomCandidate].getName(), result);
                            continue;
                        }
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
        forcedMisspellCheck(word, result) {
            let forcedReplacement = this.fsm.getDictionary().getCorrectForm(word.getName());
            if (forcedReplacement != undefined) {
                result.addWord(new Word_1.Word(forcedReplacement));
                return true;
            }
            return false;
        }
        forcedBackwardMergeCheck(word, result, previousWord) {
            if (previousWord != null) {
                let forcedReplacement = this.getCorrectForm(result.getWord(result.wordCount() - 1).getName() + " " + word.getName(), this.mergedWords);
                if (forcedReplacement != null) {
                    result.replaceWord(result.wordCount() - 1, new Word_1.Word(forcedReplacement));
                    return true;
                }
            }
            return false;
        }
        forcedForwardMergeCheck(word, result, nextWord) {
            if (nextWord != null) {
                let forcedReplacement = this.getCorrectForm(word.getName() + " " + nextWord.getName(), this.mergedWords);
                if (forcedReplacement != null) {
                    result.addWord(new Word_1.Word(forcedReplacement));
                    return true;
                }
            }
            return false;
        }
        addSplitWords(multiWord, result) {
            let words = multiWord.split(" ");
            result.addWord(new Word_1.Word(words[0]));
            result.addWord(new Word_1.Word(words[1]));
        }
        forcedSplitCheck(word, result) {
            let forcedReplacement = this.getCorrectForm(word.getName(), this.splitWords);
            if (forcedReplacement != null) {
                this.addSplitWords(forcedReplacement, result);
                return true;
            }
            return false;
        }
        forcedShortcutCheck(word, result) {
            let shortcutRegex = "[0-9]+(" + this.shortcuts[0];
            for (let i = 1; i < this.shortcuts.length; i++) {
                shortcutRegex += "|" + this.shortcuts[i];
            }
            shortcutRegex += ")";
            if (word.getName().match(shortcutRegex)) {
                let pair = this.getSplitPair(word);
                result.addWord(new Word_1.Word(pair[0]));
                result.addWord(new Word_1.Word(pair[1]));
                return true;
            }
            return false;
        }
        mergedCandidatesList(previousWord, word, nextWord) {
            let mergedCandidates = new Array();
            let backwardMergeCandidate = null;
            if (previousWord != null) {
                backwardMergeCandidate = new Candidate_1.Candidate(previousWord.getName() + word.getName(), Operator_1.Operator.BACKWARD_MERGE);
                let fsmParseList = this.fsm.morphologicalAnalysis(backwardMergeCandidate.getName());
                if (fsmParseList.size() != 0) {
                    mergedCandidates.push(backwardMergeCandidate);
                }
            }
            if (nextWord != null) {
                let forwardMergeCandidate = new Candidate_1.Candidate(word.getName() + nextWord.getName(), Operator_1.Operator.FORWARD_MERGE);
                if (backwardMergeCandidate == null || !(backwardMergeCandidate.getName() == forwardMergeCandidate.getName())) {
                    let fsmParseList = this.fsm.morphologicalAnalysis(forwardMergeCandidate.getName());
                    if (fsmParseList.size() != 0) {
                        mergedCandidates.push(forwardMergeCandidate);
                    }
                }
            }
            return mergedCandidates;
        }
        splitCandidatesList(word) {
            let splitCandidates = new Array();
            for (let i = 4; i < word.getName().length - 3; i++) {
                let firstPart = word.getName().substring(0, i);
                let secondPart = word.getName().substring(i);
                let fsmParseListFirst = this.fsm.morphologicalAnalysis(firstPart);
                let fsmParseListSecond = this.fsm.morphologicalAnalysis(secondPart);
                if (fsmParseListFirst.size() > 0 && fsmParseListSecond.size() > 0) {
                    splitCandidates.push(new Candidate_1.Candidate(firstPart + " " + secondPart, Operator_1.Operator.SPLIT));
                }
            }
            return splitCandidates;
        }
        loadDictionaries() {
            let data = fs.readFileSync("merged.txt", 'utf8');
            let lines = data.split("\n");
            for (let line of lines) {
                let list = line.split(" ");
                this.mergedWords.set(list[0] + " " + list[1], list[2]);
            }
            data = fs.readFileSync("split.txt", 'utf8');
            lines = data.split("\n");
            for (let line of lines) {
                let list = line.split(" ");
                this.splitWords.set(list[0], list[1] + " " + list[2]);
            }
        }
        getCorrectForm(wordName, dictionary) {
            if (dictionary.has(wordName)) {
                return dictionary.get(wordName);
            }
            return null;
        }
        getSplitPair(word) {
            let key = "";
            let j = 0;
            while (j < word.getName().length) {
                if (word.getName().charAt(j) >= '0' && word.getName().charAt(j) <= '9') {
                    key += word.getName().charAt(j);
                }
                else {
                    break;
                }
                j++;
            }
            let value = word.getName().substring(j);
            return [key, value];
        }
    }
    exports.SimpleSpellChecker = SimpleSpellChecker;
});
//# sourceMappingURL=SimpleSpellChecker.js.map