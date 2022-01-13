import { readdirSync } from 'fs'

export const getDirectoryContents = (): string[] => {
	return readdirSync('./', { encoding: 'utf-8' })
}
