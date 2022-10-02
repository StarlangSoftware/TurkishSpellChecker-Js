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
        Operator[Operator["NO_CHANGE"] = 0] = "NO_CHANGE";
        Operator[Operator["MISSPELLED_REPLACE"] = 1] = "MISSPELLED_REPLACE";
        Operator[Operator["FORCED_MERGE"] = 2] = "FORCED_MERGE";
        Operator[Operator["FORCED_SPLIT"] = 3] = "FORCED_SPLIT";
        Operator[Operator["SPLIT_WITH_SHORTCUT"] = 4] = "SPLIT_WITH_SHORTCUT";
        Operator[Operator["SPELL_CHECK"] = 5] = "SPELL_CHECK";
        Operator[Operator["SPLIT"] = 6] = "SPLIT";
        Operator[Operator["FORWARD_MERGE"] = 7] = "FORWARD_MERGE";
        Operator[Operator["BACKWARD_MERGE"] = 8] = "BACKWARD_MERGE";
    })(Operator = exports.Operator || (exports.Operator = {}));
});
//# sourceMappingURL=Operator.js.map