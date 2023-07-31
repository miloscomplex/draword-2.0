class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.string :text
      t.string :name
      t.string :role
      # t.references :room, null: false, foreign_key: true
      t.timestamps
    end
  end
end
