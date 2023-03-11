(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Operator = void 0;
    var Operator;
    (function (Operator) {
        /** No change is made to the Word. */
        Operator[Operator["NO_CHANGE"] = 0] = "NO_CHANGE";
        /** The Word is changed into a Word in the misspellings list */
        Operator[Operator["MISSPELLED_REPLACE"] = 1] = "MISSPELLED_REPLACE";
        /** The Word is changed into a Candidate by deleting, adding, replacing a character or swapping two consecutive characters. */
        Operator[Operator["SPELL_CHECK"] = 2] = "SPELL_CHECK";
        /** The Word is split into multiple Candidates. */
        Operator[Operator["SPLIT"] = 3] = "SPLIT";
        /** The Word and the Word after are merged into one Candidate. */
        Operator[Operator["FORWARD_MERGE"] = 4] = "FORWARD_MERGE";
        /** The Word and the Word before are merged into one Candidate. */
        Operator[Operator["BACKWARD_MERGE"] = 5] = "BACKWARD_MERGE";
        /** The Word is changed into a Candidate based on the context based spell checking algorithm. */
        Operator[Operator["CONTEXT_BASED"] = 6] = "CONTEXT_BASED";
        /** The Word is changed into a Candidate based on the trie based spell checking algorithm. */
        Operator[Operator["TRIE_BASED"] = 7] = "TRIE_BASED";
    })(Operator = exports.Operator || (exports.Operator = {}));
});
//# sourceMappingURL=Operator.js.map