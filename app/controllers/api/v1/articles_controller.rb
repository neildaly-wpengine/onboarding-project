module Api
  module V1
    class ArticlesController < ApplicationController
      include CurrentUserConcern

      before_action :set_article, only: %i[show update destroy recover]
      before_action :authenticate, only: %i[create update destroy recover]

      # GET /articles
      # GET /articles/?archived=true
      # GET /articles.json
      def index
        archived = request.query_parameters['archived'] ? 1 : 0
        articles = Article.kept.where('archived = ?', archived)

        render json: create_article_serializer(articles)
      end

      # GET /articles/1
      # GET /articles/1.json
      def show
        render json: create_article_serializer(@article)
      end

      # POST /articles
      # POST /articles.json
      def create
        article = Article.new(article_params)

        # the logged in user cannot create an article on behalf of somebody else
        unless article.user_id == @current_user.id
          return render json: { error: 'You cannot create an article for somebody else.' }
        end

        if article.save
          render json: create_article_serializer(article)
        else
          render json: { error: article.errors.messages }, status: 422
        end
      end

      # PATCH/PUT /articles/1
      # PATCH/PUT /articles/1.json
      def update
        unless user_is_article_creator?
          return render json: { message: 'You do not have permission to update this article.' }, status: 401
        end

        if @article.update(article_params)
          render json: create_article_serializer(@article)
        else
          render json: { error: @article.errors.messages }, status: 422
        end
      end

      # DELETE /articles/1
      # DELETE /articles/1.json
      def destroy
        unless user_is_article_creator?
          return render json: { message: 'You do not have permission to delete this article.' }, status: 401
        end

        if @article.discard
          render json: { id: @article.id, discarded_at: @article.discarded_at }
        else
          render json: { message: 'Article has already been discarded!' }, status: 422
        end
      end

      # POST /articles/1/revover
      def recover
        if @article.undiscard
          render json: create_article_serializer(@article)
        else
          render json: { error: @article.errors.messages }, status: 422
        end
      end

      private

      def set_article
        @article = Article.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def article_params
        params.require(:article).permit(:title, :content, :user_id)
      end

      def create_article_serializer(records)
        ArticleSerializer
          .new(records)
          .serialized_json
      end

      def user_is_article_creator?
        @current_user.id == @article.user.id
      end
    end
  end
end
