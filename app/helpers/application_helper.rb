module ApplicationHelper
  def md5 string
    Digest::MD5.hexdigest string
  end

  def assign_class requirement, acquirement
    if acquirement.nil? || requirement.level > (acquirement.level + 1)
      "not-accomplished"
    elsif requirement.level <= acquirement.level
      "accomplished"
    else
      "almost-accomplished"
    end
  end

  def gravatar_url hacker
    'http://www.gravatar.com/avatar/' + md5(hacker.email)
  end

  def current_hacker_gravatar
    image_tag(gravatar_url(current_hacker), class: 'avatar')
  end
end