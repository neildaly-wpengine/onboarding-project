FROM ruby:2.6.3-alpine

RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache \
    build-base sqlite sqlite-dev tzdata \
    nodejs yarn

WORKDIR /app

COPY Gemfile* package.json yarn.lock ./

RUN bundle install
RUN yarn install --check-files

COPY . . 

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
