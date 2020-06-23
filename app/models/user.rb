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
class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  has_secure_password
  has_many :articles, dependent: :destroy

  validates_presence_of :email
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :password
  validates_presence_of :password_confirmation

  validates_uniqueness_of :email

  validates :email, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }

  before_create :set_initials_image_link

  def set_initials_image_link
    self.initials_image_link = \
      "https://eu.ui-avatars.com/api/?background=fff&color=000&name=#{first_name}+#{last_name}"
  end
end
