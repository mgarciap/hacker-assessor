SkillLevel = Struct.new(:id, :name) do
  def self.all
    @all ||= ['Not required', 'Nice to have', 'Required',
              'Experience'].map.with_index do |level, index|
      new index, level
    end
  end
end
