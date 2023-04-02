"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAllRequiredArgsAreGiven = void 0;
const checkIfAllRequiredArgsAreGiven = (commandArgs, givenArgs) => {
    let notGivenArgs = [];
    commandArgs.forEach((arg, index) => {
        if (!arg.required) {
            return;
        }
        if (givenArgs.length <= index) {
            notGivenArgs = [...notGivenArgs, arg];
        }
    });
    return notGivenArgs;
};
exports.checkIfAllRequiredArgsAreGiven = checkIfAllRequiredArgsAreGiven;
