class AddInitialsImageLinkToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :initials_image_link, :string
  end
end
