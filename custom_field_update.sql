ALTER TABLE custom_field 
  DROP COLUMN Field_Group,
  DROP COLUMN Sort_Order,
  ADD COLUMN Field_Type VARCHAR(50) NOT NULL DEFAULT 'Text',
  ADD COLUMN Quotation_Custom TINYINT(1) DEFAULT 0,
  ADD COLUMN View_In_Quotation TINYINT(1) DEFAULT 0,
  ADD COLUMN Events TINYINT(1) DEFAULT 0,
  ADD COLUMN Field_List TEXT;

CREATE TABLE IF NOT EXISTS lead_custom_field_value (
  Lead_Id INT NOT NULL,
  Custom_Field_Id INT NOT NULL,
  Field_Value TEXT,
  PRIMARY KEY (Lead_Id, Custom_Field_Id)
);

DELIMITER $$

DROP PROCEDURE IF EXISTS Save_Custom_Field$$
CREATE PROCEDURE Save_Custom_Field(
    IN p_Custom_Field_Id INT,
    IN p_Field_Name VARCHAR(255),
    IN p_Field_Type VARCHAR(50),
    IN p_Quotation_Custom TINYINT(1),
    IN p_View_In_Quotation TINYINT(1),
    IN p_Events TINYINT(1),
    IN p_Field_List TEXT
)
BEGIN
    IF p_Custom_Field_Id = 0 THEN
        INSERT INTO custom_field (Field_Name, Field_Type, Quotation_Custom, View_In_Quotation, Events, Field_List, DeleteStatus)
        VALUES (p_Field_Name, p_Field_Type, p_Quotation_Custom, p_View_In_Quotation, p_Events, p_Field_List, 0);
        
        SELECT LAST_INSERT_ID() AS Custom_Field_Id_;
    ELSE
        UPDATE custom_field
        SET Field_Name = p_Field_Name,
            Field_Type = p_Field_Type,
            Quotation_Custom = p_Quotation_Custom,
            View_In_Quotation = p_View_In_Quotation,
            Events = p_Events,
            Field_List = p_Field_List
        WHERE Custom_Field_Id = p_Custom_Field_Id;
        
        SELECT p_Custom_Field_Id AS Custom_Field_Id_;
    END IF;
END$$

DROP PROCEDURE IF EXISTS Search_Custom_Field$$
CREATE PROCEDURE Search_Custom_Field()
BEGIN
    SELECT * FROM custom_field WHERE DeleteStatus = 0;
END$$

DROP PROCEDURE IF EXISTS Save_Lead_Custom_Value$$
CREATE PROCEDURE Save_Lead_Custom_Value(
    IN p_Lead_Id INT,
    IN p_Custom_Field_Id INT,
    IN p_Field_Value TEXT
)
BEGIN
    INSERT INTO lead_custom_field_value (Lead_Id, Custom_Field_Id, Field_Value)
    VALUES (p_Lead_Id, p_Custom_Field_Id, p_Field_Value)
    ON DUPLICATE KEY UPDATE Field_Value = p_Field_Value;
    
    SELECT p_Lead_Id AS Lead_Id_;
END$$

DROP PROCEDURE IF EXISTS Get_Lead_Custom_Values$$
CREATE PROCEDURE Get_Lead_Custom_Values(
    IN p_Lead_Id INT
)
BEGIN
    SELECT * FROM lead_custom_field_value WHERE Lead_Id = p_Lead_Id;
END$$

DELIMITER ;
