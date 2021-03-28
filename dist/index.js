"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App() {
        this.server = express_1.default();
        this.port = 3000;
    }
    App.prototype.init = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log("Application running on http://localhost:" + _this.port);
        });
    };
    return App;
}());
var app = new App();
app.init();
