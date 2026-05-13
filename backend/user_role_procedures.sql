-- Create User_Role table if it doesn't exist
CREATE TABLE IF NOT EXISTS User_Role (
    User_Role_Id INT AUTO_INCREMENT PRIMARY KEY,
    User_Role_Name VARCHAR(100) NOT NULL,
    User_Type_Id INT,
    Working_Status_Id INT,
    DeleteStatus TINYINT DEFAULT 0,
    FOREIGN KEY (User_Type_Id) REFERENCES User_Type(User_Type_Id),
    FOREIGN KEY (Working_Status_Id) REFERENCES Working_Status(Working_Status_Id)
);

-- Stored procedure to save User_Role
DELIMITER //
CREATE PROCEDURE Save_User_Role(
    IN User_Role_Id_ INT,
    IN User_Role_Name_ VARCHAR(100),
    IN User_Type_Id_ INT,
    IN Working_Status_Id_ INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    IF User_Role_Id_ = 0 THEN
        INSERT INTO User_Role (User_Role_Name, User_Type_Id, Working_Status_Id, DeleteStatus)
        VALUES (User_Role_Name_, User_Type_Id_, Working_Status_Id_, 0);
        
        SELECT LAST_INSERT_ID() AS User_Role_Id_;
    ELSE
        UPDATE User_Role 
        SET User_Role_Name = User_Role_Name_,
            User_Type_Id = User_Type_Id_,
            Working_Status_Id = Working_Status_Id_
        WHERE User_Role_Id = User_Role_Id_;
        
        SELECT User_Role_Id_ AS User_Role_Id_;
    END IF;
    
    COMMIT;
END //
DELIMITER ;

-- Stored procedure to search User_Role
DELIMITER //
CREATE PROCEDURE Search_User_Role(
    IN User_Role_Name_ VARCHAR(100)
)
BEGIN
    SELECT 
        ur.User_Role_Id,
        ur.User_Role_Name,
        ur.User_Type_Id,
        ut.User_Type_Name,
        ur.Working_Status_Id,
        ws.Working_Status_Name
    FROM User_Role ur
    LEFT JOIN User_Type ut ON ur.User_Type_Id = ut.User_Type_Id
    LEFT JOIN Working_Status ws ON ur.Working_Status_Id = ws.Working_Status_Id
    WHERE ur.DeleteStatus = 0
    AND (User_Role_Name_ = '' OR ur.User_Role_Name LIKE CONCAT('%', User_Role_Name_, '%'))
    ORDER BY ur.User_Role_Name;
END //
DELIMITER ;

-- Stored procedure to delete User_Role
DELIMITER //
CREATE PROCEDURE Delete_User_Role(
    IN User_Role_Id_ INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT FALSE AS DeleteStatus, 'Error occurred while deleting' AS DeleteMessage;
    END;
    
    START TRANSACTION;
    
    UPDATE User_Role 
    SET DeleteStatus = 1 
    WHERE User_Role_Id = User_Role_Id_;
    
    SELECT TRUE AS DeleteStatus, 'Deleted successfully' AS DeleteMessage;
    
    COMMIT;
END //
DELIMITER ;