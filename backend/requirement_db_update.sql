-- 1. Create requirementmaster table - Drop if exists for clean refactor
DROP TABLE IF EXISTS `requirementmaster`;
CREATE TABLE `requirementmaster` (
    `RequirementMaster_Id` INT NOT NULL AUTO_INCREMENT,
    `Account_Party_Id` INT DEFAULT NULL,
    `EntryDate` DATETIME DEFAULT NULL,
    `RequirementNo` VARCHAR(100) DEFAULT NULL,
    `POnumber` VARCHAR(100) DEFAULT NULL,
    `CurrencyId` INT DEFAULT NULL,
    `PaymentTerms` VARCHAR(500) DEFAULT NULL,
    `AttendEmployee` INT DEFAULT NULL,
    `TotalAmount` DECIMAL(18,4) DEFAULT NULL,
    `TotalDiscount` DECIMAL(18,4) DEFAULT NULL,
    `Roundoff_Amt` DECIMAL(18,4) DEFAULT NULL,
    `Total_Amount` DECIMAL(18,4) DEFAULT NULL,
    `Basic_Discount` DECIMAL(18,4) DEFAULT NULL,
    `NetTotal` DECIMAL(18,4) DEFAULT NULL,
    `Brand` VARCHAR(500) DEFAULT NULL,
    `PriceBasis` VARCHAR(500) DEFAULT NULL,
    `Delivery` VARCHAR(500) DEFAULT NULL,
    `Validity` VARCHAR(500) DEFAULT NULL,
    `Description1` TEXT DEFAULT NULL,
    `User_Id` INT DEFAULT NULL,
    `Delivery_Address1` VARCHAR(500) DEFAULT NULL,
    `Delivery_Address2` VARCHAR(500) DEFAULT NULL,
    `Delivery_Address3` VARCHAR(500) DEFAULT NULL,
    `Delivery_Address4` VARCHAR(500) DEFAULT NULL,
    `Charge1` VARCHAR(500) DEFAULT NULL,
    `charge1_Amount` DECIMAL(18,4) DEFAULT NULL,
    `Charge2` VARCHAR(500) DEFAULT NULL,
    `charge2_Amount` DECIMAL(18,4) DEFAULT NULL,
    `Discount_Description` VARCHAR(500) DEFAULT NULL,
    `Additional_Discount` DECIMAL(18,4) DEFAULT NULL,
    `Description2` TEXT DEFAULT NULL,
    `Amount_In_Words` VARCHAR(1000) DEFAULT NULL,
    `PreparedBy` VARCHAR(500) DEFAULT NULL,
    `Charge1per` DECIMAL(18,4) DEFAULT NULL,
    `Payment_Term_Description` VARCHAR(500) DEFAULT NULL,
    `VAT_Percentage` DECIMAL(18,4) DEFAULT NULL,
    `VAT_Amount` DECIMAL(18,4) DEFAULT NULL,
    `TaxableAmount` DECIMAL(18,4) DEFAULT NULL,
    `KindAttend` VARCHAR(500) DEFAULT NULL,
    `PaymentTermValue` INT DEFAULT NULL,
    `Supplier_Ref_No` VARCHAR(500) DEFAULT NULL,
    `DeleteStatus` BIT DEFAULT b'0',
    PRIMARY KEY (`RequirementMaster_Id`)
);

-- 2. Create requirementdetails table - Drop if exists for clean refactor
DROP TABLE IF EXISTS `requirementdetails`;
CREATE TABLE `requirementdetails` (
    `RequirementDetails_Id` INT NOT NULL AUTO_INCREMENT,
    `RequirementMaster_Id` INT NOT NULL,
    `ItemId` INT DEFAULT NULL,
    `ItemCode` VARCHAR(100) DEFAULT NULL,
    `ItemName` VARCHAR(500) DEFAULT NULL,
    `GroupId` INT DEFAULT NULL,
    `GroupName` VARCHAR(200) DEFAULT NULL,
    `UnitId` INT DEFAULT NULL,
    `UnitName` VARCHAR(100) DEFAULT NULL,
    `StockId` INT DEFAULT NULL,
    `HSNMasterId` INT DEFAULT NULL,
    `HSNCODE` VARCHAR(100) DEFAULT NULL,
    `Country_Id` INT DEFAULT NULL,
    `Country_Name` VARCHAR(100) DEFAULT NULL,
    `UnitPrice` DECIMAL(18,4) DEFAULT NULL,
    `Quantity` DECIMAL(18,4) DEFAULT NULL,
    `Amount` DECIMAL(18,4) DEFAULT NULL,
    `Discount` DECIMAL(18,4) DEFAULT NULL,
    `TaxableAmount` DECIMAL(18,4) DEFAULT NULL,
    `TaxAmount` DECIMAL(18,4) DEFAULT NULL,
    `NetValue` DECIMAL(18,4) DEFAULT NULL,
    `Availability` VARCHAR(100) DEFAULT NULL,
    `Item_Discount_Amount` DECIMAL(18,4) DEFAULT NULL,
    `Unit_Discount` DECIMAL(18,4) DEFAULT NULL,
    `Sale_Tax` DECIMAL(18,4) DEFAULT NULL,
    `part_number` VARCHAR(100) DEFAULT NULL,
    `DeleteStatus` BIT DEFAULT b'0',
    PRIMARY KEY (`RequirementDetails_Id`)
);

-- 3. Stored Procedures
DELIMITER //

DROP PROCEDURE IF EXISTS `Save_Requirement`//
CREATE PROCEDURE `Save_Requirement`(
    IN `RequirementMaster_Id_` INT,
    IN `Account_Party_Id_` INT,
    IN `EntryDate_` DATETIME,
    IN `RequirementNo_` VARCHAR(100),
    IN `POnumber_` VARCHAR(100),
    IN `CurrencyId_` INT,
    IN `PaymentTerms_` VARCHAR(500),
    IN `AttendEmployee_` INT,
    IN `TotalAmount_` DECIMAL(18,4),
    IN `TotalDiscount_` DECIMAL(18,4),
    IN `Roundoff_Amt_` DECIMAL(18,4),
    IN `Total_Amount_` DECIMAL(18,4),
    IN `Basic_Discount_` DECIMAL(18,4),
    IN `NetTotal_` DECIMAL(18,4),
    IN `Brand_` VARCHAR(500),
    IN `PriceBasis_` VARCHAR(500),
    IN `Delivery_` VARCHAR(500),
    IN `Validity_` VARCHAR(500),
    IN `Description1_` TEXT,
    IN `User_Id_` INT,
    IN `Delivery_Address1_` VARCHAR(500),
    IN `Delivery_Address2_` VARCHAR(500),
    IN `Delivery_Address3_` VARCHAR(500),
    IN `Delivery_Address4_` VARCHAR(500),
    IN `Charge1_` VARCHAR(500),
    IN `charge1_Amount_` DECIMAL(18,4),
    IN `Charge2_` VARCHAR(500),
    IN `charge2_Amount_` DECIMAL(18,4),
    IN `Discount_Description_` VARCHAR(500),
    IN `Additional_Discount_` DECIMAL(18,4),
    IN `Description2_` TEXT,
    IN `Amount_In_Words_` VARCHAR(1000),
    IN `PreparedBy_` VARCHAR(500),
    IN `Charge1per_` DECIMAL(18,4),
    IN `Payment_Term_Description_` VARCHAR(500),
    IN `VAT_Percentage_` DECIMAL(18,4),
    IN `VAT_Amount_` DECIMAL(18,4),
    IN `TaxableAmount_` DECIMAL(18,4),
    IN `KindAttend_` VARCHAR(500),
    IN `PaymentTermValue_` INT,
    IN `Supplier_Ref_No_` VARCHAR(500),
    IN `Requirement_Details_` JSON
)
BEGIN
    DECLARE _RequirementMaster_Id INT;
    
    IF (RequirementNo_ IS NULL OR RequirementNo_ = '' OR RequirementNo_ = '0') THEN
        SET RequirementNo_ = (SELECT IFNULL(MAX(CAST(RequirementNo AS UNSIGNED)), 0) + 1 FROM requirementmaster);
    END IF;

    IF (RequirementMaster_Id_ = 0) THEN
        INSERT INTO requirementmaster (
            Account_Party_Id, EntryDate, RequirementNo, POnumber, CurrencyId, PaymentTerms, AttendEmployee,
            TotalAmount, TotalDiscount, Roundoff_Amt, Total_Amount, Basic_Discount, NetTotal, Brand, PriceBasis,
            Delivery, Validity, Description1, User_Id, Delivery_Address1, Delivery_Address2, Delivery_Address3,
            Delivery_Address4, Charge1, charge1_Amount, Charge2, charge2_Amount, Discount_Description,
            Additional_Discount, Description2, Amount_In_Words, PreparedBy, Charge1per,
            Payment_Term_Description, VAT_Percentage, VAT_Amount, TaxableAmount, KindAttend, PaymentTermValue, Supplier_Ref_No
        )
        VALUES (
            Account_Party_Id_, EntryDate_, RequirementNo_, POnumber_, CurrencyId_, PaymentTerms_, AttendEmployee_,
            TotalAmount_, TotalDiscount_, Roundoff_Amt_, Total_Amount_, Basic_Discount_, NetTotal_, Brand_, PriceBasis_,
            Delivery_, Validity_, Description1_, User_Id_, Delivery_Address1_, Delivery_Address2_, Delivery_Address3_,
            Delivery_Address4_, Charge1_, charge1_Amount_, Charge2_, charge2_Amount_, Discount_Description_,
            Additional_Discount_, Description2_, Amount_In_Words_, PreparedBy_, Charge1per_,
            Payment_Term_Description_, VAT_Percentage_, VAT_Amount_, TaxableAmount_, KindAttend_, PaymentTermValue_, Supplier_Ref_No_
        );
        SET _RequirementMaster_Id = LAST_INSERT_ID();
    ELSE
        UPDATE requirementmaster SET
            Account_Party_Id = Account_Party_Id_, EntryDate = EntryDate_, RequirementNo = RequirementNo_,
            POnumber = POnumber_, CurrencyId = CurrencyId_, PaymentTerms = PaymentTerms_,
            AttendEmployee = AttendEmployee_, TotalAmount = TotalAmount_, TotalDiscount = TotalDiscount_,
            Roundoff_Amt = Roundoff_Amt_, Total_Amount = Total_Amount_, Basic_Discount = Basic_Discount_,
            NetTotal = NetTotal_, Brand = Brand_, PriceBasis = PriceBasis_,
            Delivery = Delivery_, Validity = Validity_, Description1 = Description1_, User_Id = User_Id_,
            Delivery_Address1 = Delivery_Address1_, Delivery_Address2 = Delivery_Address2_,
            Delivery_Address3 = Delivery_Address3_, Delivery_Address4 = Delivery_Address4_,
            Charge1 = Charge1_, charge1_Amount = charge1_Amount_,
            Charge2 = Charge2_, charge2_Amount = charge2_Amount_, Discount_Description = Discount_Description_,
            Additional_Discount = Additional_Discount_, Description2 = Description2_,
            Amount_In_Words = Amount_In_Words_, PreparedBy = PreparedBy_, Charge1per = Charge1per_,
            Payment_Term_Description = Payment_Term_Description_, VAT_Percentage = VAT_Percentage_,
            VAT_Amount = VAT_Amount_, TaxableAmount = TaxableAmount_, KindAttend = KindAttend_,
            PaymentTermValue = PaymentTermValue_, Supplier_Ref_No = Supplier_Ref_No_
        WHERE RequirementMaster_Id = RequirementMaster_Id_;
        SET _RequirementMaster_Id = RequirementMaster_Id_;
    END IF;

    -- Handle Details
    DELETE FROM requirementdetails WHERE RequirementMaster_Id = _RequirementMaster_Id;
    
    -- Insert details from JSON
    INSERT INTO requirementdetails (
        RequirementMaster_Id, ItemId, ItemCode, ItemName, GroupId, GroupName, UnitId, UnitName,
        StockId, HSNMasterId, HSNCODE, Country_Id, Country_Name, UnitPrice, Quantity,
        Amount, Discount, TaxableAmount, TaxAmount, NetValue, Availability,
        Item_Discount_Amount, Unit_Discount, Sale_Tax, part_number
    )
    SELECT 
        _RequirementMaster_Id,
        CAST(j.ItemId AS UNSIGNED),
        j.Item_Code,
        j.ItemName,
        CAST(j.GroupId AS UNSIGNED),
        j.GroupName,
        CAST(j.UnitId AS UNSIGNED),
        j.UnitName,
        CAST(j.StockId AS UNSIGNED),
        CAST(j.HSNMasterId AS UNSIGNED),
        j.HSNCODE,
        CAST(j.Country_Id AS UNSIGNED),
        j.Country_Name,
        CAST(j.UnitPrice AS DECIMAL(18,4)),
        CAST(j.Quantity AS DECIMAL(18,4)),
        CAST(j.Amount AS DECIMAL(18,4)),
        CAST(j.Discount AS DECIMAL(18,4)),
        CAST(j.TaxableAmount AS DECIMAL(18,4)),
        CAST(j.TaxAmount AS DECIMAL(18,4)),
        CAST(j.NetValue AS DECIMAL(18,4)),
        j.Availability,
        CAST(j.Item_Discount_Amount AS DECIMAL(18,4)),
        CAST(j.Unit_Discount AS DECIMAL(18,4)),
        COALESCE(CAST(j.SaleTax AS DECIMAL(18,4)), CAST(j.gst AS DECIMAL(18,4)), 0),
        COALESCE(j.part_number, j.Item_Code)
    FROM JSON_TABLE(Requirement_Details_, '$[*]'
        COLUMNS (
            ItemId INT PATH '$.ItemId',
            Item_Code VARCHAR(100) PATH '$.Item_Code',
            ItemName VARCHAR(500) PATH '$.ItemName',
            GroupId INT PATH '$.GroupId',
            GroupName VARCHAR(200) PATH '$.GroupName',
            UnitId INT PATH '$.UnitId',
            UnitName VARCHAR(100) PATH '$.UnitName',
            StockId INT PATH '$.StockId',
            HSNMasterId INT PATH '$.HSNMasterId',
            HSNCODE VARCHAR(100) PATH '$.HSNCODE',
            Country_Id INT PATH '$.Country_Id',
            Country_Name VARCHAR(100) PATH '$.Country_Name',
            UnitPrice DECIMAL(18,4) PATH '$.UnitPrice',
            Quantity DECIMAL(18,4) PATH '$.Quantity',
            Amount DECIMAL(18,4) PATH '$.Amount',
            Discount DECIMAL(18,4) PATH '$.Discount',
            TaxableAmount DECIMAL(18,4) PATH '$.TaxableAmount',
            TaxAmount DECIMAL(18,4) PATH '$.TaxAmount',
            NetValue DECIMAL(18,4) PATH '$.NetValue',
            Availability VARCHAR(100) PATH '$.Availability',
            Item_Discount_Amount DECIMAL(18,4) PATH '$.Item_Discount_Amount',
            Unit_Discount DECIMAL(18,4) PATH '$.Unit_Discount',
            SaleTax DECIMAL(18,4) PATH '$.SaleTax',
            gst DECIMAL(18,4) PATH '$.gst',
            part_number VARCHAR(100) PATH '$.part_number'
        )
    ) AS j;

    SELECT _RequirementMaster_Id AS RequirementMaster_Id_;
END //

DROP PROCEDURE IF EXISTS `Save_requirementdetails`//
CREATE PROCEDURE `Save_requirementdetails`(
    IN `Requirement_Details_` JSON,
    IN `RequirementMaster_Id_` INT,
    IN `RequirementNo_` INT
)
BEGIN
    declare ItemId_ int;
    declare ItemCode_ varchar(500);
    declare ItemName_ longtext;
    declare UnitId_ int;
    declare UnitName_ varchar(100);
    declare StockId_ int;
    declare HSNMasterId_ int;
    declare HSNCODE_ varchar(50);
    declare UnitPrice_ decimal(18,3);
    declare Quantity_ decimal(18,3);
    declare Amount_ decimal(18,3);
    declare Discount_ decimal(18,3);
    declare TaxableAmount_ decimal(18,3);
    declare TaxAmount_ decimal(18,3);
    declare NetValue_ decimal(18,3);
    declare Availability_ varchar(200);
    declare Unit_Discount_ decimal(18,3);
    declare Sale_Tax_ decimal(18,3);
    declare RequirementDetails_Id_ int;
    declare Item_Discount_Amount_ decimal(18,3);
    DECLARE i int DEFAULT 0;
    declare GroupId_ int;
    declare GroupName_ varchar(100);
    DECLARE Country_Id_ INT DEFAULT 0;
    DECLARE Country_Name_ VARCHAR(250) DEFAULT '';
    delete from requirementdetails where RequirementMaster_Id = RequirementMaster_Id_;
    WHILE i < JSON_LENGTH(Requirement_Details_) DO
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].ItemId'))), 'null'), 0) INTO ItemId_;
        SELECT JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Item_Code'))) INTO ItemCode_;
        SELECT JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].ItemName'))) INTO ItemName_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].UnitId'))), 'null'), 0) INTO UnitId_;
        SELECT JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].UnitName'))) INTO UnitName_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].GroupId'))), 'null'), 0) INTO GroupId_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].GroupName'))), 'null'), '') INTO GroupName_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].StockId'))), 'null'), 0) INTO StockId_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].HSNMasterId'))), 'null'), 0) INTO HSNMasterId_;
        SELECT JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].HSNCODE'))) INTO HSNCODE_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].UnitPrice'))), 'null'), 0) INTO UnitPrice_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Quantity'))), 'null'), 0) INTO Quantity_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Amount'))), 'null'), 0) INTO Amount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Discount'))), 'null'), 0) INTO Discount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].TaxableAmount'))), 'null'), 0) INTO TaxableAmount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].TaxAmount'))), 'null'), 0) INTO TaxAmount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].NetValue'))), 'null'), 0) INTO NetValue_;
        SELECT JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Availability'))) INTO Availability_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Unit_Discount'))), 'null'), 0) INTO Unit_Discount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].SaleTax'))), 'null'), 0) INTO Sale_Tax_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Item_Discount_Amount'))), 'null'), 0) INTO Item_Discount_Amount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Country_Id'))), 'null'), 0) INTO Country_Id_;
        SELECT JSON_UNQUOTE(JSON_EXTRACT(Requirement_Details_, CONCAT('$.[' , i , '].Country_Name'))) INTO Country_Name_;
        if Availability_ is null or Availability_ = 'null' then
            set Availability_ = '';
        end if;
        SET RequirementDetails_Id_ = (SELECT COALESCE( MAX(RequirementDetails_Id ),0)+1 FROM requirementdetails);
        INSERT INTO requirementdetails(RequirementDetails_Id,RequirementMaster_Id,ItemId,ItemCode,ItemName,
            UnitId,UnitName,StockId,HSNMasterId,HSNCODE,UnitPrice,Quantity,Amount,Discount,TaxableAmount,TaxAmount,
            NetValue,Availability,DeleteStatus,Unit_Discount,Sale_Tax,GroupId,GroupName,Item_Discount_Amount,
            Country_Id, Country_Name)
        VALUES(RequirementDetails_Id_,RequirementMaster_Id_,ItemId_,ItemCode_,ItemName_,UnitId_,UnitName_,StockId_,HSNMasterId_,
            HSNCODE_,UnitPrice_,Quantity_,Amount_,Discount_,TaxableAmount_,TaxAmount_,NetValue_,Availability_,0,Unit_Discount_,Sale_Tax_,GroupId_,GroupName_,Item_Discount_Amount_,
            Country_Id_, Country_Name_);
        SELECT i + 1 INTO i;
    END WHILE;  
    SELECT RequirementMaster_Id_, RequirementNo_;
END //

DROP PROCEDURE IF EXISTS `Delete_Requirement_Master`//
CREATE PROCEDURE `Delete_Requirement_Master`(IN `Requirement_Master_Id_` INT)
BEGIN
    UPDATE requirementmaster SET DeleteStatus = 1 WHERE RequirementMaster_Id = Requirement_Master_Id_;
    UPDATE requirementdetails SET DeleteStatus = 1 WHERE RequirementMaster_Id = Requirement_Master_Id_;
END //

DROP PROCEDURE IF EXISTS `Delete_requirementdetails`//
CREATE PROCEDURE `Delete_requirementdetails`(IN `requirementdetails_Id_` INT)
BEGIN
    UPDATE requirementdetails SET DeleteStatus = 1 WHERE RequirementDetails_Id = requirementdetails_Id_;
END //

DROP PROCEDURE IF EXISTS `Get_Requirement_Master`//
CREATE PROCEDURE `Get_Requirement_Master`(IN `Requirement_Master_Id_` INT)
BEGIN
    SELECT * FROM requirementmaster WHERE RequirementMaster_Id = Requirement_Master_Id_ AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Get_Requirement_Details`//
CREATE PROCEDURE `Get_Requirement_Details`(IN `Requirement_Master_Id_` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_ AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Get_requirementdetails`//
CREATE PROCEDURE `Get_requirementdetails`(IN `requirementdetails_Id_` INT)
BEGIN
    SELECT * FROM requirementdetails WHERE RequirementDetails_Id = requirementdetails_Id_ AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Search_Requirement`//
CREATE PROCEDURE `Search_Requirement`(
    IN `Is_Date_Check_` TINYINT,
    IN `FromDate_` DATETIME,
    IN `ToDate_` DATETIME,
    IN `Account_Party_Id_` INT,
    IN `Requirement_No_` VARCHAR(100),
    IN `Part_No_` VARCHAR(100),
    IN `Item_Group_Id_` INT,
    IN `CurrencyDetails_Id_` INT,
    IN `User_Details_Id_` INT,
    IN `User_Type_` INT,
    IN `Login_User_Id_` INT
)
BEGIN
    SET @Query = 'SELECT rm.*, ca.Client_Accounts_Name AS Customer_Name 
                  FROM requirementmaster rm
                  LEFT JOIN Client_Accounts ca ON rm.Account_Party_Id = ca.Client_Accounts_Id
                  WHERE rm.DeleteStatus = 0';
    
    IF (Is_Date_Check_ = 1) THEN
        SET @Query = CONCAT(@Query, ' AND rm.EntryDate >= ''', FromDate_, ''' AND rm.EntryDate <= ''', ToDate_, '''');
    END IF;
    
    IF (Account_Party_Id_ > 0) THEN
        SET @Query = CONCAT(@Query, ' AND rm.Account_Party_Id = ', Account_Party_Id_);
    END IF;
    
    IF (Requirement_No_ != '' AND Requirement_No_ != 'undefined') THEN
        SET @Query = CONCAT(@Query, ' AND rm.RequirementNo LIKE ''%', Requirement_No_, '%''');
    END IF;
    
    SET @Query = CONCAT(@Query, ' ORDER BY rm.RequirementMaster_Id DESC');
    
    PREPARE stmt FROM @Query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //

DROP PROCEDURE IF EXISTS `Search_requirementdetails`//
CREATE PROCEDURE `Search_requirementdetails`(IN `requirementdetails_Name_` VARCHAR(100))
BEGIN
    SELECT * FROM requirementdetails 
    WHERE ItemName LIKE CONCAT('%', requirementdetails_Name_, '%') AND DeleteStatus = 0;
END //

-- Missing procedures from model mapping
-- Note: These might need implementation based on specific business logic, 
-- but I'll add placeholders to prevent errors.

DROP PROCEDURE IF EXISTS `Get_Salesmaster_Requirement_Details`//
CREATE PROCEDURE `Get_Salesmaster_Requirement_Details`(IN `Requirement_Master_Id_Edit` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Edit AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Get_DeliveryOrder_Requirement_Details`//
CREATE PROCEDURE `Get_DeliveryOrder_Requirement_Details`(IN `Requirement_Master_Id_Edit` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Edit AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Get_PackingList_Requirement_Details`//
CREATE PROCEDURE `Get_PackingList_Requirement_Details`(IN `Requirement_Master_Id_Edit` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Edit AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Get_PurchaseOrder_Requirement_Details`//
CREATE PROCEDURE `Get_PurchaseOrder_Requirement_Details`(IN `Requirement_Master_Id_Edit` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Edit AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Load_Profoma_Items_Pending_List_ByRequirement`//
CREATE PROCEDURE `Load_Profoma_Items_Pending_List_ByRequirement`(IN `Requirement_Master_Id_Param` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Param AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Load_Invoice_Items_Pending_List_ByRequirement`//
CREATE PROCEDURE `Load_Invoice_Items_Pending_List_ByRequirement`(IN `Requirement_Master_Id_Param` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Param AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Load_Delivery_Items_Pending_List_ByRequirement`//
CREATE PROCEDURE `Load_Delivery_Items_Pending_List_ByRequirement`(IN `Requirement_Master_Id_Param` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Param AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Load_Purchase_Items_Pending_List_ByRequirement`//
CREATE PROCEDURE `Load_Purchase_Items_Pending_List_ByRequirement`(IN `Requirement_Master_Id_Param` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Param AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Load_PackingList_Items_Pending_List_ByRequirement`//
CREATE PROCEDURE `Load_PackingList_Items_Pending_List_ByRequirement`(IN `Requirement_Master_Id_Param` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Param AND DeleteStatus = 0;
END //

DROP PROCEDURE IF EXISTS `Get_Proforma_Requirement_Details`//
CREATE PROCEDURE `Get_Proforma_Requirement_Details`(IN `Requirement_Master_Id_Edit` INT)
BEGIN
    SELECT *, ItemCode AS Item_Code FROM requirementdetails WHERE RequirementMaster_Id = Requirement_Master_Id_Edit AND DeleteStatus = 0;
END //

DELIMITER ;
