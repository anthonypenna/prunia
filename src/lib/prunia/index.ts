import { $ } from '~/lib/shell'

export const setupPrunia = () => {
	$('rm -rf .prunia')
	$('mkdir .prunia')
	$('touch .prunia/output')
}
