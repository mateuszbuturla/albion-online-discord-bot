"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (message) => {
    const date = new Date(), dateFormated = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') +
        ' ' +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
    console.log(`[${dateFormated}] ${message}`);
};
exports.logger = logger;
