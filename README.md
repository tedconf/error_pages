# TED Error Pages

This Rails gem houses the error pages used for TED sites and web
apps.

## Deprecation notice

If you have been consuming this repository as a gem, please copy the static HTML pages to your public folder instead.

## Contributing

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide. It explains how to install Grunt's CLI.

Once you have the Grunt CLI installed, install this project's package dependencies:

	$ npm install

And of course its ruby dependencies:

	$ bundle install

### Building static pages

Once you're set up, run:

	$ grunt build

This will build output to the /public folder for distribution.

### Serving pages while editing

For convenience, you can serve the error pages while you're editing
them. They'll even livereload as you make changes. Swish.

Simply run:

	$ grunt server

A browser window should open at http://localhost:9000 where your
changes to the error pages will be livereloaded.
