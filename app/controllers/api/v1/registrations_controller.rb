module Api
  module V1
    class RegistrationsController < ApplicationController
      def create
        user = attempt_user_creation(params['user'])

        if user
          session[:user_id] = user.id
          render json: { status: :created, user: user }
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { status: 400, message: e.record.errors }
      end

      private

      def attempt_user_creation(user)
        User.create!(
          email: user['email'],
          first_name: user['first_name'],
          last_name: user['last_name'],
          password: user['password'],
          password_confirmation: user['password_confirmation']
        )
      end
    end
  end
end
