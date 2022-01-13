import { readdirSync } from 'fs'

export const getDirectoryContents = () => {
	return readdirSync('./', { encoding: 'utf-8' })
}
