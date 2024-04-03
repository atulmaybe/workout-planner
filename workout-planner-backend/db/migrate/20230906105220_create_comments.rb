class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :author
      t.string :body
      t.references :workout, null: false, foreign_key: true

      t.timestamps
    end
  end
end
