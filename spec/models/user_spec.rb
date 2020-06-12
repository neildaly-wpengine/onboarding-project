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
require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validation testing' do
    it 'ensures email presence' do
      user = User.new(password: '123', password_confirmation: '123').save
      expect(user).to eq(false)
    end

    it 'verifies email presence' do
      user = User.new(email: '1@1.com', password: '123', password_confirmation: '123').save
      expect(user).to eq(true)
    end
  end
end
