import { log, warn } from '~/lib/console'
import { deleteBranch, getPrunableBranches, isGitRepository } from '~/lib/git'

export const prunia = () => {
	if (!isGitRepository()) {
		warn('Not a git repository.')
		return
	}

	const prunableBranches = getPrunableBranches()

	if (prunableBranches.length === 0) {
		log('No branches to prune.')
		return
	}

	prunableBranches.forEach(branch => {
		deleteBranch(branch)
		log(`Pruned branch "${branch}".`)
	})

	log('Done.')
}
