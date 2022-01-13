"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = (message) => console.log(chalk_1.default.magenta('[prunia]'), message);
exports.log = log;
const warn = (message) => console.log(chalk_1.default.yellow('[prunia]'), message);
exports.warn = warn;
