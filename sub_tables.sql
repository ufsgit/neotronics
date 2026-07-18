CREATE TABLE IF NOT EXISTS custom_field_sub (
  Custom_Field_Sub_Id INT AUTO_INCREMENT PRIMARY KEY,
  Custom_Field_Id INT NOT NULL,
  Option_Name VARCHAR(255) NOT NULL,
  DeleteStatus TINYINT(1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS customfield_subtable (
  Customfield_Subtable_Id INT AUTO_INCREMENT PRIMARY KEY,
  Custom_Field_Id INT NOT NULL,
  Option_Name VARCHAR(255) NOT NULL,
  DeleteStatus TINYINT(1) DEFAULT 0
);
