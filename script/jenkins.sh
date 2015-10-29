#!/bin/bash

# Template Jenkins Wrapper for Language: 'JavaScript'

# TODO: NVM support? currently using global node_modules/nodejs version.

# Exit immediately if any single command fails
set -e

# Print all commands after expansion.
set -x

/usr/local/bin/node --version
/usr/local/bin/npm --version
/usr/local/bin/mocha --version

# Update all our modules
/usr/local/bin/npm install

# Run the tests
/usr/local/bin/mocha

exit 0
