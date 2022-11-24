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
    exports.SpellCheckerParameter = void 0;
    class SpellCheckerParameter {
        constructor() {
            this.threshold = 0.0;
            this.deMiCheck = true;
            this.rootNGram = true;
        }
        setThreshold(threshold) {
            this.threshold = threshold;
        }
        setDeMiCheck(deMiCheck) {
            this.deMiCheck = deMiCheck;
        }
        setRootNGram(rootNGram) {
            this.rootNGram = rootNGram;
        }
        getThreshold() {
            return this.threshold;
        }
        isDeMiCheck() {
            return this.deMiCheck;
        }
        isRootNGram() {
            return this.rootNGram;
        }
    }
    exports.SpellCheckerParameter = SpellCheckerParameter;
});
//# sourceMappingURL=SpellCheckerParameter.js.map