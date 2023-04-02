"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'ready',
    run: (client) => {
        var _a;
        console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} is online!`);
    },
};
