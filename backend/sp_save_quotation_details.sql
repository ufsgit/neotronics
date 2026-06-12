CREATE DEFINER=`root`@`localhost` PROCEDURE `Save_Quotation_Details`( In Quotation_Details_ JSON,SalesQuotationMaster_Id_ int, QuotationNo_ INT)
BEGIN
declare ItemId_ int;declare ItemCode_ varchar(500);
declare ItemName_ longtext;declare UnitId_ int;
declare UnitName_ varchar(100);declare StockId_ int;
declare HSNMasterId_ int;declare HSNCODE_ varchar(50);
declare UnitPrice_ decimal(18,3);declare Quantity_ decimal(18,3);
declare Amount_ decimal(18,3);declare Discount_ decimal(18,3);
declare TaxableAmount_ decimal(18,3);declare TaxAmount_ decimal(18,3);
declare NetValue_ decimal(18,3);declare Availability_ varchar(200);
declare Unit_Discount_ decimal(18,3); declare Sale_Tax_ decimal(18,3);declare SalesQuotationDetails_Id_ int;
declare Item_Discount_Amount_ decimal(18,3);
DECLARE i int  DEFAULT 0;declare GroupId_ int; declare GroupName_ varchar(100);
DECLARE Country_Id_ INT DEFAULT 0;
DECLARE Country_Name_ VARCHAR(250) DEFAULT '';
delete from salesquotationdetails where QuotationMaster_Id = SalesQuotationMaster_Id_;
WHILE i < JSON_LENGTH(Quotation_Details_) DO
		SELECT COALESCE(NULLIF(JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].ItemId'))), 'null'), 0)  INTO ItemId_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Item_Code'))) INTO ItemCode_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].ItemName'))) INTO ItemName_;
		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].UnitId'))) INTO UnitId_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].UnitId'))), 'null'), 0) INTO UnitId_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].UnitName'))) INTO UnitName_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].GroupId'))), 'null'), 0) INTO GroupId_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].GroupName'))), 'null'), '') INTO GroupName_;
		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].StockId'))) INTO StockId_;
                SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].StockId'))), 'null'), 0) INTO StockId_;
		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].HSNMasterId'))) INTO HSNMasterId_;
                SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].HSNMasterId'))), 'null'), 0) INTO HSNMasterId_;
        SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].HSNCODE'))) INTO HSNCODE_;
		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].UnitPrice'))) INTO UnitPrice_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].UnitPrice'))), 'null'), 0) INTO UnitPrice_;
		SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Quantity'))) INTO Quantity_;   
		#SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].Quantity'))), 'null'), 0) INTO Quantity_;
		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Amount'))) INTO Amount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].Amount'))), 'null'), 0) INTO Amount_;

        /*SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Discount'))) INTO Discount_;*/
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].Discount'))), 'null'), 0) INTO Discount_;
        
        #SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].TaxableAmount'))) INTO TaxableAmount_;
        SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].TaxableAmount'))), 'null'), 0) INTO TaxableAmount_;

		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].TaxAmount'))) INTO TaxAmount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].TaxAmount'))), 'null'), 0) INTO TaxAmount_;

		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].NetValue'))) INTO NetValue_;  
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].NetValue'))), 'null'), 0) INTO NetValue_;

		SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Availability'))) INTO Availability_; 
        
		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Unit_Discount'))) INTO Unit_Discount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].Unit_Discount'))), 'null'), 0) INTO Unit_Discount_;

        #SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].SaleTax'))) INTO Sale_Tax_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].SaleTax'))), 'null'), 0) INTO Sale_Tax_;
        
        #SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Item_Discount_Amount'))) INTO Item_Discount_Amount_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].Item_Discount_Amount'))), 'null'), 0) INTO Item_Discount_Amount_;

		#SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Country_Id'))) INTO Country_Id_;
		SELECT COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(Quotation_Details_, CONCAT('$[', i, '].Country_Id'))), 'null'), 0) INTO Country_Id_;

        SELECT JSON_UNQUOTE (JSON_EXTRACT(Quotation_Details_,CONCAT('$[',i,'].Country_Name'))) INTO Country_Name_;

        if Availability_ is null or Availability_ = 'null' then
           set Availability_ = '';
		end if;
        
        SET SalesQuotationDetails_Id_ = (SELECT  COALESCE( MAX(SalesQuotationDetails_Id ),0)+1 FROM salesquotationdetails);
        
		INSERT INTO salesquotationdetails(SalesQuotationDetails_Id,QuotationMaster_Id,ItemId,ItemCode,ItemName,
		UnitId,UnitName,StockId,HSNMasterId,HSNCODE,UnitPrice,Quantity,Amount,Discount,TaxableAmount,TaxAmount,
		NetValue,Availability,DeleteStatus,Unit_Discount,Sale_Tax,GroupId,GroupName,Item_Discount_Amount,
        Country_Id, Country_Name)
		VALUES(SalesQuotationDetails_Id_,SalesQuotationMaster_Id_,ItemId_,ItemCode_,ItemName_,UnitId_,UnitName_,StockId_,HSNMasterId_,
		HSNCODE_,UnitPrice_,Quantity_,Amount_,Discount_,TaxableAmount_,TaxAmount_,NetValue_,Availability_,0,Unit_Discount_,Sale_Tax_,GroupId_,GroupName_,Item_Discount_Amount_,
        Country_Id_, Country_Name_);
		SELECT i + 1 INTO i;
END WHILE;  
SELECT SalesQuotationMaster_Id_, QuotationNo_;

END