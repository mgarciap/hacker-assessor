def body_json
  JSON.parse last_response.body, symbolize_names: true
end

def acquirements_body
  { acquirements: [ { skill: '1' }, { skill: '2' } ] }.to_json
end

def requirements_body
  { requirements: [ { skill: '1' }, { skill: '2' } ] }.to_json
end

def seniority_body
  { seniority: { name: 'Senior Ruby' } }.to_json
end

def skill_body
  { skill: { name: 'Time Traveler',
             description: 'The best way to travel' } }.to_json
end

def login_body
  { hacker: { name: 'Jorge', password: 'jorge' } }.to_json
end

def invalid_login_body
  { hacker: { name: 'Jorge', password: 'bad_pass' } }.to_json
end

scope '/login' do
  test 'login a hacker with valid credentials' do
    post '/login', login_body
    assert_equal 200, last_response.status
    assert_equal hacker.id, last_request.session["hacker_id"]
  end

  test 'fail to login a hacker with invalid credentials' do
    post '/login', invalid_login_body
    assert_equal 302, last_response.status
    assert body_json[:error].include? "incorrect"
  end
end

scope '/signup' do
  # TODO
end

scope '/hackers' do
  test 'get a list of hackers' do
    get '/hackers'
    assert_equal 200, last_response.status
    assert_equal hacker.name, body_json.first[:name]
  end

  test 'Create a list of Acquirements for a hacker and get the acquirements' do
    post "/hackers/#{ hacker.id }/acquirements", acquirements_body
    assert_equal 201, last_response.status
    assert_equal 4, hacker.acquirements.count

    get "/hackers/#{ hacker.id }/acquirements"
    assert_equal 200, last_response.status
    assert_equal 'TDD', body_json.first[:name]
  end

  # TODO: Missing logic in the endpoint.
  # test 'Get a list of seniorities that a hacker can reach' do |hacker|
  #   get "/hackers/#{ hacker.id }/seniorities"
  # end

  test 'Return the skills that a hacker need to reach the next seniority' do
    get "/hackers/#{ hacker.id }/seniorities/#{ seniority.id }"
    assert_equal 200, last_response.status
    assert_equal 0, body_json.count
  end
end

scope '/seniotities' do
  test 'Get all the seniorities' do
    get '/seniorities'
    assert_equal 200, last_response.status
    assert_equal seniority.name, body_json.first[:name]
  end

  test 'Create a seniority' do
    post '/seniorities', seniority_body
    seniorities = Seniority.all
    assert_equal 201, last_response.status
    assert_equal 2, seniorities.count
    assert_equal 'Senior Ruby', seniorities.to_a[1].attributes[:name]
  end

  test 'Create a list of Requirements for a seniority and get the requirements' do
    post "/seniorities/#{ seniority.id }/requirements", requirements_body
    assert_equal 201, last_response.status
    assert_equal 4, seniority.requirements.count

    get "/seniorities/#{ seniority.id }/requirements"
    assert_equal 200, last_response.status
    assert_equal 'TDD', body_json.first[:name]
  end
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
