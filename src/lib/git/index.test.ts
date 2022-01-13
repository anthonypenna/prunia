import * as fs from '~/lib/fs'
import * as shell from '~/lib/shell'
import { afterEach, beforeEach, describe, expect, it, JestMockCompat, vi } from 'vitest'
import { deleteBranch, getPrunableBranches, isGitRepository } from '~/lib/git'

vi.mock('~/lib/shell', () => ({
	$: vi.fn()
}))

describe('isGitRepository', () => {
	let getDirectoryContents: JestMockCompat

	beforeEach(() => {
		getDirectoryContents = vi.spyOn(fs, 'getDirectoryContents').mockReturnValue(['node_modules', 'src'])
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('when the current directory isnt a git repository', () => {
		beforeEach(() => {
			getDirectoryContents.mockReturnValue(['node_modules', 'src'])
		})

		it('should return false', () => {
			expect(isGitRepository()).toEqual(false)
		})
	})

	describe('when the current directory is a git repository', () => {
		beforeEach(() => {
			getDirectoryContents.mockReturnValue(['.git', 'node_modules', 'src'])
		})

		it('should return false', () => {
			expect(isGitRepository()).toEqual(true)
		})
	})
})

describe('getPrunableBranches', () => {
	let $: JestMockCompat

	beforeEach(() => {
		$ = vi.spyOn(shell, '$')
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('when there are no prunable branches', () => {
		beforeEach(() => {
			$.mockReturnValue('')
		})

		it('should return an empty array', () => {
			expect(getPrunableBranches()).toEqual([])
		})
	})

	describe('when there are prunable branches', () => {
		beforeEach(() => {
			$.mockReturnValue(`
			From url
			 - [deleted] (none) -> origin/branch-a
			 - [deleted] (none) -> origin/branch-b
			 - [deleted] (none) -> origin/branch-c
			`)
		})

		it('should return an array of branch names', () => {
			expect(getPrunableBranches()).toEqual(['branch-a', 'branch-b', 'branch-c'])
		})
	})
})

describe('deleteBranch', () => {
	let $: JestMockCompat

	beforeEach(() => {
		$ = vi.spyOn(shell, '$')
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should delete the specified branch', () => {
		deleteBranch('branch-a')
		expect($).toHaveBeenCalledWith('git branch -D branch-a')
	})
})
