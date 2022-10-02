import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {Operator} from "./Operator";

export class Candidate extends Word{

    private readonly operator: Operator

    constructor(candidate: string, operator: Operator) {
        super(candidate);
        this.operator = operator
    }

    getOperator(): Operator{
        return this.operator
    }

}