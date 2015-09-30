ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

$stdout.sync = true

require 'bundler/setup' # Set up gems listed in the Gemfile.
