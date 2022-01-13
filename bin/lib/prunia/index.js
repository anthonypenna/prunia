"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPrunia = void 0;
const shell_1 = require("~/lib/shell");
const setupPrunia = () => {
    (0, shell_1.$)('rm -rf .prunia');
    (0, shell_1.$)('mkdir .prunia');
    (0, shell_1.$)('touch .prunia/output');
};
exports.setupPrunia = setupPrunia;
