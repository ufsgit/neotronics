const db = require('../dbconnection');

async function fixSP() {
    try {
        const sql = `
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
SELECT price_request_master_Id_, RequestNumber_;

END;
`;
        await db.promise().query(sql.split(';')[0]);
        await db.promise().query(sql.substring(sql.indexOf('CREATE PROCEDURE')));
        console.log("Successfully fixed Save_Price_Request_Details SP.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixSP();
