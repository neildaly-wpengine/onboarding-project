# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'RegistrationsControllers', type: :request do
  before(:all) do
    @registation_endpoint = '/api/v1/registrations'
    @user = create(:user)
  end

  context 'invalid user registration' do
    it 'without an email' do
      user = { 'user': { 'password': '1', 'password_confirmation': '1' } }

      post @registation_endpoint, params: user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'with blank fields' do
      user = { 'user': { 'email': '', 'password': '', 'password_confirmation': '' } }

      post @registation_endpoint, params: user
      response_body = JSON.parse(response.body)

      expect(response_body['status']).to eq(400)
      expect(response_body['message']['email']).to eq(["can't be blank", 'is invalid'])
      expect(response_body['message']['password']).to eq(["can't be blank", "can't be blank"])
      expect(response_body['message']['password_confirmation']).to eq(["can't be blank"])
    end

    it 'with an invalid email regex' do
      user = { 'user': { 'email': 'test@test', 'password': '1', 'password_confirmation': '1' } }

      post @registation_endpoint, params: user

      expect(JSON.parse(response.body)['message']['email']).to eq(['is invalid'])
    end

    it 'without a password' do
      user = { 'user': { 'email': 'test@test.com', 'password_confirmation': '1' } }

      post @registation_endpoint, params: user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'without a password confirmation' do
      user = { 'user': { 'email': 'test@test.com', 'password': '1' } }

      post @registation_endpoint, params: user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'when that user already exists' do
      user = { 'user': { 'email': @user.email, 'password': '1', 'password_confirmation': '1' } }

      post @registation_endpoint, params: user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end
  end

  context 'valid user registration' do
    it 'creates a valid user' do
      user = { 'user': { 'email': 'another@test.com', 'password': '1', 'password_confirmation': '1' } }

      post @registation_endpoint, params: user

      expect(JSON.parse(response.body)['status']).to eq('created')
    end
  end
end
