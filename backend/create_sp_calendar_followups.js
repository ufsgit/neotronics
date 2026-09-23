var db = require('./dbconnection');

db.query("DROP PROCEDURE IF EXISTS Get_Calendar_FollowUps;", function(err) {
    if (err) {
        console.error("Error dropping:", err);
        process.exit(1);
    }
    
    var createSp = `CREATE PROCEDURE Get_Calendar_FollowUps(IN p_User_Id INT)
BEGIN
    IF p_User_Id IS NULL OR p_User_Id = 0 THEN
        SELECT 
            DATE_FORMAT(Next_FollowUp_Date, '%Y-%m-%d') as date,
            Lead_Name as customer,
            COALESCE(FollowUp_Remark, Remarks, '') as nextAction,
            COALESCE(Current_Pipeline_Stage, Status_Name, '') as status,
            COALESCE(Lead_Priority, '') as priority,
            COALESCE(POC_Full_Name, Contact_Person, '') as contact
        FROM \`Lead\`
        WHERE Next_FollowUp_Date IS NOT NULL 
          AND Next_FollowUp_Date != ''
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Next_FollowUp_Date ASC;
    ELSE
        SELECT 
            DATE_FORMAT(Next_FollowUp_Date, '%Y-%m-%d') as date,
            Lead_Name as customer,
            COALESCE(FollowUp_Remark, Remarks, '') as nextAction,
            COALESCE(Current_Pipeline_Stage, Status_Name, '') as status,
            COALESCE(Lead_Priority, '') as priority,
            COALESCE(POC_Full_Name, Contact_Person, '') as contact
        FROM \`Lead\`
        WHERE Next_FollowUp_Date IS NOT NULL 
          AND Next_FollowUp_Date != ''
          AND IFNULL(DeleteStatus, 0) = 0
          AND (Staff_Id = p_User_Id OR FollowUp_Staff_Id = p_User_Id OR Login_User_Id = p_User_Id)
        ORDER BY Next_FollowUp_Date ASC;
    END IF;
END;`;

    db.query(createSp, function(err) {
        if (err) {
            console.error("Error creating:", err);
            process.exit(1);
        }
        console.log("SP Get_Calendar_FollowUps created successfully!");
        process.exit(0);
    });
});
