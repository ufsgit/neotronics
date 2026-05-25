const db = require('../dbconnection');

async function fixSP() {
    try {
        const sql = `
DROP PROCEDURE IF EXISTS Save_Requirement;
CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`Save_Requirement\`(
    IN \`RequirementMaster_Id_\` INT,
    IN \`Account_Party_Id_\` INT,
    IN \`EntryDate_\` DATETIME,
    IN \`RequirementNo_\` VARCHAR(100),
    IN \`POnumber_\` VARCHAR(100),
    IN \`CurrencyId_\` INT,
    IN \`PaymentTerms_\` VARCHAR(500),
    IN \`AttendEmployee_\` VARCHAR(250),
    IN \`TotalAmount_\` DECIMAL(18,4),
    IN \`TotalDiscount_\` DECIMAL(18,4),
    IN \`Roundoff_Amt_\` DECIMAL(18,4),
    IN \`Total_Amount_\` DECIMAL(18,4),
    IN \`Basic_Discount_\` DECIMAL(18,4),
    IN \`NetTotal_\` DECIMAL(18,4),
    IN \`Brand_\` VARCHAR(500),
    IN \`PriceBasis_\` VARCHAR(500),
    IN \`Delivery_\` VARCHAR(500),
    IN \`Validity_\` VARCHAR(500),
    IN \`Description1_\` TEXT,
    IN \`User_Id_\` INT,
    IN \`Delivery_Address1_\` VARCHAR(500),
    IN \`Delivery_Address2_\` VARCHAR(500),
    IN \`Delivery_Address3_\` VARCHAR(500),
    IN \`Delivery_Address4_\` VARCHAR(500),
    IN \`Charge1_\` VARCHAR(500),
    IN \`charge1_Amount_\` DECIMAL(18,4),
    IN \`Charge2_\` VARCHAR(500),
    IN \`charge2_Amount_\` DECIMAL(18,4),
    IN \`Discount_Description_\` VARCHAR(500),
    IN \`Additional_Discount_\` DECIMAL(18,4),
    IN \`Description2_\` TEXT,
    IN \`Amount_In_Words_\` VARCHAR(1000),
    IN \`PreparedBy_\` VARCHAR(500),
    IN \`Charge1per_\` DECIMAL(18,4),
    IN \`Payment_Term_Description_\` VARCHAR(500),
    IN \`VAT_Percentage_\` DECIMAL(18,4),
    IN \`VAT_Amount_\` DECIMAL(18,4),
    IN \`TaxableAmount_\` DECIMAL(18,4),
    IN \`KindAttend_\` VARCHAR(500),
    IN \`PaymentTermValue_\` INT,
    IN \`Supplier_Ref_No_\` VARCHAR(500),
    IN \`Requirement_Details_\` JSON
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
            Payment_Term_Description, VAT_Percentage, VAT_Amount, TaxableAmount, KindAttend, PaymentTermValue, Supplier_Ref_No, DeleteStatus
        )
        VALUES (
            Account_Party_Id_, EntryDate_, RequirementNo_, POnumber_, CurrencyId_, PaymentTerms_, AttendEmployee_,
            TotalAmount_, TotalDiscount_, Roundoff_Amt_, Total_Amount_, Basic_Discount_, NetTotal_, Brand_, PriceBasis_,
            Delivery_, Validity_, Description1_, User_Id_, Delivery_Address1_, Delivery_Address2_, Delivery_Address3_,
            Delivery_Address4_, Charge1_, charge1_Amount_, Charge2_, charge2_Amount_, Discount_Description_,
            Additional_Discount_, Description2_, Amount_In_Words_, PreparedBy_, Charge1per_,
            Payment_Term_Description_, VAT_Percentage_, VAT_Amount_, TaxableAmount_, KindAttend_, PaymentTermValue_, Supplier_Ref_No_, 0
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

    DELETE FROM requirementdetails WHERE RequirementMaster_Id = _RequirementMaster_Id;

    INSERT INTO requirementdetails (
        RequirementMaster_Id, ItemId, ItemCode, ItemName, GroupId, GroupName, UnitId, UnitName,
        StockId, HSNMasterId, HSNCODE, Country_Id, Country_Name, UnitPrice, Quantity,
        Amount, Discount, TaxableAmount, TaxAmount, NetValue, Availability,
        Item_Discount_Amount, Unit_Discount, Sale_Tax, part_number, DeleteStatus
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
        COALESCE(j.part_number, j.Item_Code),
        0
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
END;
`;
        await db.promise().query(sql.split(';')[0]);
        await db.promise().query(sql.substring(sql.indexOf('CREATE DEFINER')));
        console.log("Successfully fixed Save_Requirement SP to insert DeleteStatus.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixSP();
