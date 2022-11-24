export declare class SpellCheckerParameter {
    private threshold;
    private deMiCheck;
    private rootNGram;
    constructor();
    setThreshold(threshold: number): void;
    setDeMiCheck(deMiCheck: boolean): void;
    setRootNGram(rootNGram: boolean): void;
    getThreshold(): number;
    isDeMiCheck(): boolean;
    isRootNGram(): boolean;
}
