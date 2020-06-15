# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      include CurrentUserConcern

      # POST /sessions - log in the user
      def create
        user = User
               .find_by(email: params['user']['email'])
               .try(:authenticate, params['user']['password'])

        if user
          session[:user_id] = user.id
          render json: { status: :created, logged_in: true, user: user }
        else
          render json: { status: 401 }
        end
      end

      # GET /logged_in
      def logged_in
        return render json: { logged_in: true, user: @current_user } if @current_user

        render json: { logged_in: false }
      end

      # POST /logout
      def logout
        reset_session
        render json: { status: 200, logged_out: true }
      end
    end
  end
end
