"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
class Candidate extends Word_1.Word {
    operator;
    /**
     * Constructs a new Candidate object with the specified candidate and operator.
     *
     * @param candidate The word candidate to be checked for spelling.
     * @param operator The operator to be applied to the candidate in the spell checking process.
     */
    constructor(candidate, operator) {
        super(candidate);
        this.operator = operator;
    }
    /**
     * Returns the operator associated with this candidate.
     *
     * @return The operator associated with this candidate.
     */
    getOperator() {
        return this.operator;
    }
}
exports.Candidate = Candidate;
//# sourceMappingURL=Candidate.js.map