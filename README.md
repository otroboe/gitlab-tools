# Gitlab Tools

## Requirements

- node
- corepack
- nvm
- pnpm

## Gitlab Token

You need to create your own PAT (Personal Access Token), follow the guide [here](https://docs.gitlab.com/user/profile/personal_access_tokens/).

## Install

Install environment and packages

```bash
nvm use
corepack enable pnpm
pnpm i
```

Prepare env variables, copy the files and change variables for your needs.

```bash
cp .env.example .env
```

## Commands

```bash
# Check sanity
pnpm check:all

# Upgrade deps
pnpm update --latest -interactive
```

## Recommended VSCode settings

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative",
  "files.trimTrailingWhitespace": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "typescript"],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Resources

- [TS Config Reference](https://www.typescriptlang.org/tsconfig/)
- [Gitbeaker](https://www.npmjs.com/package/@gitbeaker/rest)
- [Gitbeaker Supported APIs](https://github.com/jdalrymple/gitbeaker/blob/main/packages/core/README.md#supported-apis)

## Commands

```bash
# List the groups you have access to
pnpm show:groups
```
