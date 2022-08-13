# Prunia

Automatically prune merged branches.

## Installation

```
$ npm add -D prunia
```

## Usage

```
$ npx prunia
```

## Usage in a Husky post-merge hook 

```jsonc
// package.json
{
	"husky": {
		"hooks": {
			"post-merge": "prunia"
		}
	}
}
```
