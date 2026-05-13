const db = require('./dbconnection');

async function update() {
    try {
        await db.promise().query('DROP PROCEDURE IF EXISTS Save_User_Details');
        
        const createProc = `
        CREATE PROCEDURE Save_User_Details(
            IN User_Details_Id_ DECIMAL,
            IN User_Details_Name_ VARCHAR(250),
            IN Password_ VARCHAR(250),
            IN User_Type_ INT,
            IN User_Menu_Selection JSON,
            IN Working_Status_Id_ INT,
            IN Working_Status_ VARCHAR(100),
            IN Role_Id_ BIGINT
        )
        BEGIN
            DECLARE Menu_Id_ INT;
            DECLARE IsEdit_ VARCHAR(25);
            DECLARE IsSave_ VARCHAR(25);
            DECLARE IsDelete_ VARCHAR(25);
            DECLARE IsView_ VARCHAR(25);
            DECLARE Menu_Status_ VARCHAR(25);
            DECLARE i INT DEFAULT 0;

            IF User_Details_Id_ > 0 THEN
                DELETE FROM User_Menu_Selection WHERE User_Id = User_Details_Id_;
                UPDATE User_Details 
                SET User_Details_Name = User_Details_Name_,
                    Password = Password_,
                    User_Type = User_Type_,
                    Working_Status = Working_Status_,
                    Working_Status_Id = Working_Status_Id_,
                    Role_Id = Role_Id_
                WHERE User_Details_Id = User_Details_Id_;
            ELSE
                SET User_Details_Id_ = (SELECT COALESCE(MAX(User_Details_Id), 0) + 1 FROM User_Details);
                INSERT INTO User_Details (User_Details_Id, User_Details_Name, Password, User_Type, DeleteStatus, Working_Status, Working_Status_Id, Role_Id)
                VALUES (User_Details_Id_, User_Details_Name_, Password_, User_Type_, FALSE, Working_Status_, Working_Status_Id_, Role_Id_);
            END IF;

            WHILE i < JSON_LENGTH(User_Menu_Selection) DO
                SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].Menu_Id'))) INTO Menu_Id_;
                SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsEdit'))) INTO IsEdit_;
                IF (IsEdit_ = 'true') THEN SET IsEdit_ = 1; ELSE SET IsEdit_ = 0; END IF;
                
                SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsSave'))) INTO IsSave_;
                IF (IsSave_ = 'true') THEN SET IsSave_ = 1; ELSE SET IsSave_ = 0; END IF;
                
                SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsDelete'))) INTO IsDelete_;
                IF (IsDelete_ = 'true') THEN SET IsDelete_ = 1; ELSE SET IsDelete_ = 0; END IF;
                
                SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsView'))) INTO IsView_;
                IF (IsView_ = 'true') THEN SET IsView_ = 1; ELSE SET IsView_ = 0; END IF;
                
                SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].Menu_Status'))) INTO Menu_Status_;
                IF (Menu_Status_ = 'true') THEN SET Menu_Status_ = 1; ELSE SET Menu_Status_ = 0; END IF;
                
                INSERT INTO User_Menu_Selection (Menu_Id, User_Id, IsEdit, IsSave, IsDelete, IsView, Menu_Status, DeleteStatus)
                VALUES (Menu_Id_, User_Details_Id_, IsEdit_, IsSave_, IsDelete_, IsView_, Menu_Status_, FALSE);
                
                SET i = i + 1;
            END WHILE;
            
            SELECT User_Details_Id_;
        END;
        `;
        
        await db.promise().query(createProc);
        console.log('Save_User_Details procedure updated successfully');
    } catch (err) {
        console.error('Error updating procedure:', err);
    }
    process.exit();
}

update();
