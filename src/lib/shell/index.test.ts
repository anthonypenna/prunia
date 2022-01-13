import * as childProcess from 'child_process'
import { afterEach, beforeEach, describe, expect, it, JestMockCompat, vi } from 'vitest'
import { $ } from '~/lib/shell'

vi.mock('child_process', () => ({
	execSync: vi.fn()
}))

describe('$', () => {
	let execSync: JestMockCompat

	beforeEach(() => {
		execSync = vi.spyOn(childProcess, 'execSync')
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should execute the specified command', () => {
		$('echo hello')
		expect(execSync.mock.calls[0][0]).toEqual('echo hello')
	})

	it('should use the correct encoding', () => {
		$('echo hello')
		expect(execSync.mock.calls[0][1]).toEqual({ encoding: 'utf-8' })
	})
})
