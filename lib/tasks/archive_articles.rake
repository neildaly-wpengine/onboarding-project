desc 'Archive articles that have not been updated in 7 days.'

task archive_articles: :environment do
  articles_to_archive = Article.order(:updated_at).kept.where('updated_at <= ?', Time.now - 7.days)

  articles_to_archive.each do |article|
    article.archived = true
    article.save
  end
end
