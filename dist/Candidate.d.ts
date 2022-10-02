import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { Operator } from "./Operator";
export declare class Candidate extends Word {
    private readonly operator;
    constructor(candidate: string, operator: Operator);
    getOperator(): Operator;
}
