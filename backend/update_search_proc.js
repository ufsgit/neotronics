const db = require('./dbconnection');

async function update() {
    try {
        await db.promise().query('DROP PROCEDURE IF EXISTS Search_User_Details');
        
        const createProc = `
        CREATE PROCEDURE Search_User_Details(User_Type_In INT, Login_User_Id INT, In User_Details_Name_ VARCHAR(100))
        BEGIN
            DECLARE SearchbyName_Value VARCHAR(2000);
            
            IF User_Details_Name_ IS NULL OR User_Details_Name_ = 'undefined' THEN
                SET User_Details_Name_ = '';
            END IF;

            SET SearchbyName_Value = CONCAT(" AND UD.User_Details_Name like '%", User_Details_Name_, "%' ");
            
            IF User_Type_In = 2 THEN
                SET SearchbyName_Value = CONCAT(" AND UD.User_Details_Id = ", Login_User_Id);
            END IF;
            
            SET @query = CONCAT("
                SELECT 
                    UD.User_Details_Id, 
                    UD.User_Details_Name, 
                    UD.Password, 
                    UD.Working_Status, 
                    UD.User_Type, 
                    UD.Role_Id, 
                    UD.Address1, 
                    UD.Address2, 
                    UD.Address3, 
                    UD.Address4, 
                    UD.Pincode, 
                    UD.Mobile, 
                    UD.Email, 
                    UD.Employee_Id, 
                    UD.Working_Status_Id,
                    UT.User_Type_Name,
                    UR.User_Role_Name
                FROM User_Details UD
                LEFT JOIN User_Type UT ON UD.User_Type = UT.User_Type_Id
                LEFT JOIN User_Role UR ON UD.Role_Id = UR.User_Role_Id
                WHERE UD.DeleteStatus = false
                ", SearchbyName_Value);
                
            PREPARE QUERY FROM @query;
            EXECUTE QUERY;
            DEALLOCATE PREPARE QUERY;
        END;
        `;
        
        await db.promise().query(createProc);
        console.log('Search_User_Details procedure updated successfully');
    } catch (err) {
        console.error('Error updating procedure:', err);
    }
    process.exit();
}

update();
