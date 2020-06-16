# frozen_string_literal: true

class ArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content, :user_id
end
