import { log, warn } from '~/lib/console'
import { deleteBranch, getPrunableBranches, isGitRepository } from '~/lib/git'
import { setupPrunia } from '~/lib/prunia'

export const prunia = () => {
	if (!isGitRepository()) {
		warn('Not a git repository.')
		return
	}

	setupPrunia()

	const prunableBranches = getPrunableBranches()

	if (prunableBranches.length === 0) {
		log('No branches to prune.')
		return
	}

	for (const branch of prunableBranches) {
		deleteBranch(branch)
		log(`Pruned branch "${branch}".`)
	}

	log('Done.')
}
