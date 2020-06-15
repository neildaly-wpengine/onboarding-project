# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  has_secure_password

  validates_presence_of :email
  validates_presence_of :password
  validates_presence_of :password_confirmation
  validates_uniqueness_of :email

  validates :email, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }
end
