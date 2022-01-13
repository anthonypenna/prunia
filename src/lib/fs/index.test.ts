import * as fs from 'fs'
import { afterEach, beforeEach, describe, expect, it, JestMockCompat, vi } from 'vitest'
import { getDirectoryContents } from '~/lib/fs'

vi.mock('fs', () => ({
	readdirSync: vi.fn()
}))

describe('getDirectoryContents', () => {
	let readdirSync: JestMockCompat

	beforeEach(() => {
		readdirSync = fs.readdirSync as unknown as JestMockCompat
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should return the contents of the current directory', () => {
		readdirSync.mockReturnValue(['node_modules', 'src'])
		expect(getDirectoryContents()).toEqual(['node_modules', 'src'])
	})
})
