"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsDir = void 0;
function assetsDir() {
    const dir = '__dirname/../assets/';
    if (!dir) {
        throw new Error('ASSETS_DIR is not defined');
    }
    return dir.replace('__dirname', __dirname);
}
exports.assetsDir = assetsDir;
