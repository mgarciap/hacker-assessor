scope do
  test 'Hacker gets a seniority' do
    hacker.update seniority: seniority
    assert_equal hacker.seniority.attributes[:name], 'Senior Frontend'
  end

  test 'Hacker have skills with level' do
    acq = hacker.acquirements.to_a.first
    assert_equal hacker.acquirements.count, 2
    assert_equal acq.skill.attributes[:name], 'TDD'
    assert_equal acq.attributes[:level], '2'
  end

  test 'Seniority have requirements' do
    req = seniority.requirements.to_a.first
    assert_equal seniority.requirements.count, 2
    assert_equal req.skill.attributes[:name], 'TDD'
    assert_equal req.attributes[:level], '3'
  end
end
