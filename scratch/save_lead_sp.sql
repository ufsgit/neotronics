CREATE DEFINER=`root`@`localhost` PROCEDURE `Save_Lead`(
            IN _Lead_Id INT,
            IN _Lead_Name VARCHAR(100),
            IN _Phone VARCHAR(100),
            IN _Source INT,
            IN _Contact_Person VARCHAR(100),
            IN _Contact_Number VARCHAR(100),
            IN _Vertical VARCHAR(500),
            IN _Enquiry_For VARCHAR(500),
            IN _Designation INT,
            IN _Email VARCHAR(200),
            IN _Website VARCHAR(200),
            IN _Address VARCHAR(1000),
            IN _Review VARCHAR(1000),
            IN _Rate VARCHAR(100),
            IN _State INT,
            IN _District INT,
            IN _Department_Id INT,
            IN _Status_Id INT,
            IN _Staff_Id INT,
            IN _Remark VARCHAR(1000),
            IN _Is_FollowUp BIT,
            IN _FollowUp_Department_Id INT,
            IN _FollowUp_Status_Id INT,
            IN _FollowUp_Staff_Id INT,
            IN _FollowUp_Remark VARCHAR(1000),
            IN _FollowUp_Date DATETIME,
            IN _Login_User_Id INT,
            IN _Next_FollowUp_Date DATE
        )
BEGIN
            DECLARE _Generated_Lead_Id INT;
            DECLARE _Tbl_Source_Name VARCHAR(100);
            DECLARE _Tbl_Vertical_Name VARCHAR(100);
            DECLARE _Tbl_Designation_Name VARCHAR(100);
            DECLARE _Tbl_State_Name VARCHAR(100);
            DECLARE _Tbl_District_Name VARCHAR(100);
            DECLARE _Tbl_Department_Name VARCHAR(100);
            DECLARE _Tbl_Status_Name VARCHAR(100);
            DECLARE _Tbl_FollowUp_Dept_Name VARCHAR(100);
            DECLARE _Tbl_FollowUp_Status_Name VARCHAR(100);

            SELECT Source_Name INTO _Tbl_Source_Name FROM Enquiry_Source WHERE Source_Id = _Source;
            SELECT Vertical_Name INTO _Tbl_Vertical_Name FROM Vertical WHERE Vertical_Id = CAST(SUBSTRING_INDEX(_Vertical, ',', 1) AS UNSIGNED);
            SELECT Designation_Name INTO _Tbl_Designation_Name FROM Designation WHERE Designation_Id = _Designation;
            SELECT State_Name INTO _Tbl_State_Name FROM State WHERE State_Id = _State;
            SELECT District_Name INTO _Tbl_District_Name FROM District WHERE District_Id = _District;
            SELECT Department_Name INTO _Tbl_Department_Name FROM Department WHERE Department_Id = _Department_Id;
            SELECT Status_Name INTO _Tbl_Status_Name FROM Department_Status WHERE Status_Id = _Status_Id;

            IF _Lead_Id = 0 THEN
                INSERT INTO `Lead` (
                    Lead_Name, Phone, Source, Source_Name, Contact_Person, Contact_Number, Vertical, Vertical_Name, Enquiry_For,
                    Designation, Designation_Name, Email, Website, Address, Review, Rate, 
                    State, State_Name, District, District_Name, Department_Id, Department_Name, 
                    Status_Id, Status_Name, Staff_Id, Remark, Next_FollowUp_Date
                ) VALUES (
                    _Lead_Name, _Phone, _Source, _Tbl_Source_Name, _Contact_Person, _Contact_Number, _Vertical, _Tbl_Vertical_Name, _Enquiry_For,
                    _Designation, _Tbl_Designation_Name, _Email, _Website, _Address, _Review, _Rate,
                    _State, _Tbl_State_Name, _District, _Tbl_District_Name, _Department_Id, _Tbl_Department_Name,
                    _Status_Id, _Tbl_Status_Name, _Staff_Id, _Remark, _Next_FollowUp_Date
                );
                SET _Generated_Lead_Id = LAST_INSERT_ID();
            ELSE
                UPDATE `Lead`
                SET 
                    Lead_Name = _Lead_Name, Phone = _Phone, Source = _Source, Source_Name = _Tbl_Source_Name,
                    Contact_Person = _Contact_Person, Contact_Number = _Contact_Number, Vertical = _Vertical, Vertical_Name = _Tbl_Vertical_Name, Enquiry_For = _Enquiry_For,
                    Designation = _Designation, Designation_Name = _Tbl_Designation_Name, Email = _Email,
                    Website = _Website, Address = _Address, Review = _Review, Rate = _Rate,
                    State = _State, State_Name = _Tbl_State_Name, District = _District, District_Name = _Tbl_District_Name,
                    Department_Id = _Department_Id, Department_Name = _Tbl_Department_Name,
                    Status_Id = _Status_Id, Status_Name = _Tbl_Status_Name, Staff_Id = _Staff_Id, Remark = _Remark, Next_FollowUp_Date = _Next_FollowUp_Date
                WHERE Lead_Id = _Lead_Id;
                SET _Generated_Lead_Id = _Lead_Id;
            END IF;

            IF _Is_FollowUp = 1 THEN
                SELECT Department_Name INTO _Tbl_FollowUp_Dept_Name FROM Department WHERE Department_Id = _FollowUp_Department_Id;
                SELECT Status_Name INTO _Tbl_FollowUp_Status_Name FROM Department_Status WHERE Status_Id = _FollowUp_Status_Id;
                
                INSERT INTO `Follow_up` (
                    Lead_Id, Department_Id, Department_Name, Status_Id, Status_Name, Staff_Id, Remark, FollowUp_Date, Login_User_Id, Next_FollowUp_Date
                ) VALUES (
                    _Generated_Lead_Id, _FollowUp_Department_Id, _Tbl_FollowUp_Dept_Name, _FollowUp_Status_Id, _Tbl_FollowUp_Status_Name, _FollowUp_Staff_Id, _FollowUp_Remark, _FollowUp_Date, _Login_User_Id, _Next_FollowUp_Date
                );
            END IF;
            SELECT _Generated_Lead_Id AS Key_Id;
        END