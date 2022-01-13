"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = void 0;
const child_process_1 = require("child_process");
const $ = (command) => (0, child_process_1.execSync)(command, { encoding: 'utf-8' });
exports.$ = $;
