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
  let(:user) { create(:user) }

  context 'invalid user' do
    it 'without an email' do
      user.email = nil

      expect(user).to_not be_valid
    end

    it 'without a password' do
      user.password = nil

      expect(user).to_not be_valid
    end

    it 'without a password confirmation' do
      user.password_confirmation = nil

      expect(user).to_not be_valid
    end

    it 'with unequal passwords' do
      user.password_confirmation = (0...6).map { rand(65..90).chr }.join

      expect(user).to_not be_valid
    end

    it 'with an invalid email' do
      user.email = 'test@test'

      expect(user).to_not be_valid
    end

    it 'with too long an email' do
      user.email = "#{'a' * 255}@a.com"

      expect(user).to_not be_valid
    end

    it 'with an existing email' do
      expect { create(:user, email: user.email) }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  context 'valid user' do
    it 'with all attributes included' do
      expect(user).to be_valid
    end
  end
end
