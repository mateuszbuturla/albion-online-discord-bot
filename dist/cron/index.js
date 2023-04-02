"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cron = void 0;
const content_1 = require("./content");
class Cron {
    constructor() {
        this.content();
    }
    content() {
        setInterval(() => {
            (0, content_1.CRONContent)();
        }, 1000 * 60);
    }
}
exports.Cron = Cron;
