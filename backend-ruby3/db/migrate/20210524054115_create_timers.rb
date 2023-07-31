class CreateTimers < ActiveRecord::Migration[6.0]
  def change
    create_table :timers do |t|
      t.integer :time
      t.boolean :is_on
      t.integer :start
      t.references :room, null: false, foreign_key: true
      t.timestamps
    end
  end
end
