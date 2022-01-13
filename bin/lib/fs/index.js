"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectoryContents = void 0;
const fs_1 = require("fs");
const getDirectoryContents = () => {
    return (0, fs_1.readdirSync)('./', { encoding: 'utf-8' });
};
exports.getDirectoryContents = getDirectoryContents;
