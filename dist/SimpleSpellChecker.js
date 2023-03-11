(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Language/TurkishLanguage", "nlptoolkit-dictionary/dist/Dictionary/Word", "./Candidate", "./Operator", "fs", "nlptoolkit-dictionary/dist/Dictionary/TxtWord"], factory);
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
    const TxtWord_1 = require("nlptoolkit-dictionary/dist/Dictionary/TxtWord");
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
                "mt", "mv", "tb", "tl", "va", "volt", "watt", "ah", "hp", "oz", "rpm", "dpi", "ppm", "ohm", "kwh", "kcal",
                "kbit", "mbit", "gbit", "bit", "byte", "mbps", "gbps", "cm3", "mm2", "mm3", "khz", "ft", "db", "sn"];
            this.conditionalShortcuts = ["g", "v", "m", "l", "w", "s"];
            this.questionSuffixList = ["mi", "mı", "mu", "mü", "miyim", "misin", "miyiz", "midir", "miydi",
                "mıyım", "mısın", "mıyız", "mıdır", "mıydı", "muyum", "musun", "muyuz", "mudur", "muydu", "müyüm", "müsün",
                "müyüz", "müdür", "müydü", "miydim", "miydin", "miydik", "miymiş", "mıydım", "mıydın", "mıydık", "mıymış",
                "muydum", "muydun", "muyduk", "muymuş", "müydüm", "müydün", "müydük", "müymüş", "misiniz", "mısınız",
                "musunuz", "müsünüz", "miyimdir", "misindir", "miyizdir", "miydiniz", "miydiler", "miymişim", "miymişiz",
                "mıyımdır", "mısındır", "mıyızdır", "mıydınız", "mıydılar", "mıymışım", "mıymışız", "muyumdur", "musundur",
                "muyuzdur", "muydunuz", "muydular", "muymuşum", "muymuşuz", "müyümdür", "müsündür", "müyüzdür", "müydünüz",
                "müydüler", "müymüşüm", "müymüşüz", "miymişsin", "miymişler", "mıymışsın", "mıymışlar", "muymuşsun",
                "muymuşlar", "müymüşsün", "müymüşler", "misinizdir", "mısınızdır", "musunuzdur", "müsünüzdür"];
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
         * @param sentence Sentence input.
         * @return candidates {@link Array}.
         */
        candidateList(word, sentence) {
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
                if (this.forcedMisspellCheck(word, result) || this.forcedBackwardMergeCheck(word, result, previousWord)
                    || this.forcedSuffixMergeCheck(word, result, previousWord)) {
                    continue;
                }
                if (this.forcedForwardMergeCheck(word, result, nextWord) || this.forcedHyphenMergeCheck(word, result, previousWord, nextWord)) {
                    i++;
                    continue;
                }
                if (this.forcedSplitCheck(word, result) || this.forcedShortcutSplitCheck(word, result)
                    || this.forcedDeDaSplitCheck(word, result) || this.forcedQuestionSuffixSplitCheck(word, result)) {
                    continue;
                }
                let fsmParseList = this.fsm.morphologicalAnalysis(word.getName());
                let upperCaseFsmParseList = this.fsm.morphologicalAnalysis(Word_1.Word.toCapital(word.getName()));
                let newWord;
                if (fsmParseList.size() == 0 && upperCaseFsmParseList.size() == 0) {
                    let candidates = this.mergedCandidatesList(previousWord, word, nextWord);
                    if (candidates.length < 1) {
                        candidates = this.candidateList(word, sentence);
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
        forcedShortcutSplitCheck(word, result) {
            let shortcutRegex = "(([1-9][0-9]*)|[0])(([.]|[,])[0-9]*)?(" + this.shortcuts[0];
            for (let i = 1; i < this.shortcuts.length; i++) {
                shortcutRegex += "|" + this.shortcuts[i];
            }
            shortcutRegex += ")";
            let conditionalShortcutRegex = "(([1-9][0-9]*)|[0])(([.]|[,])[0-9]*)?(" + this.conditionalShortcuts[0];
            for (let i = 1; i < this.conditionalShortcuts.length; i++) {
                conditionalShortcutRegex += "|" + this.conditionalShortcuts[i];
            }
            conditionalShortcutRegex += ")";
            if (word.getName().match(shortcutRegex) || word.getName().match(conditionalShortcutRegex)) {
                let pair = this.getSplitPair(word);
                result.addWord(new Word_1.Word(pair[0]));
                result.addWord(new Word_1.Word(pair[1]));
                return true;
            }
            return false;
        }
        forcedDeDaSplitCheck(word, result) {
            let wordName = word.getName();
            let capitalizedWordName = Word_1.Word.toCapital(wordName);
            let txtWord = undefined;
            if (wordName.endsWith("da") || wordName.endsWith("de")) {
                if (this.fsm.morphologicalAnalysis(wordName).size() == 0 && this.fsm.morphologicalAnalysis(capitalizedWordName).size() == 0) {
                    let newWordName = wordName.substring(0, wordName.length - 2);
                    let fsmParseList = this.fsm.morphologicalAnalysis(newWordName);
                    let txtNewWord = this.fsm.getDictionary().getWord(newWordName.toLocaleLowerCase("tr"));
                    if (txtNewWord != undefined && txtNewWord instanceof TxtWord_1.TxtWord && txtNewWord.isProperNoun()) {
                        if (this.fsm.morphologicalAnalysis(newWordName + "'" + "da").size() > 0) {
                            result.addWord(new Word_1.Word(newWordName + "'" + "da"));
                        }
                        else {
                            result.addWord(new Word_1.Word(newWordName + "'" + "de"));
                        }
                        return true;
                    }
                    if (fsmParseList.size() > 0) {
                        txtWord = this.fsm.getDictionary().getWord(fsmParseList.getParseWithLongestRootWord().getWord().getName());
                    }
                    if (txtWord != undefined && txtWord instanceof TxtWord_1.TxtWord && !txtWord.isCode()) {
                        result.addWord(new Word_1.Word(newWordName));
                        if (TurkishLanguage_1.TurkishLanguage.isBackVowel(Word_1.Word.lastVowel(newWordName))) {
                            if (txtWord.notObeysVowelHarmonyDuringAgglutination()) {
                                result.addWord(new Word_1.Word("de"));
                            }
                            else {
                                result.addWord(new Word_1.Word("da"));
                            }
                        }
                        else if (txtWord.notObeysVowelHarmonyDuringAgglutination()) {
                            result.addWord(new Word_1.Word("da"));
                        }
                        else {
                            result.addWord(new Word_1.Word("de"));
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        forcedSuffixMergeCheck(word, result, previousWord) {
            let liList = ["li", "lı", "lu", "lü"];
            let likList = ["lik", "lık", "luk", "lük"];
            if (liList.includes(word.getName()) || likList.includes(word.getName())) {
                if (previousWord != null && previousWord.getName().match("[0-9]+")) {
                    for (let suffix of liList) {
                        if (word.getName().length == 2 && this.fsm.morphologicalAnalysis(previousWord.getName() + "'" + suffix).size() > 0) {
                            result.replaceWord(result.wordCount() - 1, new Word_1.Word(previousWord.getName() + "'" + suffix));
                            return true;
                        }
                    }
                    for (let suffix of likList) {
                        if (word.getName().length == 3 && this.fsm.morphologicalAnalysis(previousWord.getName() + "'" + suffix).size() > 0) {
                            result.replaceWord(result.wordCount() - 1, new Word_1.Word(previousWord.getName() + "'" + suffix));
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        forcedHyphenMergeCheck(word, result, previousWord, nextWord) {
            if (word.getName() == "-" || word.getName() == "–" || word.getName() == "—") {
                if (previousWord != null && nextWord != null &&
                    previousWord.getName().match("[a-zA-ZçöğüşıÇÖĞÜŞİ]+") && nextWord.getName().match("[a-zA-ZçöğüşıÇÖĞÜŞİ]+")) {
                    let newWordName = previousWord.getName() + "-" + nextWord.getName();
                    if (this.fsm.morphologicalAnalysis(newWordName).size() > 0) {
                        result.replaceWord(result.wordCount() - 1, new Word_1.Word(newWordName));
                        return true;
                    }
                }
            }
            return false;
        }
        forcedQuestionSuffixSplitCheck(word, result) {
            let wordName = word.getName();
            if (this.fsm.morphologicalAnalysis(wordName).size() > 0) {
                return false;
            }
            for (let questionSuffix of this.questionSuffixList) {
                if (wordName.endsWith(questionSuffix)) {
                    let newWordName = wordName.substring(0, wordName.lastIndexOf(questionSuffix));
                    let txtWord = this.fsm.getDictionary().getWord(newWordName);
                    if (this.fsm.morphologicalAnalysis(newWordName).size() > 0 && txtWord != undefined && txtWord instanceof TxtWord_1.TxtWord && !txtWord.isCode()) {
                        result.addWord(new Word_1.Word(newWordName));
                        result.addWord(new Word_1.Word(questionSuffix));
                        return true;
                    }
                }
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