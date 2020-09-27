"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
var js_cookie_1 = __importDefault(require("js-cookie"));
var Storage = /** @class */ (function () {
    function Storage() {
        Storage.hasToken =
            !!localStorage.getItem(Storage.base64TokenName) ||
                !!js_cookie_1.default.get(Storage.base64TokenName);
    }
    Storage.setToken = function (tokens, type) {
        tokens = btoa(JSON.stringify(tokens));
        if (type === "cookies")
            js_cookie_1.default.set(this.base64TokenName, tokens);
        localStorage.setItem(this.base64TokenName, tokens);
    };
    Storage.getToken = function (type) {
        var tokens;
        if (type === "cookies")
            tokens = js_cookie_1.default.get(this.base64TokenName);
        tokens = localStorage.getItem(this.base64TokenName);
        return JSON.parse(atob(tokens));
    };
    Storage.base64TokenName = btoa("teapot");
    return Storage;
}());
exports.Storage = Storage;
