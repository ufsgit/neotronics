CREATE TABLE IF NOT EXISTS field_type_master (
  Field_Type_Id INT AUTO_INCREMENT PRIMARY KEY,
  Field_Type_Name VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO field_type_master (Field_Type_Name) VALUES 
('Text'),
('Number'),
('Date'),
('Dropdown'),
('Checkbox'),
('Radio');

DELIMITER $$

DROP PROCEDURE IF EXISTS Get_Field_Types$$
CREATE PROCEDURE Get_Field_Types()
BEGIN
    SELECT Field_Type_Name FROM field_type_master ORDER BY Field_Type_Id;
END$$

DELIMITER ;
