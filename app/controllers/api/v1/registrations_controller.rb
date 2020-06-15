# frozen_string_literal: true

module Api
  module V1
    class RegistrationsController < ApplicationController
      def create
        user = attempt_user_creation

        if user
          session[:user_id] = user.id
          render json: { status: :created, user: user }
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { status: 400, message: e.record.errors }
      end

      def attempt_user_creation
        User.create!(
          email: params['user']['email'],
          password: params['user']['password'],
          password_confirmation: params['user']['password_confirmation']
        )
      end
    end
  end
end
