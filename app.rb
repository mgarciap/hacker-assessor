require './config/application'

def json_body
  JSON.parse req.body.read, symbolize_names: true
end

Cuba.define do
  res.headers['Content-Type'] = 'application/json'

  on 'signup' do
    on get do
    end

    on post do
    end
  end

  on post, 'login' do
    hacker = Hacker.login json_body[:hacker]
    if hacker
      session[:hacker_id] = hacker.id
      res.write hacker.to_json
    else
      error = { error: 'Your name or password was incorrect.' }.to_json
      res.write error
      res.status = 302
    end
  end

  on 'hackers' do
    on get, root do
      res.write Hacker.all.to_json
    end

    on ':id' do |id|
      hacker = Hacker[id]

      on 'acquirements' do
        on post do
          acquirements = json_body[:acquirements]
          acquirements.each do |reqmts|
            Acquirement.create hacker: hacker,
              skill: Skill[reqmts[:skill]]
          end
          res.status = 201
        end

        on get do
          res.write hacker.skills.to_json
        end
      end

      on 'seniorities' do
        on get, root do
          # TODO: This need to return a list of seniorities or "careers"
          # to reach by a hacker.
        end

        on get, ':id' do |id|
          res.write Seniority[id].skills - hacker.skills
        end
      end
    end
  end

  on 'seniorities' do
    on root do
      on post do
        Seniority.create json_body[:seniority]
        res.status = 201
      end

      on get do
        res.write Seniority.all.to_json
      end
    end

    on ':id' do |id|
      seniority = Seniority[id]

      on 'requirements' do
        on post do
          requirements = json_body[:requirements]
          requirements.each do |reqmts|
            Requirement.create seniority: seniority,
              skill: Skill[reqmts[:skill]]
          end
          res.status = 201
        end

        on get do
          res.write seniority.skills.to_json
        end
      end
    end
  end

  on 'skills' do
    on root do
      on post do
        Skill.create json_body[:skill]
        res.status = 201
      end

      on get do
        res.write Skill.all.to_json
      end
    end

    on get, ':id' do |id|
      res.write Skill[id].attributes.to_json
    end
  end

end
