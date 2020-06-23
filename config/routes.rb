Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'
  get '*path', to: 'pages#index'

  namespace :api do
    namespace :v1 do
      # POST /sessions
      post :sessions, to: 'sessions#create'
      # DELETE /logout
      delete :logout, to: 'sessions#logout'
      # GET /logged_in
      get :logged_in, to: 'sessions#logged_in'
      # POST /registrations
      resources :registrations, only: %i[create]
      # GET POST PATCH DELETE /articles
      resources :articles do
        post :recover, on: :member
      end
    end
  end
end
