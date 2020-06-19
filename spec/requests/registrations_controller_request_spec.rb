require 'rails_helper'

RSpec.describe 'Registrations', type: :request do
  let(:user) { create(:user) }

  context 'invalid user registration' do
    it 'without an email' do
      user.email = nil

      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end

    it 'with blank fields' do
      user.email = user.password = user.password_confirmation = user.first_name = user.last_name = ' '

      register user

      response_body = JSON.parse(response.body)
      response_body_message = response_body['message']

      expect(response_body['status']).to eq(400)
      expect(response_body_message.count).to eq(5)
      expect(response_body_message['email']).to eq(["can't be blank", 'is invalid'])
      expect(response_body_message['first_name']).to eq(["can't be blank"])
      expect(response_body_message['last_name']).to eq(["can't be blank"])
      expect(response_body_message['password']).to eq(["can't be blank"])
      expect(response_body_message['password_confirmation']).to eq(["can't be blank"])
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

    it 'with unequal passwords' do
      user.password_confirmation = 111

      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
      expect(JSON.parse(response.body)['message']['password_confirmation']).to eq ['doesn\'t match Password']
    end

    it 'when that user already exists' do
      register user

      expect(JSON.parse(response.body)['status']).to eq(400)
    end
  end
end
