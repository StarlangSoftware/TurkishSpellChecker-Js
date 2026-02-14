var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NGramSpellChecker", "./SimpleSpellChecker", "./SpellChecker", "./Candidate", "./ContextBasedSpellChecker", "./Operator", "./SpellCheckerParameter", "./Trie", "./TrieBasedSpellChecker", "./TrieCandidate", "./TrieNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./NGramSpellChecker"), exports);
    __exportStar(require("./SimpleSpellChecker"), exports);
    __exportStar(require("./SpellChecker"), exports);
    __exportStar(require("./Candidate"), exports);
    __exportStar(require("./ContextBasedSpellChecker"), exports);
    __exportStar(require("./Operator"), exports);
    __exportStar(require("./SpellCheckerParameter"), exports);
    __exportStar(require("./Trie"), exports);
    __exportStar(require("./TrieBasedSpellChecker"), exports);
    __exportStar(require("./TrieCandidate"), exports);
    __exportStar(require("./TrieNode"), exports);
});
//# sourceMappingURL=index.js.map