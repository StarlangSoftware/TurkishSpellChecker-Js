import * as assert from "assert";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {SimpleSpellChecker} from "../dist/SimpleSpellChecker";
import * as fs from "fs";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";

describe('SimpleSpellCheckerTest', function() {
    describe('SimpleSpellCheckerTest', function() {
        it('testSpellCheck', function() {
            let fsm = new FsmMorphologicalAnalyzer();
            let simpleSpellChecker = new SimpleSpellChecker(fsm);
            let data = fs.readFileSync("misspellings.txt", 'utf8')
            let lines = data.split("\n")
            for (let line of lines){
                let items = line.split(" ")
                assert.strictEqual(items[1], simpleSpellChecker.spellCheck(new Sentence(items[0])).toString())
            }
        });
    });
});
