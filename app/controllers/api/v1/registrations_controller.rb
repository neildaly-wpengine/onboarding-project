module Api
  module V1
    class RegistrationsController < ApplicationController
      def create
        user = User.new(user_params)

        if user.save
          session[:user_id] = user.id
          render json: { status: :created, user: user }
        else
          render json: { status: 400, message: user.errors.messages }
        end
      end

      private

      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
      end
    end
  end
end
