"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isValid: true,
    value: '',
    hash: '',
    compare: function (value, hash) {
        this.value = value;
        this.hash = hash;
        return this.isValid;
    },
};
