const db = require('../backend/dbconnection');

const dropProcedure = "DROP PROCEDURE IF EXISTS Search_Quotation";

const createProcedure = `
CREATE PROCEDURE \`Search_Quotation\`(
    IN Is_Date_Check_ TINYINT,
    IN From_Date_ DATETIME,
    IN To_Date_ DATETIME,
    IN Account_Party_Id_ INT,
    IN Quot_No_ VARCHAR(45),
    IN Part_No_ VARCHAR(45),
    IN Item_Group_Id_ INT,
    IN CurrencyDetails_Id_ INT,
    IN User_Details_Id_ INT,
	IN User_Type_ INT,
    IN Login_User_Id_ INT
)
BEGIN
    DECLARE Search_Date_ VARCHAR(500);
    DECLARE SearchbyName_Value VARCHAR(2000);    DECLARE Cleaned_Part_No VARCHAR(200);

    delete from db_logs;
    SET Search_Date_ = '';
    SET SearchbyName_Value = '';
    
    if(Quot_No_ ='undefined') then
    set Quot_No_ = '';
    end if;
    
     if(Part_No_ ='undefined') then
    set Part_No_ = '';
    end if;

    IF Is_Date_Check_ = 1 THEN
        SET Search_Date_ = CONCAT(" AND salesquotationmaster.EntryDate >= '", From_Date_, "' AND salesquotationmaster.EntryDate <= '", To_Date_, "'");
    END IF;

    IF Account_Party_Id_ > 0 THEN
        SET SearchbyName_Value = CONCAT(SearchbyName_Value, " AND salesquotationmaster.Account_Party_Id = ", Account_Party_Id_);
    END IF;

    IF Quot_No_ != '' THEN
        SET SearchbyName_Value = CONCAT(SearchbyName_Value, " AND salesquotationmaster.QuotationNo = '", Quot_No_, "'");
    END IF;

     IF Part_No_ IS NOT NULL AND Part_No_ != '' THEN
        SET Cleaned_Part_No = REPLACE(Part_No_, '%', '\%');
        SET Cleaned_Part_No = REPLACE(Cleaned_Part_No, '_', '\_'); 

        SET SearchbyName_Value = CONCAT(
            " AND  salesquotationdetails.ItemCode LIKE ", 
            QUOTE(CONCAT('%', Cleaned_Part_No, '%')) 
        );
    END IF;

    IF Item_Group_Id_ > 0 THEN
        SET SearchbyName_Value = CONCAT(SearchbyName_Value, " AND salesquotationdetails.GroupId = ", Item_Group_Id_);
    END IF;

    IF CurrencyDetails_Id_ > 0 THEN
        SET SearchbyName_Value = CONCAT(SearchbyName_Value, " AND salesquotationmaster.CurrencyId = ", CurrencyDetails_Id_);
    END IF;

    IF User_Details_Id_ > 0 THEN
        SET SearchbyName_Value = CONCAT(SearchbyName_Value, " AND salesquotationmaster.AttendEmployee = ", User_Details_Id_);
    END IF;
    
	IF User_Type_ = 2 THEN
        SET SearchbyName_Value = CONCAT(SearchbyName_Value, " AND salesquotationmaster.User_Id = ", Login_User_Id_);
    END IF;

   SET @query = CONCAT("  
    SELECT distinct salesquotationmaster.SalesQuotationMaster_Id,salesquotationmaster.Account_Party_Id,salesquotationmaster.SONo,salesquotationmaster.QuotationNo,salesquotationmaster.POnumber,salesquotationmaster.CurrencyId,salesquotationmaster.TypeId,salesquotationmaster.PaymentTerms,salesquotationmaster.AttendEmployee,salesquotationmaster.TotalAmount,
    salesquotationmaster.TotalDiscount,salesquotationmaster.TaxableAmount,salesquotationmaster.VatAmount,salesquotationmaster.Roundoff_Amt,salesquotationmaster.Total_Amount,salesquotationmaster.NetTotal,salesquotationmaster.Brand,salesquotationmaster.PriceBasis,salesquotationmaster.Delivery,salesquotationmaster.Validity,salesquotationmaster.Description1,salesquotationmaster.User_Id,salesquotationmaster.Delivery_Address1,
    salesquotationmaster.Delivery_Address2,salesquotationmaster.Delivery_Address3,salesquotationmaster.Delivery_Address4,salesquotationmaster.KindAttend,salesquotationmaster.Charge1,salesquotationmaster.charge1_Amount,salesquotationmaster.Charge2,salesquotationmaster.charge2_Amount,salesquotationmaster.Discount_Description,salesquotationmaster.Additional_Discount,
    salesquotationmaster.Description2,salesquotationmaster.Basic_Discount,salesquotationmaster.Amount_In_Words,salesquotationmaster.PreparedBy,salesquotationmaster.Charge1per,salesquotationmaster.Payment_Term_Description,salesquotationmaster.VAT_Description,salesquotationmaster.VAT_Percentage,salesquotationmaster.VAT_Amount,salesquotationmaster.SalesQuotation_Image,
    salesquotationmaster.Acknolodgement_Image,salesquotationmaster.CurrecnyName,salesquotationmaster.UserName,salesquotationmaster.PaymentTermValue,salesquotationmaster.AttendEmployeeId,salesquotationmaster.KindAttendId,
    salesquotationmaster.Status,
    salesquotationmaster.workflow_status,
    salesquotationmaster.Status_Id,
    salesquotationmaster.Status_Name,
    DATE_FORMAT(salesquotationmaster.EntryDate, '%d-%m-%Y') AS FormattedEntryDate,
    DATE_FORMAT(salesquotationmaster.EntryDate, '%Y-%m-%d') AS EntryDate,
        salesquotationmaster.Supplier_Ref_No,
		salesquotationmaster.QuotationNo,
        salesquotationmaster.NetTotal,
        client_accounts.Client_Accounts_Name AS Customer,
        DATE_FORMAT(salesquotationmaster.EntryDate, '%d-%m-%Y') AS PrintDate
    FROM salesquotationmaster 
    INNER JOIN salesquotationdetails ON salesquotationmaster.SalesQuotationMaster_Id = salesquotationdetails.QuotationMaster_Id
    INNER JOIN client_accounts ON salesquotationmaster.Account_Party_Id = client_accounts.Client_Accounts_Id 
    WHERE salesquotationmaster.DeleteStatus = 0", Search_Date_, SearchbyName_Value,"
     ORDER BY SalesQuotationMaster_Id ASC; " 
);
    PREPARE QUERY FROM @query;
    insert into db_logs values(0,@query,'','');
    EXECUTE QUERY;
END
`;

db.query(dropProcedure, (err) => {
    if (err) {
        console.error("Error dropping Search_Quotation procedure:", err);
        process.exit(1);
    }
    db.query(createProcedure, (err2) => {
        if (err2) {
            console.error("Error creating Search_Quotation procedure:", err2);
            process.exit(1);
        }
        console.log("Search_Quotation procedure re-created successfully with Status_Id and Status_Name!");
        process.exit(0);
    });
});
