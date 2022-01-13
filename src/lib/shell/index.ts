import { execSync } from 'child_process'

export const $ = (command: string) => execSync(command, { encoding: 'utf-8' })
