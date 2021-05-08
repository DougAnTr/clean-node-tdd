"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    token: 'any_token',
    id: '',
    secret: '',
    sign: function (id, secret) {
        this.id = id;
        this.secret = secret;
        return this.token;
    },
};
