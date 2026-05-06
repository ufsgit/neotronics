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
    `part_number` VARCHAR(100) DEFAULT NULL,
    `gst` DECIMAL(18,4) DEFAULT NULL,
    `cgst` DECIMAL(18,4) DEFAULT NULL,
    `sgst` DECIMAL(18,4) DEFAULT NULL,
    `igst` DECIMAL(18,4) DEFAULT NULL,
    `b2b_rate` DECIMAL(18,4) DEFAULT NULL,
    `b2c_rate` DECIMAL(18,4) DEFAULT NULL,
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
        Item_Discount_Amount, Unit_Discount,
        part_number, gst, cgst, sgst, igst, b2b_rate, b2c_rate
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
        COALESCE(j.part_number, j.Item_Code),
        CAST(j.gst AS DECIMAL(18,4)),
        CAST(j.cgst AS DECIMAL(18,4)),
        CAST(j.sgst AS DECIMAL(18,4)),
        CAST(j.igst AS DECIMAL(18,4)),
        CAST(j.b2b_rate AS DECIMAL(18,4)),
        CAST(j.b2c_rate AS DECIMAL(18,4))
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
            part_number VARCHAR(100) PATH '$.part_number',
            gst DECIMAL(18,4) PATH '$.gst',
            cgst DECIMAL(18,4) PATH '$.cgst',
            sgst DECIMAL(18,4) PATH '$.sgst',
            igst DECIMAL(18,4) PATH '$.igst',
            b2b_rate DECIMAL(18,4) PATH '$.b2b_rate',
            b2c_rate DECIMAL(18,4) PATH '$.b2c_rate'
        )
    ) AS j;

    SELECT _RequirementMaster_Id AS RequirementMaster_Id_;
END //

DROP PROCEDURE IF EXISTS `Save_requirementdetails`//
CREATE PROCEDURE `Save_requirementdetails`(
    IN `RequirementDetails_Id_` INT,
    IN `RequirementMaster_Id_` INT,
    IN `ItemId_` INT,
    IN `ItemCode_` VARCHAR(100),
    IN `ItemName_` VARCHAR(500),
    IN `GroupId_` INT,
    IN `GroupName_` VARCHAR(200),
    IN `UnitId_` INT,
    IN `UnitName_` VARCHAR(100),
    IN `StockId_` INT,
    IN `HSNMasterId_` INT,
    IN `HSNCODE_` VARCHAR(100),
    IN `Country_Id_` INT,
    IN `Country_Name_` VARCHAR(100),
    IN `UnitPrice_` DECIMAL(18,4),
    IN `Quantity_` DECIMAL(18,4),
    IN `Amount_` DECIMAL(18,4),
    IN `Discount_` DECIMAL(18,4),
    IN `TaxableAmount_` DECIMAL(18,4),
    IN `TaxAmount_` DECIMAL(18,4),
    IN `NetValue_` DECIMAL(18,4),
    IN `Availability_` VARCHAR(100),
    IN `Item_Discount_Amount_` DECIMAL(18,4),
    IN `Unit_Discount_` DECIMAL(18,4)
)
BEGIN
    IF (RequirementDetails_Id_ = 0) THEN
        INSERT INTO requirementdetails (
            RequirementMaster_Id, ItemId, ItemCode, ItemName, GroupId, GroupName, UnitId, UnitName, StockId,
            HSNMasterId, HSNCODE, Country_Id, Country_Name, UnitPrice, Quantity, Amount, Discount,
            TaxableAmount, TaxAmount, NetValue, Availability, Item_Discount_Amount, Unit_Discount
        )
        VALUES (
            RequirementMaster_Id_, ItemId_, ItemCode_, ItemName_, GroupId_, GroupName_, UnitId_, UnitName_, StockId_,
            HSNMasterId_, HSNCODE_, Country_Id_, Country_Name_, UnitPrice_, Quantity_, Amount_, Discount_,
            TaxableAmount_, TaxAmount_, NetValue_, Availability_, Item_Discount_Amount_, Unit_Discount_
        );
    ELSE
        UPDATE requirementdetails SET
            RequirementMaster_Id = RequirementMaster_Id_, ItemId = ItemId_, ItemCode = ItemCode_, ItemName = ItemName_,
            GroupId = GroupId_, GroupName = GroupName_, UnitId = UnitId_, UnitName = UnitName_, StockId = StockId_,
            HSNMasterId = HSNMasterId_, HSNCODE = HSNCODE_, Country_Id = Country_Id_, Country_Name = Country_Name_,
            UnitPrice = UnitPrice_, Quantity = Quantity_, Amount = Amount_, Discount = Discount_,
            TaxableAmount = TaxableAmount_, TaxAmount = TaxAmount_, NetValue = NetValue_,
            Availability = Availability_, Item_Discount_Amount = Item_Discount_Amount_, Unit_Discount = Unit_Discount_
        WHERE RequirementDetails_Id = RequirementDetails_Id_;
    END IF;
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
