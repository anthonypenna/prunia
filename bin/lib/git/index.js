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
    const pruneOutput = (0, shell_1.$)('git fetch --prune --progress &> .prunia/output && cat .prunia/output');
    if (!pruneOutput) {
        return [];
    }
    const branchNames = pruneOutput
        .split('\n')
        .filter(outputLine => outputLine.includes('[deleted]'))
        .map(outputLine => outputLine.split('->'))
        .map(([_, branchName]) => branchName.replace('origin/', ''))
        .map(branchName => branchName.trim());
    return branchNames;
};
exports.getPrunableBranches = getPrunableBranches;
const deleteBranch = (branchName) => {
    (0, shell_1.$)(`git branch -D ${branchName}`);
};
exports.deleteBranch = deleteBranch;
