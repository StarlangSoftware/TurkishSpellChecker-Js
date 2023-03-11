export declare enum Operator {
    /** No change is made to the Word. */
    NO_CHANGE = 0,
    /** The Word is changed into a Word in the misspellings list */
    MISSPELLED_REPLACE = 1,
    /** The Word is changed into a Candidate by deleting, adding, replacing a character or swapping two consecutive characters. */
    SPELL_CHECK = 2,
    /** The Word is split into multiple Candidates. */
    SPLIT = 3,
    /** The Word and the Word after are merged into one Candidate. */
    FORWARD_MERGE = 4,
    /** The Word and the Word before are merged into one Candidate. */
    BACKWARD_MERGE = 5,
    /** The Word is changed into a Candidate based on the context based spell checking algorithm. */
    CONTEXT_BASED = 6,
    /** The Word is changed into a Candidate based on the trie based spell checking algorithm. */
    TRIE_BASED = 7
}
