# Contributing

These notes are for developers wanting to create or modify error pages in this repository.

## Installing development dependencies

1. [Install NVM](https://github.com/creationix/nvm)
2. `git clone git@github.com:tedconf/error_pages.git`
3. Change into the new directory
4. `nvm use` and if the required Node version is not installed on your system, `nvm install <version>`
5. `npm install`

## Local development

After installing development dependencies (instructions above), simply run:

```
npm start
```

Gulp will build the error pages, start a server, and open a new window in your default browser listing the contents of the `dist` folder for you to preview error pages.

Output will be regenerated in the `dist` folder for each change you make.

## Code overview

Source for the HTTP status pages can be found in `src/statuses`.

Each status page is generated from a markdown file with some YAML front matter. Adding a new error page is as simple as creating a new `.md` file, named according to its HTTP status code.

Templates used to generate the surrounding HTML are kept in `src/templates`. `src/templates/status.hbs` is used for the markdown-based error pages. Custom templates can also be added to this directory (e.g. `src/templates/maintenance.hbs`) and will each generate their own HTML page.

CSS is kept in `src/styles` and `src/assets`. Any CSS or image assets referenced in the templates will be inlined automatically during the build process so that the static output is as portable as possible.

## Cutting a new release

1. `npm run build` to update distribution files
2. Update the version number in `package.json`
3. Commit, then tag your new version and push upstream
