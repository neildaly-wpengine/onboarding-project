# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      include CurrentUserConcern
      
      before_action :set_article, only: %i[show edit update destroy]
      before_action :authenticate, only: %i[create update destroy]

      # GET /articles
      # GET /articles.json
      def index
        articles = Article.all

        render json: ArticleSerializer.new(articles).serialized_json
      end

      # GET /articles/1
      # GET /articles/1.json
      def show
        render json: ArticleSerializer.new(@article).serialized_json
      end

      # POST /articles
      # POST /articles.json
      def create
        article = Article.new(article_params)

        if article.save
          render json: ArticleSerializer.new(article).serialized_json
        else
          render json: { error: article.errors.messages }, status: 422
        end
      end

      # PATCH/PUT /articles/1
      # PATCH/PUT /articles/1.json
      def update
        if @article.update(article_params)
          render json: ArticleSerializer.new(@article).serialized_json
        else
          render json: { error: @article.errors.messages }, status: 422
        end
      end

      # DELETE /articles/1
      # DELETE /articles/1.json
      def destroy
        if @article.destroy
          head :no_content
        else
          render json: { error: @article.errors.messages }, status: 422
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_article
        @article = Article.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def article_params
        params.require(:article).permit(:title, :content, :user_id)
      end
    end
  end
end
