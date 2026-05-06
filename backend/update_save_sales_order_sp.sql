DROP PROCEDURE IF EXISTS `Save_Sales_Order_Master`;

CREATE PROCEDURE `Save_Sales_Order_Master`(
    IN Sales_Order_Master_Id_ INT,
    IN Account_Party_Id_ INT,
    IN EntryDate_ DATE,
    IN LPONo_ VARCHAR(255),
    IN DONo_ VARCHAR(255),
    IN PackingListNumber_ VARCHAR(255),
    IN CurrencyId_ INT,
    IN TypeId_ INT,
    IN PaymentTerms_ INT,
    IN TotalAmount_ DECIMAL(18,2),
    IN TotalDiscount_ DECIMAL(18,2),
    IN Roundoff_Amt_ DECIMAL(18,2),
    IN Total_Amount_ DECIMAL(18,2),
    IN NetTotal_ DECIMAL(18,2),
    IN User_Id_ INT,
    IN Delivery_Address1_ TEXT,
    IN Delivery_Address2_ TEXT,
    IN Delivery_Address3_ TEXT,
    IN Delivery_Address4_ TEXT,
    IN Charge1_ VARCHAR(255),
    IN charge1_Amount_ DECIMAL(18,2),
    IN Charge2_ VARCHAR(255),
    IN charge2_Amount_ DECIMAL(18,2),
    IN Discount_Description_ VARCHAR(255),
    IN Additional_Discount_ DECIMAL(18,2),
    IN Description2_ TEXT,
    IN Amount_In_Words_ TEXT,
    IN Charge1per_ DECIMAL(18,2),
    IN Employee_ VARCHAR(255),
    IN DueDate_ DATE,
    IN SupplyDate_ DATE,
    IN Basic_Discount_ DECIMAL(18,2),
    IN Payment_Term_Description_ TEXT,
    IN VAT_percentage_ DECIMAL(18,2),
    IN VAT_Amount_ DECIMAL(18,2),
    IN TaxableAmount_ DECIMAL(18,2),
    IN KindAttend_ VARCHAR(255),
    IN PaymentTermValue_ INT,
    IN Sales_Details_ JSON,
    IN SalesQuotationMaster_Id_ INT,
    IN PerformaInvoiceMaster_Id_ INT,
    IN DeliveryOrderMaster_Id_ INT
)
BEGIN
    DECLARE New_Id INT;

    IF Sales_Order_Master_Id_ = 0 OR Sales_Order_Master_Id_ IS NULL THEN
        INSERT INTO sales_order_master (
            Account_Party_Id, EntryDate, LPONo, DONo, PackingListNumber, CurrencyId, TypeId, PaymentTerms,
            TotalAmount, TotalDiscount, Roundoff_Amt, Total_Amount, NetTotal, User_Id, Delivery_Address1,
            Delivery_Address2, Delivery_Address3, Delivery_Address4, Charge1, charge1_Amount, Charge2,
            charge2_Amount, Discount_Description, Additional_Discount, Description2, Amount_In_Words,
            Charge1per, Employee, DueDate, SupplyDate, Basic_Discount, Payment_Term_Description,
            VAT_percentage, VAT_Amount, TaxableAmount, KindAttend, PaymentTermValue, SalesQuotationMaster_Id,
            PerformaInvoiceMaster_Id, DeliveryOrderMaster_Id, Status
        ) VALUES (
            Account_Party_Id_, EntryDate_, LPONo_, DONo_, PackingListNumber_, CurrencyId_, TypeId_, PaymentTerms_,
            TotalAmount_, TotalDiscount_, Roundoff_Amt_, Total_Amount_, NetTotal_, User_Id_, Delivery_Address1_,
            Delivery_Address2_, Delivery_Address3_, Delivery_Address4_, Charge1_, charge1_Amount_, Charge2_,
            charge2_Amount_, Discount_Description_, Additional_Discount_, Description2_, Amount_In_Words_,
            Charge1per_, Employee_, DueDate_, SupplyDate_, Basic_Discount_, Payment_Term_Description_,
            VAT_percentage_, VAT_Amount_, TaxableAmount_, KindAttend_, PaymentTermValue_, SalesQuotationMaster_Id_,
            PerformaInvoiceMaster_Id_, DeliveryOrderMaster_Id_, 1
        );
        SET New_Id = LAST_INSERT_ID();
    ELSE
        UPDATE sales_order_master SET
            Account_Party_Id = Account_Party_Id_, EntryDate = EntryDate_, LPONo = LPONo_, DONo = DONo_,
            PackingListNumber = PackingListNumber_, CurrencyId = CurrencyId_, TypeId = TypeId_,
            PaymentTerms = PaymentTerms_, TotalAmount = TotalAmount_, TotalDiscount = TotalDiscount_,
            Roundoff_Amt = Roundoff_Amt_, Total_Amount = Total_Amount_, NetTotal = NetTotal_, User_Id = User_Id_,
            Delivery_Address1 = Delivery_Address1_, Delivery_Address2 = Delivery_Address2_,
            Delivery_Address3 = Delivery_Address3_, Delivery_Address4 = Delivery_Address4_, Charge1 = Charge1_,
            charge1_Amount = charge1_Amount_, Charge2 = Charge2_, charge2_Amount = charge2_Amount_,
            Discount_Description = Discount_Description_, Additional_Discount = Additional_Discount_,
            Description2 = Description2_, Amount_In_Words = Amount_In_Words_, Charge1per = Charge1per_,
            Employee = Employee_, DueDate = DueDate_, SupplyDate = SupplyDate_, Basic_Discount = Basic_Discount_,
            Payment_Term_Description = Payment_Term_Description_, VAT_percentage = VAT_percentage_,
            VAT_Amount = VAT_Amount_, TaxableAmount = TaxableAmount_, KindAttend = KindAttend_,
            PaymentTermValue = PaymentTermValue_, SalesQuotationMaster_Id = SalesQuotationMaster_Id_,
            PerformaInvoiceMaster_Id = PerformaInvoiceMaster_Id_, DeliveryOrderMaster_Id = DeliveryOrderMaster_Id_
        WHERE Sales_Order_Master_Id = Sales_Order_Master_Id_;
        SET New_Id = Sales_Order_Master_Id_;
        DELETE FROM sales_order_details WHERE Sales_Order_Master_Id = New_Id;
    END IF;

    IF Sales_Details_ IS NOT NULL AND JSON_LENGTH(Sales_Details_) > 0 THEN
        INSERT INTO sales_order_details (
            Sales_Order_Master_Id, Stock_Id, Stock_Details_Id, ItemId, ItemName, Barcode, GroupId, GroupName, UnitId, UnitName,
            PurchaseRate, SaleRate, MRP, HSNId, HSNCODE, SaleTax, CGST, IGST, SGST, Cesspers, Quantity, GrossValue,
            Discount, NetValue, CGSTAMT, SGSTAMT, IGSTAMT, CessAMT, TotalAmount
        )
        SELECT
            New_Id,
            jt.Stock_Id, jt.Stock_Details_Id, jt.ItemId, jt.ItemName, jt.Barcode, jt.GroupId, jt.GroupName, jt.UnitId, jt.UnitName,
            jt.PurchaseRate, jt.SaleRate, jt.MRP, jt.HSNId, jt.HSNCODE, jt.SaleTax, jt.CGST, jt.IGST, jt.SGST, jt.Cesspers, jt.Quantity, jt.GrossValue,
            jt.Discount, jt.NetValue, jt.CGSTAMT, jt.SGSTAMT, jt.IGSTAMT, jt.CessAMT, jt.TotalAmount
        FROM JSON_TABLE(Sales_Details_, '$[*]' COLUMNS (
            Stock_Id INT PATH '$.Stock_Id',
            Stock_Details_Id INT PATH '$.Stock_Details_Id',
            ItemId INT PATH '$.ItemId',
            ItemName VARCHAR(255) PATH '$.ItemName',
            Barcode VARCHAR(255) PATH '$.Barcode',
            GroupId INT PATH '$.GroupId',
            GroupName VARCHAR(255) PATH '$.GroupName',
            UnitId INT PATH '$.UnitId',
            UnitName VARCHAR(255) PATH '$.UnitName',
            PurchaseRate DECIMAL(18,2) PATH '$.PurchaseRate',
            SaleRate DECIMAL(18,2) PATH '$.SaleRate',
            MRP DECIMAL(18,2) PATH '$.MRP',
            HSNId INT PATH '$.HSNId',
            HSNCODE VARCHAR(255) PATH '$.HSNCODE',
            SaleTax DECIMAL(18,2) PATH '$.SaleTax',
            CGST DECIMAL(18,2) PATH '$.CGST',
            IGST DECIMAL(18,2) PATH '$.IGST',
            SGST DECIMAL(18,2) PATH '$.SGST',
            Cesspers DECIMAL(18,2) PATH '$.Cesspers',
            Quantity DECIMAL(18,2) PATH '$.Quantity',
            GrossValue DECIMAL(18,2) PATH '$.GrossValue',
            Discount DECIMAL(18,2) PATH '$.Discount',
            NetValue DECIMAL(18,2) PATH '$.NetValue',
            CGSTAMT DECIMAL(18,2) PATH '$.CGSTAMT',
            SGSTAMT DECIMAL(18,2) PATH '$.SGSTAMT',
            IGSTAMT DECIMAL(18,2) PATH '$.IGSTAMT',
            CessAMT DECIMAL(18,2) PATH '$.CessAMT',
            TotalAmount DECIMAL(18,2) PATH '$.TotalAmount'
        )) AS jt;
    END IF;

    SELECT New_Id AS Sales_Master_Id_, IFNULL((SELECT Invoice_No FROM sales_order_master WHERE Sales_Order_Master_Id = New_Id), '') AS Voucher_No_;
END;
