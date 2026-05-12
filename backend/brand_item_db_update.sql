-- Add Item_Id and Item_Name columns to Brand table if they don't exist
ALTER TABLE Brand 
ADD COLUMN IF NOT EXISTS Item_Id INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS Item_Name VARCHAR(255) DEFAULT '';

-- Update the Save_Brand stored procedure
DROP PROCEDURE IF EXISTS Save_Brand;

DELIMITER $$
CREATE PROCEDURE Save_Brand(
    IN Brand_Id_ INT,
    IN Brand_Name_ VARCHAR(255),
    IN Item_Id_ INT,
    IN Item_Name_ VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    IF Brand_Id_ = 0 THEN
        -- Check if Brand_Name already exists
        IF EXISTS (SELECT 1 FROM Brand WHERE Brand_Name = Brand_Name_ AND DeleteStatus = 0) THEN
            SELECT -1 AS Brand_Id_;
        ELSE
            -- Insert new brand
            INSERT INTO Brand (Brand_Name, Item_Id, Item_Name, DeleteStatus)
            VALUES (Brand_Name_, Item_Id_, Item_Name_, 0);
            
            SELECT LAST_INSERT_ID() AS Brand_Id_;
        END IF;
    ELSE
        -- Update existing brand
        UPDATE Brand 
        SET Brand_Name = Brand_Name_,
            Item_Id = Item_Id_,
            Item_Name = Item_Name_
        WHERE Brand_Id = Brand_Id_ AND DeleteStatus = 0;
        
        SELECT Brand_Id_ AS Brand_Id_;
    END IF;

    COMMIT;
END$$
DELIMITER ;

-- Update the Search_Brand stored procedure to include Item_Name
DROP PROCEDURE IF EXISTS Search_Brand;

DELIMITER $$
CREATE PROCEDURE Search_Brand(
    IN Brand_Name_ VARCHAR(255)
)
BEGIN
    IF Brand_Name_ = '' OR Brand_Name_ IS NULL THEN
        SELECT Brand_Id, Brand_Name, Item_Id, Item_Name
        FROM Brand 
        WHERE DeleteStatus = 0
        ORDER BY Brand_Name;
    ELSE
        SELECT Brand_Id, Brand_Name, Item_Id, Item_Name
        FROM Brand 
        WHERE Brand_Name LIKE CONCAT('%', Brand_Name_, '%') 
        AND DeleteStatus = 0
        ORDER BY Brand_Name;
    END IF;
END$$
DELIMITER ;