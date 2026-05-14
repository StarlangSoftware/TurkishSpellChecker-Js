Turkish Spell Checker
============

This tool is a spelling checker for Modern Turkish. It detects spelling errors and corrects them appropriately, through its list of misspellings and matching to the Turkish dictionary.

Video Lectures
============

[<img src="https://github.com/StarlangSoftware/TurkishSpellChecker/blob/master/video.jpg" width="50%">](https://youtu.be/wKwTKv6Jlo0)

For Developers
============

You can also see [Java](https://github.com/starlangsoftware/TurkishSpellChecker), [Php](https://github.com/starlangsoftware/TurkishSpellChecker-Php), [Python](https://github.com/starlangsoftware/TurkishSpellChecker-Py), 
[Cython](https://github.com/starlangsoftware/TurkishSpellChecker-Cy), [Swift](https://github.com/starlangsoftware/TurkishSpellChecker-Swift), 
[C++](https://github.com/starlangsoftware/TurkishSpellChecker-CPP), [C](https://github.com/starlangsoftware/TurkishSpellChecker-C), or [C#](https://github.com/starlangsoftware/TurkishSpellChecker-CS) repository.

## Requirements

* [Node.js 14 or higher](#Node.js)
* [Git](#git)

### Node.js 

To check if you have a compatible version of Node.js installed, use the following command:

    node -v
    
You can find the latest version of Node.js [here](https://nodejs.org/en/download/).

### Git

Install the [latest version of Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Npm Install

	npm install nlptoolkit-spellchecker
	
## Download Code

In order to work on code, create a fork from GitHub page. 
Use Git for cloning the code to your local or below line for Ubuntu:

	git clone <your-fork-git-link>

A directory called util will be created. Or you can use below link for exploring the code:

	git clone https://github.com/starlangsoftware/turkishspellchecker-js.git

## Open project with Webstorm IDE

Steps for opening the cloned project:

* Start IDE
* Select **File | Open** from main menu
* Choose `SepllChecker-Js` file
* Select open as project option
* Couple of seconds, dependencies will be downloaded. 

Detailed Description
============

+ [Creating SpellChecker](#creating-spellchecker)
+ [Spell Correction](#spell-correction)

## Creating SpellChecker

SpellChecker finds spelling errors and corrects them in Turkish. There are two types of spell checker available:

* `SimpleSpellChecker`
    
    * To instantiate this, a `FsmMorphologicalAnalyzer` is needed. 
        
            let fsm = FsmMorphologicalAnalyzer();
            let spellChecker = SimpleSpellChecker(fsm);   
     
* `NGramSpellChecker`,
    
    * To create an instance of this, both a `FsmMorphologicalAnalyzer` and a `NGram` is required. 
    
    * `FsmMorphologicalAnalyzer` can be instantiated as follows:
        
            let fsm = FsmMorphologicalAnalyzer();
    
    * `NGram` can be either trained from scratch or loaded from an existing model.
        
        * Training from scratch:
                
                let corpus = Corpus("corpus.txt"); 
                let ngram = NGram(corpus.getAllWords(), 1);
                ngram.calculateNGramProbabilities(new LaplaceSmoothing());
                
        *There are many smoothing methods available. For other smoothing methods, check [here](https://github.com/olcaytaner/NGram).*       
        * Loading from an existing model:
     
                let ngram = NGram("ngram.txt");

	*For further details, please check [here](https://github.com/starlangsoftware/NGram).*        
            
    * Afterwards, `NGramSpellChecker` can be created as below:
        
            let spellChecker = NGramSpellChecker(fsm, ngram);
     

## Spell Correction

Spell correction can be done as follows:

    let sentence = new Sentence("Dıktor olaç yazdı");
    let corrected = spellChecker.spellCheck(sentence);
    Console.log(corrected);
    
Output:

    Doktor ilaç yazdı

For Contibutors
============

### package.json file

1. main and types are important when this package will be imported.
```
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
```
2. Dependencies should be maximum (not only direct but also indirect references should also be given), everything directly in the code should be given here.
```
  "dependencies": {
    "nlptoolkit-corpus": "^1.0.12",
    "nlptoolkit-dictionary": "^1.0.14",
    "nlptoolkit-morphologicalanalysis": "^1.0.19",
    "nlptoolkit-xmlparser": "^1.0.7"
  }
```

### tsconfig.json file

1. Compiler flags currently includes nodeNext for importing.
```
  "compilerOptions": {
    "outDir": "dist",
    "module": "nodeNext",
    "sourceMap": true,
    "noImplicitAny": true,
    "removeComments": false,
    "declaration": true,
  },
```
2. tests, node_modules and dist should be excluded.
```
  "exclude": [
    "tests",
    "node_modules",
    "dist"
  ]
```

### index.ts file

1. Should include all ts classes.
```
export * from "./CategoryType"
export * from "./InterlingualDependencyType"
export * from "./InterlingualRelation"
export * from "./Literal"
```

### Data files
1. Add data files to the project folder. Subprojects should include all data files of the parent projects.

### Javascript files

1. Classes should be defined as exported.
```
export class JCN extends ICSimilarity{
```
2. Do not forget to comment each function.
```
    /**
     * Computes JCN wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return JCN wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
```
3. Function names should follow caml case.
```
    setSynSetId(synSetId: string){
```
4. Write getter and setter methods.
```
    getRelation(index: number): Relation{
    setName(name: string){
```
5. Use standard javascript test style.
```
describe('SimilarityPathTest', function() {
    describe('SimilarityPathTest', function() {
        it('testComputeSimilarity', function() {
            let turkish = new WordNet();
            let similarityPath = new SimilarityPath(turkish);
            assert.strictEqual(32.0, similarityPath.computeSimilarity(turkish.getSynSetWithId("TUR10-0656390"), turkish.getSynSetWithId("TUR10-0600460")));
            assert.strictEqual(13.0, similarityPath.computeSimilarity(turkish.getSynSetWithId("TUR10-0412120"), turkish.getSynSetWithId("TUR10-0755370")));
            assert.strictEqual(13.0, similarityPath.computeSimilarity(turkish.getSynSetWithId("TUR10-0195110"), turkish.getSynSetWithId("TUR10-0822980")));
        });
    });
});
```
6. Enumerated types should be declared with enum.
```
export enum CategoryType {
    MATHEMATICS, SPORT, MUSIC, SLANG, BOTANIC,
    PLURAL, MARINE, HISTORY, THEOLOGY, ZOOLOGY,
    METAPHOR, PSYCHOLOGY, ASTRONOMY, GEOGRAPHY, GRAMMAR,
    MILITARY, PHYSICS, PHILOSOPHY, MEDICAL, THEATER,
    ECONOMY, LAW, ANATOMY, GEOMETRY, BUSINESS,
    PEDAGOGY, TECHNOLOGY, LOGIC, LITERATURE, CINEMA,
    TELEVISION, ARCHITECTURE, TECHNICAL, SOCIOLOGY, BIOLOGY,
    CHEMISTRY, GEOLOGY, INFORMATICS, PHYSIOLOGY, METEOROLOGY,
    MINERALOGY
}
```
7. If there are multiple constructors for a class, define them as constructor1, constructor2, ..., then from the original constructor call these methods.
```
    constructor1(symbol: any){
    constructor2(symbol: any, multipleFile: MultipleFile) {
    constructor(symbol: any, multipleFile: MultipleFile = undefined) {
        if (multipleFile == undefined){
            this.constructor1(symbol);
        } else {
            this.constructor2(symbol, multipleFile);
        }
    }
```
8. Importing should be done via import method with referencing the node-modules.
```
import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
```
9. Use xmlparser package for parsing xml files.
```
	var doc = new XmlDocument("test.xml")
	doc.parse()
	let root = doc.getFirstChild()
	let firstChild = root.getFirstChild()
```
