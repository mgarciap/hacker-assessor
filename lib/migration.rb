module Migrations
  def self.hacker
    Hacker.create name: 'Jorge'
  end

  def self.skills
tdd = <<-EOS
"TDD is an art, do, not write a line of code before you have a failing test. This will help you make code that is better for your friends to live with."
EOS

vanilla = <<-EOS
"JavaScript is the most popular programming language in the world. A proper understanding of it's good parts is desirable if you want to write maintainable, concise and usable code that will last forever."
EOS

node = <<-EOS
"Node.js contributions, releases, and contributorship are under an open governance model. We intend to land, with increasing regularity, releases which are compatible with the npm ecosystem that has been built to date for Node.js."
EOS

discuss = <<-EOS
"Frontend modules are awesome, but they can make the app really slow, so it is important to keep only the esentials."
EOS

angular = <<-EOS
"AngularJS lets you write client-side web applications as if you had a smarter browser. It lets you use good old HTML as your template language and lets you extend HTML’s syntax to express your application’s components clearly and succinctly."
EOS

scrum = <<-EOS
"Is an iterative and incremental agile software development methodology for managing product development. Scrum adopts an empirical approach—accepting that the problem cannot be fully understood or defined, focusing instead on maximizing the team's ability to deliver quickly and respond to emerging requirements."
EOS

    skills = [ [ name: 'TDD', description: tdd ],
               [ name: 'VanillaJS', description: vanilla ],
               [ name: 'Node', description: node ],
               [ name: 'Discuss Dependencies', description: discuss ],
               [ name: 'Angular', description: angular ],
               [ name: 'Scrum Master', description: scrum ] ]

    skills.each { |skill| Skill.create skill.first }
  end

  def self.seniorities
    Seniority.create name: 'Senior Frontend'
  end

  def self.all
    hacker
    skills
    seniorities
  end
end
