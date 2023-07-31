class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :title
      t.string :status
      # t.references :drawer, null: true, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
