"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.getPrunableBranches = exports.isGitRepository = void 0;
const fs_1 = require("~/lib/fs");
const shell_1 = require("~/lib/shell");
const isGitRepository = () => {
    const directoryContents = (0, fs_1.getDirectoryContents)();
    return directoryContents.includes('.git');
};
exports.isGitRepository = isGitRepository;
const getPrunableBranches = () => {
    const pruneOutput = (0, shell_1.$)('git fetch --prune --progress &> .prunia && cat .prunia');
    if (!pruneOutput) {
        return [];
    }
    const branchNames = pruneOutput
        .split('\n')
        .filter(line => line.includes('[deleted]'))
        .map(line => line.split('->'))
        .map(([_, branchName]) => branchName.replace('origin/', ''));
    if (branchNames.length === 0) {
        return [];
    }
    (0, shell_1.$)('rm .prunia');
    const branchNamesWithoutForwardSlash = branchNames.map(branchName => branchName.slice(1));
    return branchNamesWithoutForwardSlash;
};
exports.getPrunableBranches = getPrunableBranches;
const deleteBranch = (branchName) => {
    (0, shell_1.$)(`git branch -D ${branchName}`);
};
exports.deleteBranch = deleteBranch;
