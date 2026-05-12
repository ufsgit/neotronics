-- Simple database update to add Item columns to Brand table
-- Run this in your MySQL database

-- Add Item_Id and Item_Name columns to Brand table if they don't exist
ALTER TABLE Brand 
ADD COLUMN Item_Id INT DEFAULT 0,
ADD COLUMN Item_Name VARCHAR(255) DEFAULT '';

-- Update existing records to have default values
UPDATE Brand SET Item_Id = 0, Item_Name = '' WHERE Item_Id IS NULL OR Item_Name IS NULL;