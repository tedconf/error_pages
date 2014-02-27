# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'error_pages/version'

Gem::Specification.new do |gem|
  gem.name          = "error_pages"
  gem.version       = ErrorPages::VERSION
  gem.summary       = "Error pages for TED sites"
  gem.description   = "Provides basic error pages for all TED sites."
  gem.authors       = ["Joe Bartlett"]
  gem.email         = ["joe@ted.com"]
  gem.homepage      = "https://github.com/tedconf/error_pages"

  gem.add_development_dependency 'compass'

  gem.files         = Dir["{public}/*"]
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
