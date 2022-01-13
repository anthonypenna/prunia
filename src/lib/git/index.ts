import { getDirectoryContents } from '~/lib/fs'
import { $ } from '~/lib/shell'

export const isGitRepository = (): boolean => {
	const directoryContents = getDirectoryContents()
	return directoryContents.includes('.git')
}

export const getPrunableBranches = (): string[] => {
	const pruneOutput = $('git fetch --prune --progress &> .prunia && cat .prunia')

	if (!pruneOutput) {
		return []
	}

	const branchNames = pruneOutput
		.split('\n')
		.filter(line => line.includes('[deleted]'))
		.map(line => line.split('->'))
		.map(([_, branchName]) => branchName.replace('origin/', ''))

	if (branchNames.length === 0) {
		return []
	}

	$('rm .prunia')

	const branchNamesWithoutForwardSlash = branchNames.map(branchName => branchName.slice(1))
	return branchNamesWithoutForwardSlash
}

export const deleteBranch = (branchName: string): void => {
	$(`git branch -D ${branchName}`)
}
