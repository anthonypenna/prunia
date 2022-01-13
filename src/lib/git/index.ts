import { getDirectoryContents } from '~/lib/fs'
import { $ } from '~/lib/shell'

export const isGitRepository = () => {
	const directoryContents = getDirectoryContents()
	return directoryContents.includes('.git')
}

export const getPrunableBranches = () => {
	const pruneOutput = $('git fetch --prune --progress &> .prunia/output && cat .prunia/output')

	if (!pruneOutput) {
		return []
	}

	const branchNames = pruneOutput
		.split('\n')
		.filter(outputLine => outputLine.includes('[deleted]'))
		.map(outputLine => outputLine.split('->'))
		.map(([_, branchName]) => branchName.replace('origin/', ''))
		.map(branchName => branchName.trim())

	return branchNames
}

export const deleteBranch = (branchName: string) => {
	$(`git branch -D ${branchName}`)
}
