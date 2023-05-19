import * as assert from "assert";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {NGramSpellChecker} from "../dist/NGramSpellChecker";
import {NGram} from "nlptoolkit-ngram/dist/NGram";
import {NoSmoothing} from "nlptoolkit-ngram/dist/NoSmoothing";
import {SpellCheckerParameter} from "../dist/SpellCheckerParameter";

describe('NGramSpellCheckerTest', function() {
    describe('NGramSpellCheckerTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let nGram = new NGram<string>("ngram.txt");
        nGram.calculateNGramProbabilitiesSimple(new NoSmoothing<string>());
        it('testSpellCheck', function() {
            let original = [new Sentence("demokratik cumhuriyet en kıymetli varlığımızdır"),
                new Sentence("bu tablodaki değerler zedelenmeyecektir"),
                new Sentence("vakfın geleneksel yılın sporcusu anketi yeni yaşını doldurdu"),
                new Sentence("demokrasinin icadı bu ayrımı bulandırdı"),
                new Sentence("dışişleri müsteşarı Öymen'in 1997'nin ilk aylarında Bağdat'a gitmesi öngörülüyor"),
                new Sentence("büyüdü , palazlandı , devleti ele geçirdi"),
                new Sentence("her maskenin ciltte kalma süresi farklıdır"),
                new Sentence("yılın son ayında 10 gazeteci gözaltına alındı"),
                new Sentence("iki pilotun kullandığı uçakta bir hostes görev alıyor"),
                new Sentence("son derece kısıtlı kelimeler çerçevesinde kendilerini uzun cümlelerle ifade edebiliyorlar"),
                new Sentence("minibüs durağı"),
                new Sentence("noter belgesi"),
                new Sentence("bu filmi daha önce görmemiş miydik diye sordu")];
            let modified = [new Sentence("demokratik cumhüriyet en kımetli varlıgımızdır"),
                new Sentence("bu tblodaki değerler zedelenmeyecektir"),
                new Sentence("vakfın geeneksel yılin spoşcusu ankşti yeni yeşını doldürdu"),
                new Sentence("demokrasinin icşdı bu ayrmıı bulandürdı"),
                new Sentence("dışişleri mütseşarı Öymen'in 1997'nin iljk aylğrında Bağdat'a gitmesi öngörülüyor"),
                new Sentence("büyüdü , palazandı , devltei ele geçridi"),
                new Sentence("her makenin cültte aklma sürdsi farlkıdır"),
                new Sentence("yılın son ayında 10 gazteci gözlatına alündı"),
                new Sentence("iki piotun kulçandığı uçkata bir hotes görçv alyıor"),
                new Sentence("son deece kısütlı keilmeler çeçevesinde kendülerini uzuü cümllerle ifüde edbeiliyorlar"),
                new Sentence("minibü durağı"),
                new Sentence("ntoer belgesi"),
                new Sentence("bu filmi daha önce görmemişmiydik diye sordu")];
            let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, new SpellCheckerParameter())
            for (let i = 0; i < 13; i++){
                assert.strictEqual(original[i].toString(), nGramSpellChecker.spellCheck(modified[i]).toString())
            }
        });
        it('testSpellCheck2', function() {
            let original = [new Sentence("yeni sezon başladı"),
                new Sentence("sırtıkara adındaki canlı , bir balıktır"),
                new Sentence("siyah ayı , ayıgiller familyasına ait bir ayı türüdür"),
                new Sentence("yeni sezon başladı gibi"),
                new Sentence("alışveriş için markete gitti"),
                new Sentence("küçük bir yalıçapkını geçti"),
                new Sentence("meslek odaları birliği yeniden toplandı"),
                new Sentence("yeni yılın sonrasında vakalarda artış oldu"),
                new Sentence("atomik saatin 10 mhz sinyali kalibrasyon hizmetlerinde referans olarak kullanılmaktadır"),
                new Sentence("rehberimiz bu bölgedeki çıngıraklı yılan varlığı hakkında konuştu"),
                new Sentence("bu son model cihaz 24 inç ekran büyüklüğünde ve 9 kg ağırlıktadır"),
                new Sentence("bu haksızlık da unutulup gitmişti"),
                new Sentence("4'lü tahıl zirvesi İstanbul'da gerçekleşti"),
                new Sentence("10'luk sistemden 100'lük sisteme geçiş yapılacak"),
                new Sentence("play-off maçlarına çıkacak takımlar belli oldu")];
            let modified = [new Sentence("yenisezon başladı"),
                new Sentence("sırtı kara adındaki canlı , bir balıktır"),
                new Sentence("siyahayı , ayıgiller familyasına ait bir ayı türüdür"),
                new Sentence("yeni se zon başladı gibs"),
                new Sentence("alis veriş için markete gitit"),
                new Sentence("kucuk bri yalı çapkını gecti"),
                new Sentence("mes lek odaları birliği yendien toplandı"),
                new Sentence("yeniyılın sonrasında vakalarda artış oldu"),
                new Sentence("atomik saatin 10mhz sinyali kalibrasyon hizmetlerinde referans olarka kullanılmaktadır"),
                new Sentence("rehperimiz buı bölgedeki çıngıraklıyılan varlıgı hakkınd konustu"),
                new Sentence("bu son model ciha 24inç ekran büyüklüğünde ve 9kg ağırlıktadır"),
                new Sentence("bu haksızlıkda unutulup gitmişti"),
                new Sentence("4 lı tahıl zirvesi İstanbul'da gerçekleşti"),
                new Sentence("10 lük sistemden 100 lık sisteme geçiş yapılacak"),
                new Sentence("play - off maçlarına çıkacak takımlar belli oldu")];
            let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, new SpellCheckerParameter())
            for (let i = 0; i < 15; i++){
                assert.strictEqual(original[i].toString(), nGramSpellChecker.spellCheck(modified[i]).toString());
            }
        });
        it('testForcedChecks', function() {
            let original = [new Sentence("yardımcı olur musunuz ?"),
                new Sentence("buraya daha önce gelmemiş miydik ?"),
                new Sentence("kutunun boyutları 0.2 m x 0.3 m x 0.5 m olacak"),
                new Sentence("2 tb depolama alanına sahip 7200 rpm bir disk"),
                new Sentence("anahtarlarımı Kadıköy'de bir lokantada unutmuşum"),
                new Sentence("bütün suç Selma'da değil"),
                new Sentence("Fransa'nın başkenti Paris'tir"),
                new Sentence("Nişantaşı'ndan Kadıköy'e gitmek için metroya binip Üsküdar'da inmek gerekiyor"),
                new Sentence("90'lı yıllarda ülkede çok büyük değişimler oldu"),
                new Sentence("100'lük parçaları bir araya getirerek 100'lük bir resim oluşturduk"),
                new Sentence("size konuyla ilgili bir e-posta gönderdim"),
                new Sentence("meyve-sebze reyonundan bir kilo elma aldım")];
            let modified = [new Sentence("yardımcı olurmusunuz ?"),
                new Sentence("buraya daha önce gelmemişmiydik ?"),
                new Sentence("kutunun boyutları 0.2m x 0.3m x 0.5m olacak"),
                new Sentence("2tb depolama alanına sahip 7200rpm bir disk"),
                new Sentence("anahtarlarımı Kadıköyda bir lokantada unutmuşum"),
                new Sentence("bütün suç Selmada değil"),
                new Sentence("Fransanın başkenti Paristir"),
                new Sentence("Nişantaşından Kadıköye gitmek için metroya binip Üsküdarda inmek gerekiyor"),
                new Sentence("90 lü yıllarda ülkede çok büyük değişimler oldu"),
                new Sentence("100 lık parçaları bir araya getirerek 100 lük bir resim oluşturduk"),
                new Sentence("size konuyla ilgili bir e - posta gönderdim"),
                new Sentence("meyve — sebze reyonundan bir kilo elma aldım")];
            let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, new SpellCheckerParameter())
            for (let i = 0; i < 12; i++){
                assert.strictEqual(original[i].toString(), nGramSpellChecker.spellCheck(modified[i]).toString());
            }
        });
        it('testSpellCheck', function() {
            let parameter = new SpellCheckerParameter()
            parameter.setRootNGram(false)
            let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, parameter)
            assert.strictEqual("noter hakkında", nGramSpellChecker.spellCheck(new Sentence("noter hakkınad")).toString())
            assert.strictEqual("arçelik'in çamaşır", nGramSpellChecker.spellCheck(new Sentence("arçelik'in çamşaır")).toString())
            assert.strictEqual("ruhsat yanında", nGramSpellChecker.spellCheck(new Sentence("ruhset yanında")).toString())
        });
    });
});
