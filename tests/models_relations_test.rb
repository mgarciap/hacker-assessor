def hacker
  @hacker ||= Hacker.create name: 'Jorge'
end

def seniority
  @seniority ||= Seniority.create name: 'Senior Frontend'
end

def skill
  Skill.create name: 'TDD', description: 'Cool description'
end

def other_skill
  Skill.create name: 'JavaScript', description: 'Cool description'
end

def acquirements
  @acquirement ||= [ Acquirement.create(level: '2', hacker: hacker, skill: skill),
                     Acquirement.create(level: '3', hacker: hacker, skill: other_skill) ]
end

def requirements
  @requirements ||= [ Requirement.create(level: '3', seniority: seniority, skill: skill),
                      Requirement.create(level: '3', seniority: seniority, skill: other_skill) ]
end

scope do
  test 'Hacker gets a seniority' do
    hacker.update seniority: seniority
    assert_equal hacker.seniority.attributes[:name], 'Senior Frontend'
  end

  test 'Hacker have skills with level' do
    acquirements
    acq = hacker.acquirements.to_a.first
    assert_equal hacker.acquirements.count, 2
    assert_equal acq.skill.attributes[:name], 'TDD'
    assert_equal acq.attributes[:level], '2'
  end

  test 'Seniority have requirements' do
    requirements
    req = seniority.requirements.to_a.first
    assert_equal seniority.requirements.count, 2
    assert_equal req.skill.attributes[:name], 'TDD'
    assert_equal req.attributes[:level], '3'
  end
end
