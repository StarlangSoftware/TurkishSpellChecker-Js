import * as assert from "assert";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {NGramSpellChecker} from "../dist/NGramSpellChecker";
import {NGram} from "nlptoolkit-ngram/dist/NGram";
import {NoSmoothing} from "nlptoolkit-ngram/dist/NoSmoothing";

describe('NGramSpellCheckerTest', function() {
    describe('NGramSpellCheckerTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let nGram = new NGram<string>("ngram.txt");
        nGram.calculateNGramProbabilitiesSimple(new NoSmoothing<string>());
        it('testSpellCheck', function() {
            let original = [new Sentence("demokratik cumhuriyet en kıymetli varlığımızdır"),
                new Sentence("bu tablodaki değerler zedelenmeyecektir"),
                new Sentence("milliyet'in geleneksel yılın sporcusu anketi 43. yaşını doldurdu"),
                new Sentence("demokrasinin icadı bu ayrımı bulandırdı"),
                new Sentence("dışişleri müsteşarı Öymen'in 1997'nin ilk aylarında Bağdat'a gitmesi öngörülüyor"),
                new Sentence("büyüdü , palazlandı , devleti ele geçirdi"),
                new Sentence("her maskenin ciltte kalma süresi farklıdır"),
                new Sentence("yılın son ayında 10 gazeteci gözaltına alındı"),
                new Sentence("iki pilotun kullandığı uçakta bir hostes görev alıyor"),
                new Sentence("son derece kısıtlı kelimeler çerçevesinde kendilerini uzun cümlelerle ifade edebiliyorlar"),
                new Sentence("kedi köpek"),
                new Sentence("minibüs durağı"),
                new Sentence("noter belgesi"),
                new Sentence("")];
            let modified = [new Sentence("demokratik cumhüriyet rn kımetli varlıgımızdır"),
                new Sentence("bu tblodaki değerlğr zedelenmeyecüktir"),
                new Sentence("milliyet'in geeneksel yılin spoşcusu ankşti 43. yeşını doldürdu"),
                new Sentence("demokrasinin icşdı buf ayrmıı bulandürdı"),
                new Sentence("dışişleri mütseşarı Öymen'in 1997'nin iljk aylğrında Bağdat'a gitmesi öngörülüyor"),
                new Sentence("büyüdü , palazandı , devltei eöe geçridi"),
                new Sentence("her makenin cültte aklma sürdsi farlkıdır"),
                new Sentence("yılın sno ayında 10 gazteci gözlatına alündı"),
                new Sentence("iki piotun kulçandığı uçkata üir hotes görçv alyıor"),
                new Sentence("son deece kısütlı keilmeler çeçevesinde kendülerini uzuü cümllerle ifüde edbeiliyorlar"),
                new Sentence("krdi köpek"),
                new Sentence("minibü durağı"),
                new Sentence("ntoer belgesi"),
                new Sentence("")];
            let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, true);
            for (let i = 0; i < 8; i++){
                assert.strictEqual(original[i].toString(), nGramSpellChecker.spellCheck(modified[i]).toString());
            }
        });
        it('testSpellCheck', function() {
            let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, false);
            assert.strictEqual("noter hakkında", nGramSpellChecker.spellCheck(new Sentence("noter hakkınad")).toString());
            assert.strictEqual("arçelik'in çamaşır", nGramSpellChecker.spellCheck(new Sentence("arçelik'in çamşaır")).toString());
            assert.strictEqual("ruhsat yanında", nGramSpellChecker.spellCheck(new Sentence("ruhset yanında")).toString());
        });
    });
});
