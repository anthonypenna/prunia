import chalk from 'chalk'

export const log = (message: string) => console.log(chalk.magenta('[prunia]'), message)

export const warn = (message: string) => console.log(chalk.yellow('[prunia]'), message)
