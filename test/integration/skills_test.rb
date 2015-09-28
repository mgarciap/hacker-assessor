def skill_body
  { skill: { name: 'Time Traveler',
             description: 'The best way to travel' } }.to_json
end

scope '/skills' do
  test 'Get all the skills' do
    get '/skills'
    assert_equal 200, last_response.status
    assert_equal Skill.all.count, body_json.count
  end

  test 'Create a new skill' do
    post '/skills', skill_body
    skills = Skill.all
    assert_equal 201, last_response.status
    assert_equal 3, skills.count
    assert_equal 'Time Traveler', skills.to_a[2].attributes[:name]

  end

  test 'Get a single skill' do
    skill = Skill[1]
    get "/skills/#{ skill.id }"
    assert_equal 200, last_response.status
    assert_equal skill.name, body_json[:name]
  end
end
