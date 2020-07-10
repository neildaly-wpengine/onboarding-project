# CORS (Cross Origin Resource Sharing) will allow you to whitelist the origin of requests that can communicate with our Rails backend.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000', 'https://maple-toque-44070.herokuapp.com/'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
