"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prunia = void 0;
const console_1 = require("~/lib/console");
const git_1 = require("~/lib/git");
const prunia_1 = require("~/lib/prunia");
const prunia = () => {
    if (!(0, git_1.isGitRepository)()) {
        (0, console_1.warn)('Not a git repository.');
        return;
    }
    (0, prunia_1.setupPrunia)();
    const prunableBranches = (0, git_1.getPrunableBranches)();
    if (prunableBranches.length === 0) {
        (0, console_1.log)('No branches to prune.');
        return;
    }
    prunableBranches.forEach(branch => {
        (0, git_1.deleteBranch)(branch);
        (0, console_1.log)(`Pruned branch "${branch}".`);
    });
    (0, console_1.log)('Done.');
};
exports.prunia = prunia;
