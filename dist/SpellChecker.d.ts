import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
export interface SpellChecker {
    /**
     * The spellCheck method which takes a {@link Sentence} as an input.
     *
     * @param sentence {@link Sentence} type input.
     * @return Sentence result.
     */
    spellCheck(sentence: Sentence): Sentence;
}
