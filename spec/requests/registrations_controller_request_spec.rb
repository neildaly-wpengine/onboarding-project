require 'rails_helper'

RSpec.describe 'RegistrationsControllers', type: :request do
  let(:user) { create(:user) }
  let(:registration_endpoint) { '/api/v1/registrations/' }

  context 'invalid user registration' do
    it 'without an email' do
      user.email = nil

      post registration_endpoint, params: { 'user': user }

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'with blank fields' do
      temp_user = { 'email': '', 'password': '', 'password_confirmation': '' }

      post registration_endpoint, params: { 'user': temp_user }
      response_body = JSON.parse(response.body)

      expect(response_body['status']).to eq(400)
      expect(response_body['message']['email']).to eq(["can't be blank", 'is invalid'])
      expect(response_body['message']['password']).to eq(["can't be blank"])
      expect(response_body['message']['password_confirmation']).to eq(["can't be blank"])
    end

    it 'with an invalid email regex' do
      user.email = 'test@test'

      post registration_endpoint, params: { 'user': user }

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'without a password' do
      user.password = nil

      post registration_endpoint, params: { 'user': user }

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'without a password confirmation' do
      user.password_confirmation = nil

      post registration_endpoint, params: { 'user': user }

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'when that user already exists' do
      post registration_endpoint, params: { 'user': user }

      expect(JSON.parse(response.body)['status']).to eq(400)
    end
  end

  context 'valid user registration' do
    it 'with all fields included' do
      user = { 'user': { 'email': 'valid.user@test.com', 'password': '1', 'password_confirmation': '1' } }

      post registration_endpoint, params: user

      expect(JSON.parse(response.body)['status']).to eq('created')
    end
  end
end
