# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string
#  password_digest     :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  first_name          :string
#  last_name           :string
#  initials_image_link :string
#
class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :initials_image_link
end
