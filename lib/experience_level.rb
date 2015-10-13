class ExperienceLevel
  extend Forwardable
  include Comparable

  NAMES = %w[ heard read tried played used explained ]

  def_delegators :@level, :+, :to_i

  def initialize level
    @level = level || 0
  end

  def self.options
    @options ||= NAMES.collect.with_index do |name, index|
      [name, index]
    end
  end

  def <=> other
    @level <=> other.to_i
  end

  def to_s
    NAMES.fetch(@level)
  end
end
