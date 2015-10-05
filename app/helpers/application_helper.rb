module ApplicationHelper
  def md5 string
    Digest::MD5.hexdigest string
  end

  def assign_class requirement, acquirement
    if requirement.level > (acquirement.level + 1)
      "not-accomplished"
    elsif requirement.level <= acquirement.level
      "accomplished"
    else
      "almost-accomplished"
    end
  end
end
