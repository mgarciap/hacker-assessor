def login_body
  { hacker: { name: 'Jorge', password: 'jorge' } }.to_json
end

def invalid_login_body
  { hacker: { name: 'Jorge', password: 'bad_pass' } }.to_json
end

scope '/login' do
  test 'login a hacker with valid credentials' do
    post '/login', login_body
    assert_equal 'Jorge', body_json[:name]
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
