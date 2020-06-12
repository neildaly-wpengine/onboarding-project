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
    it 'does not save without an email' do
      user = User.new(password: '123', password_confirmation: '123').save
      expect(user).to eq(false)
    end

    it 'saves a valid user' do
      user = User.new(email: '1@1.com', password: '123', password_confirmation: '123').save
      expect(user).to eq(true)
    end

    it 'does not save without a password' do
      user = User.new(email: '1@1.com', password_confirmation: '123').save
      expect(user).to eq(false)
    end

    it 'does not save without a password confirmation' do
      user = User.new(email: '1@1.com', password: '123').save
      expect(user).to eq(false)
    end

    it 'does not save with unequal passwords' do
      user = User.new(email: 'd@d.dd', password: 'dd', password_confirmation: 'd').save
      expect(user).to eq(false)
    end

    it 'does not save with invalid email regex' do
      user = User.new(email: 'd@d', password: 'dd', password_confirmation: 'd').save
      expect(user).to eq(false)
    end

    it 'does not save with long email' do
      user = User.new(email: "#{'a' * 255}@a.com", password: 'dd', password_confirmation: 'dd').save
      expect(user).to eq(false)
    end

    it 'saves with long email' do
      user = User.new(email: "#{'a' * (255 - 6)}@a.com", password: 'dd', password_confirmation: 'dd').save
      expect(user).to eq(true)
    end
  end
end
