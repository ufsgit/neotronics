DELIMITER $$

DROP PROCEDURE IF EXISTS Search_Custom_Field$$
CREATE PROCEDURE Search_Custom_Field()
BEGIN
    SELECT 
        c.Custom_Field_Id,
        c.Field_Name,
        c.Field_Type,
        c.Quotation_Custom,
        c.View_In_Quotation,
        c.Events,
        COALESCE(
            CASE 
                WHEN c.Field_Type IN ('Dropdown', 'Radio') THEN 
                    (SELECT GROUP_CONCAT(Option_Name SEPARATOR ',') FROM custom_field_sub WHERE Custom_Field_Id = c.Custom_Field_Id)
                WHEN c.Field_Type = 'Checkbox' THEN 
                    (SELECT GROUP_CONCAT(Option_Name SEPARATOR ',') FROM customfield_subtable WHERE Custom_Field_Id = c.Custom_Field_Id)
                ELSE c.Field_List
            END, 
        c.Field_List) AS Field_List,
        c.DeleteStatus
    FROM custom_field c 
    WHERE c.DeleteStatus = 0;
END$$

DELIMITER ;
