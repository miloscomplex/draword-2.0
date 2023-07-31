class CreateCanvas < ActiveRecord::Migration[6.0]
  def change
    create_table :canvas do |t|
      t.string :action
      t.integer :offsetX
      t.integer :offsetY
      t.string :color 
      # t.references :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
