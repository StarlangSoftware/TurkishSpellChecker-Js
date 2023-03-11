import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {NGram} from "nlptoolkit-ngram/dist/NGram";
import {NoSmoothing} from "nlptoolkit-ngram/dist/NoSmoothing";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {SpellCheckerParameter} from "../dist/SpellCheckerParameter";
import * as assert from "assert";
import {ContextBasedSpellChecker} from "../dist/ContextBasedSpellChecker";

describe('ContextBasedSpellCheckerTest', function() {
    describe('ContextBasedSpellCheckerTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let nGram = new NGram<string>("ngram.txt");
        nGram.calculateNGramProbabilitiesSimple(new NoSmoothing<string>());
        it('testSpellCheck', function() {
            this.timeout(3000);
            let original = [new Sentence("bugünkü ortaöğretim sisteminin oluşumu Cumhuriyet döneminde gerçekleşmiştir"),
                new Sentence("bilinçsizce dağıtılan kredilerin sorun yaratmayacağını düşünmelerinin nedeni bankaların büyüklüğünden kaynaklanıyordu"),
                new Sentence("Yemen'de ekonomik durgunluk nedeniyle yeni bir insani kriz yaşanabileceği uyarısı yapıldı"),
                new Sentence("hafif ticari araç bariyerlere çarptı"),
                new Sentence("olayı akşam haberlerinde birinci haber olarak verdiler"),
                new Sentence("dünyada geçen hafta da iktidarları sallayan sosyal çalkantılarla dolu geçti"),
                new Sentence("sırtıkara adındaki canlı , bir balıktır"),
                new Sentence("siyah ayı , ayıgiller familyasına ait bir ayı türüdür"),
                new Sentence("yeni sezon başladı gibi"),
                new Sentence("alışveriş için markete gitti"),
                new Sentence("küçük bir yalıçapkını geçti"),
                new Sentence("meslek odaları birliği yeniden toplandı"),
                new Sentence("yeni yılın sonrasında vakalarda artış oldu"),
                new Sentence("atomik saatin 10 mhz sinyali kalibrasyon hizmetlerinde referans olarak kullanılmaktadır"),
                new Sentence("rehberimiz bu bölgedeki çıngıraklı yılan varlığı hakkında konuştu"),
                new Sentence("bu haksızlık da unutulup gitmişti"),
                new Sentence("4'lü tahıl zirvesi İstanbul'da gerçekleşti"),
                new Sentence("10'luk sistemden 100'lük sisteme geçiş yapılacak"),
                new Sentence("play-off maçlarına çıkacak takımlar belli oldu"),
                new Sentence("bu son model cihaz 24 inç ekran büyüklüğünde ve 9 kg ağırlıktadır")];
            let modified = [new Sentence("bugünki ortögretim sisteminin oluşumu Cumhuriyet döneminde gerçekleşmiştir"),
                new Sentence("billinçiszce dağıtılan kredilerin sorun yaratmayacağını düşünmelerinin nedeni bankaların büyüklüğünden kaynaklanıyordu"),
                new Sentence("Yemen'de ekonomik durrğunlk nedeniyle yeni bir insani kriz yaşanabileceği uyaarisi yapıldı"),
                new Sentence("hafif ricarii araç aryerlere çarptı"),
                new Sentence("olayi akşam haberlerinde birinci haber olrak verdiler"),
                new Sentence("dünyada geçen hafta da iktida rları sallayan soyals çalkantılarla dolu geçti"),
                new Sentence("sırtı kara adındaki canlı , bir balıktır"),
                new Sentence("siyahayı , ayıgiller familyasına ait bir ayı türüdür"),
                new Sentence("yeni se zon başladı gibs"),
                new Sentence("alis veriş için markete gitit"),
                new Sentence("kucuk bri yalı çapkını gecti"),
                new Sentence("mes lek odaları birliği yendien toplandı"),
                new Sentence("yeniyılın sonrasında vakalarda artış oldu"),
                new Sentence("atomik saatin 10mhz sinyali kalibrasyon hizmetlerinde referans olarka kullanılmaktadır"),
                new Sentence("rehperimiz buı bölgedeki çıngıraklıyılan varlıgı hakkınd konustu"),
                new Sentence("bu haksızlıkda unutulup gitmişti"),
                new Sentence("4 lı tahıl zirvesi İstanbul'da gerçekleşti"),
                new Sentence("10 lük sistemden 100 lık sisteme geçiş yapılacak"),
                new Sentence("play - off maçlarına çıkacak takımlar belli oldu"),
                new Sentence("bu son model ciha 24inç ekran büyüklüğünde ve 9kg ağırlıktadır")];
            let contextBasedSpellChecker = new ContextBasedSpellChecker(fsm, nGram, new SpellCheckerParameter())
            for (let i = 0; i < modified.length; i++){
                assert.strictEqual(original[i].toString(), contextBasedSpellChecker.spellCheck(modified[i]).toString())
            }
        });
    });
});
