class AddArchivedToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :archived, :boolean, default: false
  end
end
