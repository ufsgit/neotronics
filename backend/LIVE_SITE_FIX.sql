-- ============================================================
-- FIX SCRIPT for Neotronics Live Site
-- Run this in phpMyAdmin or any MySQL client on the live DB
-- Fixes "Error Occurred while saving" on Company and User pages
-- ============================================================


-- ============================================================
-- FIX 1: Add missing file_url column to company_info table
-- ============================================================
ALTER TABLE company_info 
ADD COLUMN IF NOT EXISTS file_url VARCHAR(500) DEFAULT '';


-- ============================================================
-- FIX 2: Update Save_Company procedure (19 -> 20 params)
-- Adds the missing file_url_ parameter
-- ============================================================
DROP PROCEDURE IF EXISTS Save_Company;

DELIMITER $$
CREATE PROCEDURE `Save_Company`(
  IN Company_Id_ INT,
  IN Company_Name_ LONGTEXT,
  IN Address1_ LONGTEXT,
  IN Address2_ LONGTEXT,
  IN Address3_ LONGTEXT,
  IN Address4_ LONGTEXT,
  IN Mobile_Number_ VARCHAR(100),
  IN Phone_Number_ VARCHAR(100),
  IN FAX_ VARCHAR(30),
  IN EMail_ VARCHAR(250),
  IN Website_ VARCHAR(150),
  IN Logo_ LONGTEXT,
  IN Code_ VARCHAR(50),
  IN GSTNO_ VARCHAR(50),
  IN CINO_ VARCHAR(200),
  IN PANNO_ VARCHAR(50),
  IN Note_ LONGTEXT,
  IN Doc_Photo_ LONGTEXT,
  IN File_Path_ LONGTEXT,
  IN file_url_ VARCHAR(500)
)
BEGIN
  DELETE FROM db_logs;
  INSERT INTO db_logs VALUES(0, Company_Id_, 'Company_Id_0', '');

  IF Company_Id_ > 0 THEN
    UPDATE company_info
    SET
      Company_Name  = Company_Name_,
      Address1      = Address1_,
      Address2      = Address2_,
      Address3      = Address3_,
      Phone         = Phone_Number_,
      Gsm           = GSTNO_,
      Email         = EMail_,
      CR_No         = CINO_,
      Company_Id    = Company_Id_,
      File_Upload   = Logo_,
      Note          = Note_,
      Vat_No        = PANNO_,
      File_Path     = File_Path_,
      file_url      = file_url_
    WHERE Company_Id = Company_Id_;
  ELSE
    INSERT INTO db_logs VALUES(0, Company_Id_, 'Company_Id2', '');
    SET Company_Id_ = (SELECT COALESCE(MAX(Company_Id), 0) + 1 FROM company_info);
    INSERT INTO company_info(
      Company_Name, Address1, Address2, Address3,
      Phone, Email, File_Upload, Gsm, CR_No, Company_Id,
      Note, Vat_No, DeleteStatus, File_Path, file_url
    )
    VALUES (
      Company_Name_, Address1_, Address2_, Address3_,
      Phone_Number_, EMail_, Logo_, GSTNO_, CINO_, Company_Id_,
      Note_, PANNO_, false, File_Path_, file_url_
    );
  END IF;

  SELECT Company_Id_;
END$$
DELIMITER ;


-- ============================================================
-- FIX 3: Update Save_User_Details procedure (11 -> 12 params)
-- Adds the missing Branch_Id_ parameter
-- ============================================================
DROP PROCEDURE IF EXISTS Save_User_Details;

DELIMITER $$
CREATE PROCEDURE `Save_User_Details`(
  IN User_Details_Id_ DECIMAL,
  IN User_Details_Name_ VARCHAR(250),
  IN Password_ VARCHAR(250),
  IN User_Type_ INT,
  IN User_Menu_Selection JSON,
  IN Working_Status_Id_ INT,
  IN Working_Status_ VARCHAR(100),
  IN Role_Id_ BIGINT,
  IN Department_Id_ INT,
  IN Branch_Id_ INT,
  IN Email_ VARCHAR(250),
  IN Mobile_ VARCHAR(250)
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
        Password          = Password_,
        User_Type         = User_Type_,
        Working_Status    = Working_Status_,
        Working_Status_Id = Working_Status_Id_,
        Role_Id           = Role_Id_,
        Department_Id     = Department_Id_,
        Email             = Email_,
        Mobile            = Mobile_
    WHERE User_Details_Id = User_Details_Id_;
  ELSE
    SET User_Details_Id_ = (SELECT COALESCE(MAX(User_Details_Id), 0) + 1 FROM User_Details);
    INSERT INTO User_Details (
      User_Details_Id, User_Details_Name, Password, User_Type, DeleteStatus,
      Working_Status, Working_Status_Id, Role_Id, Department_Id, Email, Mobile
    )
    VALUES (
      User_Details_Id_, User_Details_Name_, Password_, User_Type_, FALSE,
      Working_Status_, Working_Status_Id_, Role_Id_, Department_Id_, Email_, Mobile_
    );
  END IF;

  WHILE i < JSON_LENGTH(User_Menu_Selection) DO
    SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].Menu_Id')))   INTO Menu_Id_;

    SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsEdit')))    INTO IsEdit_;
    IF (IsEdit_  = 'true') THEN SET IsEdit_  = 1; ELSE SET IsEdit_  = 0; END IF;

    SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsSave')))    INTO IsSave_;
    IF (IsSave_  = 'true') THEN SET IsSave_  = 1; ELSE SET IsSave_  = 0; END IF;

    SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsDelete')))  INTO IsDelete_;
    IF (IsDelete_ = 'true') THEN SET IsDelete_ = 1; ELSE SET IsDelete_ = 0; END IF;

    SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].IsView')))    INTO IsView_;
    IF (IsView_  = 'true') THEN SET IsView_  = 1; ELSE SET IsView_  = 0; END IF;

    SELECT JSON_UNQUOTE(JSON_EXTRACT(User_Menu_Selection, CONCAT('$[', i, '].Menu_Status'))) INTO Menu_Status_;
    IF (Menu_Status_ = 'true') THEN SET Menu_Status_ = 1; ELSE SET Menu_Status_ = 0; END IF;

    INSERT INTO User_Menu_Selection (Menu_Id, User_Id, IsEdit, IsSave, IsDelete, IsView, Menu_Status, DeleteStatus)
    VALUES (Menu_Id_, User_Details_Id_, IsEdit_, IsSave_, IsDelete_, IsView_, Menu_Status_, FALSE);

    SET i = i + 1;
  END WHILE;

  SELECT User_Details_Id_;
END$$
DELIMITER ;

-- ============================================================
-- DONE - Both procedures are now fixed.
-- Company page: Save_Company now accepts 20 params (added file_url_)
-- User page:    Save_User_Details now accepts 12 params (added Branch_Id_)
-- ============================================================
