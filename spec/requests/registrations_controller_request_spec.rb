# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'RegistrationsControllers', type: :request do
  let(:user) { create(:user) }
  let(:registration_endpoint) { '/api/v1/registrations/' }

  context 'invalid user registration' do
    it 'without an email' do
      user.email = nil

      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'with blank fields' do
      user.email = user.password = user.password_confirmation = ' '

      register user
      response_body = JSON.parse(response.body)

      expect(response_body['status']).to eq(400)
      expect(response_body['message'].count).to eq(3)
      expect(response_body['message']['email']).to eq(["can't be blank", 'is invalid'])
      expect(response_body['message']['password']).to eq(["can't be blank"])
      expect(response_body['message']['password_confirmation']).to eq(["can't be blank"])
    end

    it 'with an invalid email regex' do
      user.email = 'test@test'

      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'without a password' do
      user.password = nil

      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'without a password confirmation' do
      user.password_confirmation = nil

      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'when that user already exists' do
      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end
  end
end
