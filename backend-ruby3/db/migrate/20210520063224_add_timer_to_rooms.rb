class AddTimerToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :timer, :integer
  end
end
