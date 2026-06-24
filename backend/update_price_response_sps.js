var db = require('./dbconnection');

var queries = [
`DROP PROCEDURE IF EXISTS Search_Price_Response;`,
`CREATE PROCEDURE Search_Price_Response
(
    IN Look_In_Date_ INT,
    IN From_Date_ DATE,
    IN To_Date_ DATE,
    IN Supplier_Id_ INT,
    IN Price_RequestNo_ VARCHAR(100)
)
BEGIN
    SELECT 
        PRM.*,
        SA.Client_Accounts_Name AS Supplier_Name
    FROM price_response_master PRM
    LEFT JOIN Client_Accounts SA ON SA.Client_Accounts_Id = PRM.Supplier_Id
    WHERE 
        (Look_In_Date_ = 0 OR (PRM.EntryDate BETWEEN From_Date_ AND To_Date_))
        AND (Supplier_Id_ = 0 OR PRM.Supplier_Id = Supplier_Id_)
        AND (Price_RequestNo_ = '' OR PRM.Price_Response_No LIKE CONCAT('%', Price_RequestNo_, '%'))
        AND PRM.DeleteStatus = 0
    ORDER BY PRM.EntryDate DESC;
END;`,
`DROP PROCEDURE IF EXISTS Save_Price_Response;`,
`CREATE PROCEDURE Save_Price_Response
(
    IN Price_Response_Master_Id_ INT,
    IN Price_Response_No_ VARCHAR(100),
    IN EntryDate_ DATE,
    IN Supplier_Id_ INT,
    IN Response_No_ VARCHAR(100),
    IN Reference_No_ VARCHAR(100),
    IN Currency_Id_ INT,
    IN Total_Amount_ DECIMAL(18,3),
    IN Vat_Amount_ DECIMAL(18,3),
    IN Net_Amount_ DECIMAL(18,3),
    IN Description1_ TEXT,
    IN Payment_Term_Description_ INT,
    IN Details_ JSON
)
BEGIN
    DECLARE Saved_Master_Id INT DEFAULT 0;
    SET Saved_Master_Id = COALESCE(Price_Response_Master_Id_, 0);

    IF Saved_Master_Id = 0 THEN
        INSERT INTO price_response_master (
            Price_Response_No, EntryDate, Supplier_Id, Response_No, Reference_No,
            Currency_Id, Total_Amount, Vat_Amount, Net_Amount, Description1, Payment_Term_Description, DeleteStatus
        ) VALUES (
            Price_Response_No_, EntryDate_, Supplier_Id_, Response_No_, Reference_No_,
            Currency_Id_, Total_Amount_, Vat_Amount_, Net_Amount_, Description1_, Payment_Term_Description_, 0
        );
        SET Saved_Master_Id = LAST_INSERT_ID();
    ELSE
        UPDATE price_response_master SET
            Price_Response_No = Price_Response_No_,
            EntryDate = EntryDate_,
            Supplier_Id = Supplier_Id_,
            Response_No = Response_No_,
            Reference_No = Reference_No_,
            Currency_Id = Currency_Id_,
            Total_Amount = Total_Amount_,
            Vat_Amount = Vat_Amount_,
            Net_Amount = Net_Amount_,
            Description1 = Description1_,
            Payment_Term_Description = Payment_Term_Description_,
            DeleteStatus = 0
        WHERE Price_Response_Master_Id = Saved_Master_Id;

        DELETE FROM price_response_details WHERE Price_Response_Master_Id = Saved_Master_Id;
    END IF;

    INSERT INTO price_response_details (
        Price_Response_Master_Id, Item_Id, Item_Name, Part_No, Description,
        Brand_Id, Brand_Name, Quantity, Supplier_Price, Profit_Percentage,
        Profit_Amount, Sale_Rate, Total_Amount
    )
    SELECT
        Saved_Master_Id, Item_Id, Item_Name, Part_No, Description,
        Brand_Id, Brand_Name, Quantity, Supplier_Price, Profit_Percentage,
        Profit_Amount, Sale_Rate, Total_Amount
    FROM JSON_TABLE(COALESCE(Details_, JSON_ARRAY()), '$[*]' COLUMNS (
        Item_Id INT PATH '$.Item_Id' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Item_Name VARCHAR(255) PATH '$.Item_Name' DEFAULT '' ON EMPTY DEFAULT '' ON ERROR,
        Part_No VARCHAR(100) PATH '$.Part_No' DEFAULT '' ON EMPTY DEFAULT '' ON ERROR,
        Description TEXT PATH '$.Description' DEFAULT '' ON EMPTY DEFAULT '' ON ERROR,
        Brand_Id INT PATH '$.Brand_Id' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Brand_Name VARCHAR(255) PATH '$.Brand_Name' DEFAULT '' ON EMPTY DEFAULT '' ON ERROR,
        Quantity DECIMAL(18,3) PATH '$.Quantity' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Supplier_Price DECIMAL(18,3) PATH '$.Supplier_Price' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Profit_Percentage DECIMAL(18,3) PATH '$.Profit_Percentage' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Profit_Amount DECIMAL(18,3) PATH '$.Profit_Amount' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Sale_Rate DECIMAL(18,3) PATH '$.Sale_Rate' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR,
        Total_Amount DECIMAL(18,3) PATH '$.Total_Amount' DEFAULT 0 ON EMPTY DEFAULT 0 ON ERROR
    )) AS jt;

    SELECT Saved_Master_Id AS Price_Response_Master_Id_;
END;`,
`DROP PROCEDURE IF EXISTS Get_Price_Response;`,
`CREATE PROCEDURE Get_Price_Response
(
    IN Price_Response_Master_Id_ INT
)
BEGIN
    SELECT 
        PRM.*,
        SA.Client_Accounts_Name AS Supplier_Name
    FROM price_response_master PRM
    LEFT JOIN Client_Accounts SA ON SA.Client_Accounts_Id = PRM.Supplier_Id
    WHERE PRM.Price_Response_Master_Id = Price_Response_Master_Id_;

    SELECT * FROM price_response_details WHERE Price_Response_Master_Id = Price_Response_Master_Id_;
END;`,
`DROP PROCEDURE IF EXISTS Delete_Price_Response;`,
`CREATE PROCEDURE Delete_Price_Response
(
    IN Price_Response_Master_Id_ INT
)
BEGIN
    UPDATE price_response_master SET DeleteStatus = 1 WHERE Price_Response_Master_Id = Price_Response_Master_Id_;
    SELECT Price_Response_Master_Id_ AS Price_Response_Master_Id_;
END;`,
`DROP PROCEDURE IF EXISTS Get_Next_Price_Response_No;`,
`CREATE PROCEDURE Get_Next_Price_Response_No
(
    IN EntryDate_ DATE
)
BEGIN
    SELECT COALESCE(MAX(CAST(Price_Response_No AS UNSIGNED)), 0) + 1 AS NextNo 
    FROM price_response_master 
    WHERE Price_Response_No REGEXP '^[0-9]+$';
END;`
];

async function runQueries() {
    for (let q of queries) {
        try {
            await db.promise().query(q);
            console.log("Executed query successfully");
        } catch (err) {
            console.error("Error executing query:", err);
        }
    }
    process.exit();
}

runQueries();
