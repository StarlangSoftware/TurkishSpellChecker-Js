export class SpellCheckerParameter {

    private threshold: number
    private deMiCheck: boolean
    private rootNGram: boolean

    constructor() {
        this.threshold = 0.0
        this.deMiCheck = true
        this.rootNGram = true
    }

    public setThreshold(threshold: number){
        this.threshold = threshold
    }

    public setDeMiCheck(deMiCheck: boolean){
        this.deMiCheck = deMiCheck
    }

    public setRootNGram(rootNGram: boolean){
        this.rootNGram = rootNGram
    }

    public getThreshold(): number{
        return this.threshold
    }

    public isDeMiCheck(): boolean{
        return this.deMiCheck
    }

    public isRootNGram(): boolean{
        return this.rootNGram
    }

}