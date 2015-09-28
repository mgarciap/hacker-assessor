def hacker
  @hacker = Hacker[1]
  @hacker ||= Hacker.create name: 'Jorge', password: 'jorge'
end

def seniority
  @seniority = Seniority[1]
  @seniority ||= Seniority.create name: 'Senior Frontend'
end

def skills
  @skills = Skill[2]
  @skills ||= [ Skill.create(name: 'TDD', description: 'Cool description'),
                Skill.create(name: 'JavaScript', description: 'Cool description') ]
end

def acquirements
  @acquirements = Acquirement[2]
  @acquirements ||= [ Acquirement.create(hacker: Hacker[1],
                                         skill: Skill[1],
                                         level: '2'),
                      Acquirement.create(hacker: Hacker[1],
                                         skill: Skill[2],
                                         level: '3') ]
end

def requirements
  @requirements = Requirement[2]
  @requirements ||= [ Requirement.create(seniority: Seniority[1],
                                         skill: Skill[1],
                                         level: '3'),
                      Requirement.create(seniority: Seniority[1],
                                         skill: Skill[2],
                                         level: '3') ]
end

def all
  hacker
  seniority
  skills
  acquirements
  requirements
end
