DELIMITER $$

DROP PROCEDURE IF EXISTS Get_Leads$$
CREATE PROCEDURE Get_Leads()
BEGIN
    SELECT 
        l.*,
        (
            SELECT GROUP_CONCAT(
                CONCAT(cf.Field_Name, ': ', lcv.Field_Value)
                ORDER BY cf.Custom_Field_Id
                SEPARATOR ' | '
            )
            FROM lead_custom_field_value lcv
            INNER JOIN custom_field cf ON cf.Custom_Field_Id = lcv.Custom_Field_Id
            WHERE lcv.Lead_Id = l.Lead_Id
              AND (lcv.Field_Value IS NOT NULL AND lcv.Field_Value <> '')
        ) AS CF_Summary,
        (
            SELECT COUNT(*)
            FROM lead_custom_field_value lcv
            WHERE lcv.Lead_Id = l.Lead_Id
              AND (lcv.Field_Value IS NOT NULL AND lcv.Field_Value <> '')
        ) AS CF_Count
    FROM `Lead` l
    ORDER BY l.Lead_Id DESC;
END$$

DELIMITER ;
