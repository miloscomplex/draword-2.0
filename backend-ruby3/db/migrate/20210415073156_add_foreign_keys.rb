class AddForeignKeys < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :selected_phrase_id, :integer

    add_index :rooms, :selected_phrase_id

    add_reference :users, :room, null: true, foreign_key: true

    # add_reference :rooms, :user, null: true, foreign_key: true

    add_reference :scores, :room, null: false, foreign_key: true

    add_reference :rooms, :drawer, null: true, foreign_key: { to_table: :users }

    add_reference :chats, :room, null: false, foreign_key: true

    add_reference :canvas, :room, null: false, foreign_key: true

  end
end
