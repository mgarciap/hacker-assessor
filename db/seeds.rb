# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

# Our test user is a Semi Senior JS
TEST_USER_ACQUIREMENTS = {
  "TDD"    => 1,
  "JS"     => 3,
  "NodeJS" => 2,
  "JSON"   => 3,
  "jQuery" => 3
}

REQUIREMENTS_FOR_SENIORJS = {
  "TDD"    => 2,
  "JS"     => 3,
  "NodeJS" => 3,
  "JSON"   => 3,
  "jQuery" => 3,
  "SCRUM"  => 2
}

%w[ applies_to_all_areas.csv devops.csv front_end.csv non_mesurable.csv
    ruby.csv ].each do |f|
  CSV.open Rails.root.join('db', 'seeds', f), headers: true do |t|
    t.each do |s|
      p Skill.find_or_create_by! name: s[0] if s[0]
    end
  end
end

# Lets make tests simplier
Hacker.find_or_create_by email: 'test@hacker.com' do |hacker|
  hacker.password = 'password'
end if Hacker.all.empty? || Rails.env.development?

hacker = Hacker.find_by email: 'test@hacker.com'
if hacker
  TEST_USER_ACQUIREMENTS.map do |s, l|
    p hacker.acquirements.create_with(level: l).
      find_or_create_by! skill: Skill.find_by(name: s)
  end
end

senior_js = Seniority.find_or_create_by name: 'Senior JS'
REQUIREMENTS_FOR_SENIORJS.map do |s, l|
  p senior_js.requirements.create_with(level: l).
    find_or_create_by! skill: Skill.find_by(name: s)
end
