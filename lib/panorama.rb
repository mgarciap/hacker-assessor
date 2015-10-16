class Panorama
  def initialize career
    requirements = career.requirements.group_by { |r| r.skill_id }
    @table = build_table requirements
  end

  def build_table requirements
    requirements.map do |r|
      { skill_id: r.first,
        requirements_levels: requirements_levels(r.last) }
    end
  end

  def requirements_levels requirements
    levels = Array.new(Seniority::NAMES.size)
    requirements.each do |r|
      range = r.seniority.to_i..(Seniority::NAMES.size-1)
      levels.fill(ExperienceLevel::NAMES[r.level.to_i], range)
    end
    levels
  end

  def each_skill &block
    @table.each &block
  end
end
