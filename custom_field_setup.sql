CREATE TABLE IF NOT EXISTS custom_field (
  Custom_Field_Id INT AUTO_INCREMENT PRIMARY KEY,
  Field_Name      VARCHAR(255) NOT NULL,
  Field_Group     VARCHAR(100) DEFAULT 'Enquiry_For',
  Sort_Order      INT DEFAULT 0,
  DeleteStatus    TINYINT DEFAULT 0
);

DELIMITER $$

DROP PROCEDURE IF EXISTS Save_Custom_Field$$
CREATE PROCEDURE Save_Custom_Field(
    IN p_Custom_Field_Id INT,
    IN p_Field_Name VARCHAR(255),
    IN p_Field_Group VARCHAR(100),
    IN p_Sort_Order INT
)
BEGIN
    IF p_Custom_Field_Id = 0 THEN
        INSERT INTO custom_field (Field_Name, Field_Group, Sort_Order, DeleteStatus)
        VALUES (p_Field_Name, p_Field_Group, p_Sort_Order, 0);
        
        SELECT LAST_INSERT_ID() AS Custom_Field_Id_;
    ELSE
        UPDATE custom_field
        SET Field_Name = p_Field_Name,
            Field_Group = p_Field_Group,
            Sort_Order = p_Sort_Order
        WHERE Custom_Field_Id = p_Custom_Field_Id;
        
        SELECT p_Custom_Field_Id AS Custom_Field_Id_;
    END IF;
END$$

DROP PROCEDURE IF EXISTS Search_Custom_Field$$
CREATE PROCEDURE Search_Custom_Field(
    IN p_Field_Group VARCHAR(100)
)
BEGIN
    IF p_Field_Group = '' THEN
        SELECT * FROM custom_field WHERE DeleteStatus = 0 ORDER BY Sort_Order ASC;
    ELSE
        SELECT * FROM custom_field WHERE DeleteStatus = 0 AND Field_Group = p_Field_Group ORDER BY Sort_Order ASC;
    END IF;
END$$

DROP PROCEDURE IF EXISTS Delete_Custom_Field$$
CREATE PROCEDURE Delete_Custom_Field(
    IN p_Custom_Field_Id INT
)
BEGIN
    UPDATE custom_field SET DeleteStatus = 1 WHERE Custom_Field_Id = p_Custom_Field_Id;
    SELECT p_Custom_Field_Id AS Custom_Field_Id_;
END$$

DELIMITER ;
