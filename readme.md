# TED.com Error Pages

This code generates static error pages (404, 500, etc.) for use on TED websites.

## Usage

Static HTML error pages can be found in this repository's [`dist`](https://github.com/tedconf/error_pages/tree/master/dist) folder. Copy these files to your own application by the method that seems most appropriate to you.

## Contributing

### Prerequisites

Use [NVM](https://github.com/creationix/nvm) to make sure you have the correct Node version installed for local development.

### Installation

* `git clone git@github.com:tedconf/error_pages.git`
* Change into the new directory
* `nvm use` and if the required Node version is not installed on your system, `nvm install <version>`
* `npm install`

### Running the compiler

To regenerate the distributable error pages from source:

```
npm run gulp
```

Static HTML output will be generated into the `dist` folder.

### Modifying code

Source for the HTTP status pages can be found in `src/statuses`. Each status page is generated from a markdown file with some YAML front matter. Adding a new error page is as simple as creating a new `.md` file named according to that status code.

Templates used to generate the surrounding HTML are kept in `src/templates`. `src/templates/status.hbs` is used for the markdown-based error pages. Custom templates can also be added to this directory (e.g. `src/templates/maintenance.hbs`) and will each generate their own HTML page.

CSS is kept in `src/styles` and `src/assets`. Any CSS or image assets referenced in the templates will be inlined automatically during the build process so that the static output is as portable as possible.
