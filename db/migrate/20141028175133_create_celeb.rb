class CreateCeleb < ActiveRecord::Migration
  def change
    create_table :celebs do |t|
    	t.string :fname
    	t.string :lname
    	t.string :handle
    	t.timestamps
    end
  end
end
