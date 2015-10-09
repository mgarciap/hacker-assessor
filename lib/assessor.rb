class Assessor
  def initialize hacker
    @hacker = hacker
  end

  def current_seniority
    missing_skills.map(&:seniority).min - 1
  end

  def career
    @hacker.career
  end

  def next_seniority
    missing_skills.map(&:seniority).min - 1
  end

  def missing_requirements_for_next_seniority
    @hacker.career.requirements.first
  end

  private

    def missing_skills
      @missing_skills ||= requirements_with_matching_acquirements.where <<-SQL
          acquirements.id IS NULL
        SQL
    end

    def requirements_with_matching_acquirements
      @hacker.career.requirements.joins <<-SQL
        LEFT JOIN acquirements
          ON acquirements.hacker_id = #{ @hacker.id }
            AND acquirements.skill_id = requirements.skill_id
            AND acquirements.level >= requirements.level
        SQL
    end
end
