import * as shell from '~/lib/shell'
import { afterEach, beforeEach, describe, expect, it, JestMockCompat, vi } from 'vitest'
import { setupPrunia } from '~/lib/prunia'

describe('setupPrunia', () => {
	let $: JestMockCompat

	beforeEach(() => {
		$ = vi.spyOn(shell, '$').mockImplementation(() => '')
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should remove the existing prunia folder', () => {
		setupPrunia()
		expect($).toHaveBeenNthCalledWith(1, 'rm -rf .prunia')
	})

	it('should create a new prunia folder', () => {
		setupPrunia()
		expect($).toHaveBeenNthCalledWith(2, 'mkdir .prunia')
	})

	it('should create a new prunia output file', () => {
		setupPrunia()
		expect($).toHaveBeenNthCalledWith(3, 'touch .prunia/output')
	})
})
