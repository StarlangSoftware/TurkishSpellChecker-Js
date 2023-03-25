import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { Operator } from "./Operator";
export declare class Candidate extends Word {
    private readonly operator;
    /**
     * Constructs a new Candidate object with the specified candidate and operator.
     *
     * @param candidate The word candidate to be checked for spelling.
     * @param operator The operator to be applied to the candidate in the spell checking process.
     */
    constructor(candidate: string, operator: Operator);
    /**
     * Returns the operator associated with this candidate.
     *
     * @return The operator associated with this candidate.
     */
    getOperator(): Operator;
}
