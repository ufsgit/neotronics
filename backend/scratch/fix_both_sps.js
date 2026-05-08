const db = require('../dbconnection');

async function fixSPs() {
    try {
        const sql1 = `
DROP PROCEDURE IF EXISTS Save_Price_Request_Details;
CREATE PROCEDURE Save_Price_Request_Details( In Price_Request_Details_ JSON,price_request_master_Id_ int, RequestNumber_ INT)
BEGIN
declare ItemId_ int;declare ItemCode_ varchar(500);
declare ItemName_ longtext;declare UnitId_ int;
declare UnitName_ varchar(100);declare StockId_ int;
declare HSNMasterId_ int;declare HSNCODE_ varchar(50);
declare UnitPrice_ decimal(18,3);declare Quantity_ decimal(18,3);
declare Amount_ decimal(18,3);declare Discount_ decimal(18,3);
declare TaxableAmount_ decimal(18,3);declare TaxAmount_ decimal(18,3);
declare NetValue_ decimal(18,3);declare Availability_ varchar(200);
declare Unit_Discount_ decimal(18,3); declare Sale_Tax_ decimal(18,3);declare price_request_details_Id_ int;
declare Item_Discount_Amount_ decimal(18,3);
DECLARE i int  DEFAULT 0;declare GroupId_ int; declare GroupName_ varchar(100);
DECLARE Country_Id_ INT DEFAULT 0;
DECLARE Country_Name_ VARCHAR(250) DEFAULT '';
delete from price_request_details where PriceRequestMaster_Id = price_request_master_Id_;
WHILE i < JSON_LENGTH(Price_Request_Details_) DO
		SELECT COALESCE(NULLIF(JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].ItemId'))), 'null'), 0)  INTO ItemId_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].Item_Code'))) INTO ItemCode_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].ItemName'))) INTO ItemName_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].UnitId'))), 'null'), 0) INTO UnitId_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].UnitName'))) INTO UnitName_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].GroupId'))), 'null'), 0) INTO GroupId_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].GroupName'))), 'null'), '') INTO GroupName_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].StockId'))), 'null'), 0) INTO StockId_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].HSNMasterId'))), 'null'), 0) INTO HSNMasterId_;
        SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].HSNCODE'))) INTO HSNCODE_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].UnitPrice'))), 'null'), 0) INTO UnitPrice_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].Quantity'))) INTO Quantity_;   
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].Amount'))), 'null'), 0) INTO Amount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].Discount'))), 'null'), 0) INTO Discount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].TaxableAmount'))), 'null'), 0) INTO TaxableAmount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].TaxAmount'))), 'null'), 0) INTO TaxAmount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].NetValue'))), 'null'), 0) INTO NetValue_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].Availability'))) INTO Availability_; 
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].Unit_Discount'))), 'null'), 0) INTO Unit_Discount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].SaleTax'))), 'null'), 0) INTO Sale_Tax_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].Item_Discount_Amount'))), 'null'), 0) INTO Item_Discount_Amount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Price_Request_Details_, CONCAT('$[', i, '].Country_Id'))), 'null'), 0) INTO Country_Id_;
        SELECT JSON_UNQUOTE (JSON_EXTRACT(Price_Request_Details_,CONCAT('$[',i,'].Country_Name'))) INTO Country_Name_;

        if Availability_ is null or Availability_ = 'null' then
           set Availability_ = '';
		end if;
        
        SET price_request_details_Id_ = (SELECT  COALESCE( MAX(price_request_details_Id ),0)+1 FROM price_request_details);
        
		INSERT INTO price_request_details(price_request_details_Id,PriceRequestMaster_Id,ItemId,ItemCode,ItemName,
		UnitId,UnitName,StockId,HSNMasterId,HSNCODE,UnitPrice,Quantity,Amount,Discount,TaxableAmount,TaxAmount,
		NetValue,Availability,DeleteStatus,Unit_Discount,Sale_Tax,GroupId,GroupName,Item_Discount_Amount,
        Country_Id, Country_Name)
		VALUES(price_request_details_Id_,price_request_master_Id_,ItemId_,ItemCode_,ItemName_,UnitId_,UnitName_,StockId_,HSNMasterId_,
		HSNCODE_,UnitPrice_,Quantity_,Amount_,Discount_,TaxableAmount_,TaxAmount_,NetValue_,Availability_,0,Unit_Discount_,Sale_Tax_,GroupId_,GroupName_,Item_Discount_Amount_,
        Country_Id_, Country_Name_);
		SELECT i + 1 INTO i;
END WHILE;  
SELECT price_request_master_Id_ as Price_Request_Master_Id_, RequestNumber_ as Price_RequestNo_;

END;
`;

        const sql2 = `
DROP PROCEDURE IF EXISTS Save_Price_Request;
CREATE PROCEDURE Save_Price_Request(In price_request_master_Id_ int,Account_Party_Id_ int, EntryDate_ varchar(45), 
POnumber_ varchar(100), CurrencyId_ int, PaymentTerms_ varchar(500),AttendEmployee_ varchar(200), TotalAmount_ decimal(18,3),TotalDiscount_ decimal(18,3), 
Roundoff_Amt_ decimal(18,3),Total_Amount_ decimal(18,3), Basic_Discount_ decimal(18,3), NetTotal_ decimal(18,3),Brand_ varchar(4000),PriceBasis_ varchar(4000),
Delivery_ longtext, Validity_ longtext,Description1_ longtext, User_Id_ int, Delivery_Address1_ varchar(500),Delivery_Address2_ varchar(500), 
Delivery_Address3_ varchar(500), Delivery_Address4_ varchar(500),Charge1_ varchar(100), charge1_Amount_ decimal(18,3), Charge2_ varchar(100),
charge2_Amount_ decimal(18,3), Discount_Description_ varchar(500),Additional_Discount_ decimal(18,3), Description2_ varchar(500),
Amount_In_Words_ varchar(2000), PreparedBy_ varchar(500), Charge1per_ varchar(250),Payment_Term_Description_ int,VAT_Percentage_ decimal(18,3),
VAT_Amount_ decimal(18,3),TaxableAmount_ decimal(18,3), KindAttend_ varchar(500),PaymentTermValue_ int, 
Supplier_Ref_No_ VARCHAR(250),Price_Request_Details_ JSON)
BEGIN
declare YearFrom datetime;declare YearTo datetime;declare RequestNumber_ int;
if(price_request_master_Id_ > 0) then
set RequestNumber_ = (select RequestNumber from price_request_master where price_request_master_Id = price_request_master_Id_ and DeleteStatus = 0);
UPDATE price_request_master SET Account_Party_Id = Account_Party_Id_,EntryDate = EntryDate_,POnumber = POnumber_,CurrencyId = CurrencyId_,
PaymentTerms = PaymentTerms_,AttendEmployee = AttendEmployee_,TotalAmount = TotalAmount_,TotalDiscount = TotalDiscount_,Roundoff_Amt = Roundoff_Amt_,
Total_Amount = Total_Amount_,Basic_Discount=Basic_Discount_,NetTotal =NetTotal_,Brand = Brand_,PriceBasis = PriceBasis_,Delivery = Delivery_,
Validity = Validity_,Description1 = Description1_,User_Id = User_Id_,Delivery_Address1 = Delivery_Address1_,Delivery_Address2 = Delivery_Address2_,
Delivery_Address3 = Delivery_Address3_,Delivery_Address4 = Delivery_Address4_,Charge1 = Charge1_,charge1_Amount = charge1_Amount_,Charge2 = Charge2_,
charge2_Amount = charge2_Amount_,Discount_Description = Discount_Description_,Additional_Discount = Additional_Discount_,Description2 = Description2_,
Amount_In_Words = Amount_In_Words_,PreparedBy = PreparedBy_,Charge1per = Charge1per_,Payment_Term_Description = Payment_Term_Description_,
VAT_Percentage = VAT_Percentage_,VAT_Amount = VAT_Amount_, TaxableAmount = TaxableAmount_, KindAttend = KindAttend_, PaymentTermValue = PaymentTermValue_,
RequestNumber =RequestNumber_, Supplier_Ref_No= Supplier_Ref_No_
WHERE price_request_master_Id = price_request_master_Id_;
else
set YearFrom=(select Account_Years.YearFrom from Account_Years where Date_Format(EntryDate_,'%Y-%m-%d')
    between Date_Format(Account_Years.YearFrom,'%Y-%m-%d') and Date_Format(Account_Years.YearTo,'%Y-%m-%d'));
set YearTo=(select Account_Years.YearTo from Account_Years where Date_Format(EntryDate_,'%Y-%m-%d')
    between Date_Format(Account_Years.YearFrom,'%Y-%m-%d') and Date_Format(Account_Years.YearTo,'%Y-%m-%d'));     
if exists(select distinct RequestNumber from price_request_master)then
set RequestNumber_=(SELECT COALESCE( MAX(RequestNumber ),0)+1 FROM price_request_master where Date_Format(EntryDate,'%Y-%m-%d')
    between Date_Format(YearFrom,'%Y-%m-%d') and Date_Format(YearTo,'%Y-%m-%d'));
else
set RequestNumber_=(select COALESCE(RequestNumber,0) from General_Settings);
end if;
SET price_request_master_Id_ = (SELECT  COALESCE( MAX(price_request_master_Id ),0)+1 FROM price_request_master);
INSERT INTO price_request_master
(price_request_master_Id,Account_Party_Id,EntryDate,RequestNumber,POnumber,CurrencyId,PaymentTerms,AttendEmployee,TotalAmount,TotalDiscount,TaxableAmount,
Roundoff_Amt,Total_Amount,Basic_Discount,NetTotal,Brand,PriceBasis,Delivery,Validity,Description1,User_Id,DeleteStatus,Delivery_Address1,Delivery_Address2,
Delivery_Address3,Delivery_Address4,Charge1,charge1_Amount,Charge2,charge2_Amount,Discount_Description,Additional_Discount,Description2,Amount_In_Words,
PreparedBy,Charge1per,Payment_Term_Description,VAT_Percentage,VAT_Amount, KindAttend,PaymentTermValue,TypeId,
Supplier_Ref_No)
VALUES
(price_request_master_Id_,Account_Party_Id_,EntryDate_,RequestNumber_,POnumber_,CurrencyId_,PaymentTerms_,AttendEmployee_,TotalAmount_,TotalDiscount_,
TaxableAmount_,Roundoff_Amt_,Total_Amount_,Basic_Discount_,NetTotal_,Brand_,PriceBasis_,Delivery_,Validity_,Description1_,User_Id_,0,Delivery_Address1_,
Delivery_Address2_,Delivery_Address3_,Delivery_Address4_,Charge1_,charge1_Amount_,Charge2_,charge2_Amount_,Discount_Description_,Additional_Discount_,
Description2_,Amount_In_Words_,PreparedBy_,Charge1per_,Payment_Term_Description_,VAT_Percentage_,VAT_Amount_, KindAttend_,PaymentTermValue_,1,
Supplier_Ref_No_);
end if;
CALL Save_Price_Request_Details(Price_Request_Details_ ,price_request_master_Id_,RequestNumber_);
SELECT price_request_master_Id_ as Price_Request_Master_Id_, RequestNumber_ as Price_RequestNo_;
END;
`;

        await db.promise().query(sql1.split(';')[0]);
        await db.promise().query(sql1.substring(sql1.indexOf('CREATE PROCEDURE')));
        
        await db.promise().query(sql2.split(';')[0]);
        await db.promise().query(sql2.substring(sql2.indexOf('CREATE PROCEDURE')));
        
        console.log("Successfully fixed and updated both Price Request SPs with correct return field names.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixSPs();
