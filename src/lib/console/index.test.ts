import chalk from 'chalk'
import { afterEach, beforeEach, describe, expect, it, JestMockCompat, vi } from 'vitest'
import { log, warn } from '~/lib/console'

vi.mock('chalk', () => ({
	default: {
		magenta: vi.fn(),
		yellow: vi.fn()
	}
}))

describe('log', () => {
	let consoleLog: JestMockCompat

	beforeEach(() => {
		console.log = vi.fn()
		consoleLog = console.log as unknown as JestMockCompat
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should log the prunia prefix with the correct color', () => {
		log('hello world')
		expect(chalk.magenta).toHaveBeenCalledWith('[prunia]')
	})

	it('should log the correct message', () => {
		log('hello world')
		expect(consoleLog.mock.calls[0][1]).toEqual('hello world')
	})
})

describe('warn', () => {
	let consoleLog: JestMockCompat

	beforeEach(() => {
		console.log = vi.fn()
		consoleLog = console.log as unknown as JestMockCompat
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should log the prunia prefix with the correct color', () => {
		warn('hello world')
		expect(chalk.yellow).toHaveBeenCalledWith('[prunia]')
	})

	it('should log the correct message', () => {
		warn('hello world')
		expect(consoleLog.mock.calls[0][1]).toEqual('hello world')
	})
})
