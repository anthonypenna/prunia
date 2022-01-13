import * as console from '~/lib/console'
import * as git from '~/lib/git'
import * as lib from '~/lib/prunia'
import { afterEach, beforeEach, describe, expect, it, JestMockCompat, vi } from 'vitest'
import { prunia } from '~/core'

vi.mock('~/lib/shell', () => ({
	$: vi.fn().mockReturnValue('')
}))

describe('prunia', () => {
	let deleteBranch: JestMockCompat
	let getPrunableBranches: JestMockCompat
	let log: JestMockCompat
	let warn: JestMockCompat
	let setupPrunia: JestMockCompat

	beforeEach(() => {
		deleteBranch = vi.spyOn(git, 'deleteBranch')
		getPrunableBranches = vi.spyOn(git, 'getPrunableBranches')
		log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
		warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
		setupPrunia = vi.spyOn(lib, 'setupPrunia')
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('when the current directory is not a git repository', () => {
		beforeEach(() => {
			vi.spyOn(git, 'isGitRepository').mockReturnValue(false)
		})

		it('should log a warning', () => {
			prunia()
			expect(warn).toHaveBeenCalledWith('Not a git repository.')
		})
	})

	describe('when the current directory is a git repository', () => {
		beforeEach(() => {
			vi.spyOn(git, 'isGitRepository').mockReturnValue(true)
		})

		it('should setup a new prunia directory', () => {
			prunia()
			expect(setupPrunia).toHaveBeenCalled()
		})

		describe('when there are no branches to prune', () => {
			beforeEach(() => {
				getPrunableBranches.mockReturnValue([])
			})

			it('should log a message', () => {
				prunia()
				expect(log).toHaveBeenCalledWith('No branches to prune.')
			})
		})

		describe('when there are branches to prune', () => {
			beforeEach(() => {
				getPrunableBranches.mockReturnValue(['branch-a', 'branch-b', 'branch-c'])
			})

			it('should prune every prunable branch', () => {
				prunia()
				expect(deleteBranch).toHaveBeenNthCalledWith(1, 'branch-a')
				expect(deleteBranch).toHaveBeenNthCalledWith(2, 'branch-b')
				expect(deleteBranch).toHaveBeenNthCalledWith(3, 'branch-c')
			})

			it('should log the name of each branch being pruned', () => {
				prunia()
				expect(log).toHaveBeenNthCalledWith(1, 'Pruned branch "branch-a".')
				expect(log).toHaveBeenNthCalledWith(2, 'Pruned branch "branch-b".')
				expect(log).toHaveBeenNthCalledWith(3, 'Pruned branch "branch-c".')
			})
		})
	})
})
