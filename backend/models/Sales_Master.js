var db=require('../dbconnection');
var fs = require('fs');
var request = require('request');
const fetch = require("node-fetch");
const storedProcedure=require('../helpers/stored-procedure');
var Sales_Master=
{ 
    
    Save_Sales_Master: async function (Sales_Master_) {
        console.log(Sales_Master_);
        console.log(Sales_Master_.Sales_Details);

         return new Promise(async (rs,rej)=>{
           const pool = db.promise();
           let result1;
           var connection = await pool.getConnection();
           if(Sales_Master_.SalesQuotationMaster_Id == undefined){
            Sales_Master_.SalesQuotationMaster_Id = 0
          }
           try 
           {
            const result1 = await(new storedProcedure('Save_Sales_Master',[Sales_Master_.Sales_Master_Id,Sales_Master_.Account_Party_Id,Sales_Master_.EntryDate,Sales_Master_.LPONo,
                Sales_Master_.DONo,Sales_Master_.PackingListNumber,Sales_Master_.CurrencyId,Sales_Master_.TypeId,Sales_Master_.PaymentTerms,Sales_Master_.TotalAmount,Sales_Master_.TotalDiscount,Sales_Master_.Roundoff_Amt,
                Sales_Master_.Total_Amount,Sales_Master_.NetTotal,Sales_Master_.User_Id,Sales_Master_.Delivery_Address1,Sales_Master_.Delivery_Address2,
                Sales_Master_.Delivery_Address3, Sales_Master_.Delivery_Address4, Sales_Master_.Charge1, Sales_Master_.charge1_Amount,Sales_Master_.Charge2, Sales_Master_.charge2_Amount,
                Sales_Master_.Discount_Description, Sales_Master_.Additional_Discount, Sales_Master_.Description2, Sales_Master_.Amount_In_Words, Sales_Master_.Charge1per,Sales_Master_.Employee,
                Sales_Master_.DueDate,Sales_Master_.SupplyDate,Sales_Master_.Basic_Discount,
                Sales_Master_.Payment_Term_Description, Sales_Master_.VAT_percentage,Sales_Master_.VAT_Amount,Sales_Master_.TaxableAmount,Sales_Master_.KindAttend,Sales_Master_.PaymentTermValue, Sales_Master_.Sales_Details,
                Sales_Master_.SalesQuotationMaster_Id, 
                Sales_Master_.PerformaInvoiceMaster_Id, Sales_Master_.DeliveryOrderMaster_Id
            ], connection)).result();
                    console.log(result1)
                await connection.commit();
                 connection.release();
                 console.log(result1);
                 rs( result1);
               }
            catch (err) {
                console.log(err);
            await connection.rollback();
            rej(err);
            var result2=[{'Sales_Master_Id_':0}]      
            rs(result2);
          }
          finally 
          {
          connection.release();
       }
    })
},

Save_Sales_Master_Mobile: async function (Sales_Master_) {
    console.log(Sales_Master_.Latitude)
    return new Promise(async (rs,rej)=>{
        const pool = db.promise();
        let result1;
        var connection = await pool.getConnection();
        try 
        {
         const response =await fetch("https://geolocation-db.com/json/0:0:0:0:0:FFFF:"+Sales_Master_.Latitude+":"+Sales_Master_.Longtitude);
       console.log(response);
         const jsondata = await response.json();
    const result1 = await(new storedProcedure('Save_Sales_Master_Mobile',[Sales_Master_.Sales_Master_Id,
    Sales_Master_.Account_Party_Id,Sales_Master_.Employee_Id,Sales_Master_.User_Id,Sales_Master_.Bill_Date,Sales_Master_.GrossTotal,
    Sales_Master_.RoundOff,Sales_Master_.BillType,jsondata.latitude,jsondata.longitude,jsondata.city,
    jsondata.state,jsondata.postal,Sales_Master_.Sales_Details], connection)).result();
    
    
    await connection.commit();
        connection.release();
        rs( result1);
      }
        catch (err) {
                       console.log(err);
            await connection.rollback();
            rej(err);
            var result2=[{'Sales_Master_Id_':0}]      
            rs(result2);
        }
        finally 
        {
          connection.release();
       }
    })
},
Save_Sales_Master1: async function (Sales_Master_) 
{
                //console.log(Sales_Master_);
    return new Promise(async (rs,rej)=>{
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    await connection.beginTransaction();  
        try 
        {
          //  let lt = await (new storedProcedure('OpenTrans',[], connection)).result();
            
            const result1 =await(new storedProcedure('Save_Sales_Master',[Sales_Master_.Sales_Master_Id,
            Sales_Master_.Account_Party_Id,Sales_Master_.Employee_Id,Sales_Master_.User_Id,
            Sales_Master_.Bill_Date,Sales_Master_.GrossTotal,Sales_Master_.TotalDiscount,Sales_Master_.NetTotal,
            Sales_Master_.TotalCGST,Sales_Master_.ToalSGST,Sales_Master_.TotalIGST,Sales_Master_.TotalGST,
            Sales_Master_.Cess,Sales_Master_.RoundOff,Sales_Master_.TotalAmount,Sales_Master_.GrandTotal,
            Sales_Master_.BillType,Sales_Master_.Description1], connection)).result();
            var Sales_Master_Id_ = result1[0].Sales_Master_Id_;
            var Sales_Details_ = Sales_Master_.Sales_Details;
            console.log(Sales_Details_);
            var Values_ = '';
            const result7 =await(new storedProcedure('Save_Sales_Details',[Sales_Details_,Sales_Master_Id_,
            Sales_Master_.EmpIoyee_Id], connection)).result();
            await connection.commit();
            //let cltr = await (new storedProcedure('CloseTrans', [], connection)).result();
            connection.release();
            rs( result1);
        }
    catch (err) {
    console.log(err);
    await connection.rollback();
    rej(err);
    }
    })
},
Delete_Sales_Master:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Delete_Sales_Master(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    },
    Get_Sales_Details_forprint:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Sales_Details_forprint(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    },
    Get_Store_Details:function(Store_Id_,callback)
    { 
    return db.query("CALL Get_Store_Details(@Store_Id_ :=?)",[Store_Id_],callback);
    },
Delete_Sales_Master_Mobile:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Delete_Sales_Master_Mobile(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    },
Get_Sales_Master:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Sales_Master(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    } ,
Get_Sales_Master_Mobile:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Sales_Master(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    } ,
Get_Receipt_Voucher_Mobile:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Receipt_Voucher_Mobile(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    } ,
    Change_Bill_Status:function(Sales_Master_Id_,BillType_,callback)
    { 
    return db.query("CALL Change_Bill_Status(@Sales_Master_Id_ :=?,@BillType_ :=?)",[Sales_Master_Id_,BillType_],callback);
    } ,
Search_Key_Value:function(Key_Value_Name_,callback)
    { 
    return db.query("CALL Search_Key_Value(@Key_Value_Name_ :=?)",[Key_Value_Name_],callback);
    } ,
Search_Sales_Master_Mobile:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Employee_Id_,callback)
    { 
    return db.query("CALL Search_Sales_Master_Mobile(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Invoice_No_ :=?,@Employee_Id_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Employee_Id_],callback);
    },

 Search_Sales_Master:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,User_Details_Id_,
    User_Type, Login_User_Id,callback)
    { 
        if(Invoice_No_ == "undefined" || Invoice_No_ == undefined || Invoice_No_ == null){
            Invoice_No_ = ""
        }
        if(Part_No_ == "undefined" || Invoice_No_ == undefined || Invoice_No_ == null){
            Part_No_ = ""
        }

        console.log('ItemName2_: ', Part_No_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
            console.log('Escaped part no:', Part_No_);

    return db.query("CALL Search_Sales_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?,@User_Details_Id_ :=?, "+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,User_Details_Id_,
        User_Type, Login_User_Id
    ],callback);
    },
    
    Get_Sales_Details:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Sales_Details(@Sales_Master_Id_:=?)",[Sales_Master_Id_],callback);
    } ,
Get_Bill_Type:function(Group_Id_,callback)
    { 
    return db.query("CALL Get_Bill_Type(@Group_Id_:=?)",[Group_Id_],callback);
    } ,
    Selected_Delete:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Selected_Delete(@Sales_Master_Id_:=?)",[Sales_Master_Id_],callback);
    } ,
Load_Cess:function(callback)
    { 
    return db.query("CALL Load_Cess()",[],callback);
    } ,

    Load_Bill_Mode:function(callback)
    { 
    return db.query("CALL Load_Bill_Mode()",[],callback);
    } ,
    Load_Company:function(callback)
    { 
    return db.query("CALL Load_Company()",[],callback);
    } ,

    Load_currencydetails:function(callback)
    { 
    return db.query("CALL Load_currencydetails()",[],callback);
    } ,

 Search_Customer_Typeahead:function(Account_Group_Id_,Client_Accounts_Name_,callback)
    { 
        console.log(Account_Group_Id_);

    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined )
    Client_Accounts_Name_='';
    return db.query("CALL Search_Customer_Typeahead(@Account_Group_Id_ :=?,@Client_Accounts_Name_ :=?)",
    [Account_Group_Id_,Client_Accounts_Name_],callback);
    },
    Save_Prodution_Master: async function (Prodution_Master_) {
        return new Promise(async (rs, rej) => {
            const pool = db.promise();
            let result1;
            var connection = await pool.getConnection();
            try {
                console.log(Prodution_Master_)
                const result1 = await (new storedProcedure('Save_Prodution_Master', [Prodution_Master_.Prodution_Master_Id,Prodution_Master_.Date,
                     Prodution_Master_.Labour_Charge, Prodution_Master_.Additional_Expense, Prodution_Master_.Production_No,Prodution_Master_.UserId, 
                    Prodution_Master_.TotalAmount, Prodution_Master_.Prodcution_Details, Prodution_Master_.Production_Materials], connection)).result();
                console.log(result1)
                await connection.commit();
                connection.release();
                rs(result1);
            }
            catch (err) {
                console.log(err);
                await connection.rollback();
                rej(err);
                var result2 = [{ 'Prodution_Master_Id_': 0 }]
                rs(result2);
            }
            finally {
                connection.release();
            }
        })
    },

    Search_Prodution_Master: function (Is_Date_Check_, FromDate_, ToDate_, Production_No_,  callback) {
        return db.query("CALL Search_Prodution_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Production_No_ :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Production_No_], callback);
    },

    Delete_Prodution_Master: function (Prodution_Master_Id_, callback) {
        return db.query("CALL Delete_Prodution_Master(@Prodution_Master_Id_ :=?)", [Prodution_Master_Id_], callback);
    },
    Get_Prodution_Master:function(Prodution_Master_Id_,callback)
    { 
    return db.query("CALL Get_Prodution_Master(@Prodution_Master_Id_ :=?)", [Prodution_Master_Id_],callback);
    } ,
    Load_B2B_SaleTax_Report:function(From_date_,To_date_,callback)
    {
        return db.query("call Load_B2B_SaleTax_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
    },
    Load_B2C_SaleTax_Report:function(From_date_,To_date_,callback)
    {
        return db.query("call Load_B2C_SaleTax_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
    },
    Load_Hsn_Sales_Report:function(From_date_,To_date_,callback)
    {
        return db.query("call Load_Hsn_Sales_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
    },
    Load_Hsn_Sales_Return_Report:function(From_date_,To_date_,callback)
    {
        return db.query("call Load_Hsn_Sales_Return_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
    },
    Load_Sales_Return_Tax_Report:function(From_date_,To_date_,callback)
    {
        return db.query("call Load_Sales_Return_Tax_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
    },

    Load_Hsn_Sales_Report:function(From_date_,To_date_,callback)
    {
        return db.query("call Load_Hsn_Sales_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
    },
    Save_Quotation: async function (Quotation_Master_) {
        console.log('Quotation_Master_ :',Quotation_Master_);

        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {
           const result1 = await(new storedProcedure('Save_Quotation',[Quotation_Master_.SalesQuotationMaster_Id,
               Quotation_Master_.Account_Party_Id,Quotation_Master_.EntryDate,Quotation_Master_.POnumber,
               Quotation_Master_.CurrencyId,Quotation_Master_.PaymentTerms,Quotation_Master_.AttendEmployee,Quotation_Master_.TotalAmount,
               Quotation_Master_.TotalDiscount,Quotation_Master_.Roundoff_Amt,Quotation_Master_.Total_Amount,Quotation_Master_.Basic_Discount,
               Quotation_Master_.NetTotal, Quotation_Master_.Brand, Quotation_Master_.PriceBasis, Quotation_Master_.Delivery,
               Quotation_Master_.Validity, Quotation_Master_.Description1, Quotation_Master_.User_Id, Quotation_Master_.Delivery_Address1,
               Quotation_Master_.Delivery_Address2, Quotation_Master_.Delivery_Address3, Quotation_Master_.Delivery_Address4, Quotation_Master_.Charge1,
               Quotation_Master_.charge1_Amount, Quotation_Master_.Charge2, Quotation_Master_.charge2_Amount,Quotation_Master_.Discount_Description,
               Quotation_Master_.Additional_Discount, Quotation_Master_.Description2,Quotation_Master_.Amount_In_Words,Quotation_Master_.PreparedBy,
               Quotation_Master_.Charge1per,Quotation_Master_.Payment_Term_Description,Quotation_Master_.VAT_Percentage,Quotation_Master_.VAT_Amount,Quotation_Master_.TaxableAmount,
               Quotation_Master_.KindAttend,Quotation_Master_.PaymentTermValue,Quotation_Master_.Supplier_Ref_No,Quotation_Master_.Quotation_Details], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Sales_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    },

    Search_Quotation:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_, callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

        console.log('ItemName2_: ', FromDate_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
            console.log('Escaped Client_Accounts_Name:', Part_No_);
            
    return db.query("CALL Search_Quotation(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,"+
        "@User_Type_ :=?, @Login_User_Id_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_],callback);
    },
    Get_Quotation_Details:function(SalesQuotationMaster_Id_,callback)
    { 
    return db.query("CALL Get_Quotation_Details(@SalesQuotationMaster_Id_:=?)",[SalesQuotationMaster_Id_],callback);
    } ,

    Delete_Quotation_Master: function (SalesQuotationMaster_Id_, callback) {
        return db.query("CALL Delete_Quotation_Master(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_], callback);
    },


    


    Save_PerformaInvoice: async function (performainvoicemaster_) {
        console.log(performainvoicemaster_);
        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          if(performainvoicemaster_.SalesQuotationMaster_Id == undefined){
            performainvoicemaster_.SalesQuotationMaster_Id = 0
          }
          try 
          {
           const result1 = await(new storedProcedure('Save_PerformaInvoice',[performainvoicemaster_.PerformaInvoiceMaster_Id,
               performainvoicemaster_.Account_Party_Id,performainvoicemaster_.EntryDate,  performainvoicemaster_.InvoiceNo,performainvoicemaster_.LPONo,
               performainvoicemaster_.CurrencyId,performainvoicemaster_.PaymentTerms, performainvoicemaster_.AttendEmployee, performainvoicemaster_.TotalAmount,
               performainvoicemaster_.TotalDiscount,performainvoicemaster_.Roundoff_Amt, performainvoicemaster_.Total_Amount, performainvoicemaster_.NetTotal, 
               performainvoicemaster_.Brand,  performainvoicemaster_.PriceBasis, performainvoicemaster_.Delivery,performainvoicemaster_.Validity, performainvoicemaster_.Description1, 
               performainvoicemaster_.User_Id,performainvoicemaster_.Delivery_Address1,performainvoicemaster_.Delivery_Address2, performainvoicemaster_.Delivery_Address3,
               performainvoicemaster_.Delivery_Address4,performainvoicemaster_.Charge1,performainvoicemaster_.charge1_Amount, performainvoicemaster_.Charge2,
               performainvoicemaster_.charge2_Amount,performainvoicemaster_.Discount_Description,performainvoicemaster_.Additional_Discount, performainvoicemaster_.Description2,
               performainvoicemaster_.Amount_In_Words,performainvoicemaster_.PreparedBy,performainvoicemaster_.Charge1per,performainvoicemaster_.Payment_Term_Description,
               performainvoicemaster_.VAT_Percentage,performainvoicemaster_.VAT_Amount,performainvoicemaster_.TaxableAmount,
               performainvoicemaster_.KindAttend,performainvoicemaster_.performainvoicedetails,performainvoicemaster_.SalesQuotationMaster_Id,
               performainvoicemaster_.AccountType_Id,performainvoicemaster_.PaymentTermValue,performainvoicemaster_.Total], connection)).result();
               

                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Sales_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    },




    // Accounts_Typeahead_1: function (
    //     look_In_Date_Value,
    //     From_Date, 
    //     To_Date, 
    //     Customer, 
    //     InvoiceNo, 
    //     partNo, 
    //     Item_Group_Id_, 
    //     CurrencyDetails_Id_, 
    //     AccountType_Id_, 
	// 	callback
	// ) {

	// 	if (InvoiceNo === "undefined" || InvoiceNo === "" || InvoiceNo === undefined || InvoiceNo === 'null' || InvoiceNo === null)
	// 		InvoiceNo = "";

	// 	if( partNo === null || partNo === undefined || partNo === "undefined" || partNo === "0")
	//         partNo = "";


	// 		if (Client_Accounts_Name_.includes('\\') || Client_Accounts_Name_.includes('%') || Client_Accounts_Name_.includes("'")) {
	// 			console.log("String contains special characters: \\, ', or %");
	// 			Client_Accounts_Name_ = Client_Accounts_Name_.replace(/([\\%'])/g, '\\$1');

	// 		} else {
	// 			console.log("String does not contain special characters.");
	// 		}

	// 		console.log('Client_Accounts_Name :',Client_Accounts_Name_);
			
	// 	return db.query(
	// 		"CALL Accounts_Typeahead_1(@Account_Group_Id_ :=?,@Client_Accounts_Name_ :=?)",
	// 		[Account_Group_Id_, Client_Accounts_Name_],
	// 		callback
	// 	);
	// },

    Search_PerformaInvoice:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,InvoiceNo_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,
        AccountType_Id_, User_Type, Login_User_Id, callback)
    { 
        if(InvoiceNo_ == "undefined"){
            InvoiceNo_ = ""
        }
        else
        {
            InvoiceNo_ = InvoiceNo_.trim();

        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }
        else
        {
            Part_No_ = Part_No_.trim();
        }

        console.log('ItemName2_: ', Part_No_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
            console.log('Escaped Client_Accounts_Name:', Part_No_);

    return db.query("CALL Search_PerformaInvoive(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@InvoiceNo_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?, "+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,InvoiceNo_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
        User_Type, Login_User_Id
    ],callback);
    },

    Load_StatementofAccount_Report:function(Client_Id_,FromDate_,ToDate_,Voucher_,CurrencyId_,TypeId_,User_Type,Login_User,callback)
    { 
        console.log(User_Type,Login_User);
    return db.query("CALL Load_StatementofAccount_Report(@Client_Id_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Voucher_ :=?,@CurrencyId_ :=?,@TypeId_ :=?,@User_Type :=?, @Login_User :=?)",
    [Client_Id_,FromDate_,ToDate_,Voucher_,CurrencyId_,TypeId_,User_Type,Login_User],callback);
    },

    
  
    Delete_Performa_Invoice_Master: function (PerformaInvoiceMaster_Id_, callback) {
        return db.query("CALL Delete_Performa_Invoice_Master(@PerformaInvoiceMaster_Id_ :=?)", [PerformaInvoiceMaster_Id_], callback);
    },


    Save_Purchase_order: async function (Purchase_Ordermaster_) {
        console.log(Purchase_Ordermaster_);

        // for(let i = 0; i<Purchase_Ordermaster_.Purchase_Orderdetails.length; i++)
        // {
        //     if(Purchase_Ordermaster_.Purchase_Orderdetails[i].Unit_Discount == null || Purchase_Ordermaster_.Purchase_Orderdetails[i].Unit_Discount == undefined)
        //     {
        //         Purchase_Ordermaster_.Purchase_Orderdetails[i].Unit_Discount = 0;
        //     }
        // }

        if(Purchase_Ordermaster_.OrderNumber == null || Purchase_Ordermaster_.OrderNumber == undefined)
        {
            Purchase_Ordermaster_.OrderNumber = 0;
        }


        return new Promise(async (rs,rej)=>{
            const pool = db.promise();
            var connection = await pool.getConnection();
            try 
            {
                const result1 = await(new storedProcedure('Save_Purchase_order',[Purchase_Ordermaster_.Purchase_OrderMaster_Id,
                    Purchase_Ordermaster_.Account_Party_Id,Purchase_Ordermaster_.EntryDate,Purchase_Ordermaster_.DeliveryDate,   Purchase_Ordermaster_.OrderNumber,Purchase_Ordermaster_.POnumber,
                    Purchase_Ordermaster_.CurrencyId,Purchase_Ordermaster_.PaymentTerms, Purchase_Ordermaster_.AttendEmployee, Purchase_Ordermaster_.TotalAmount,
                    Purchase_Ordermaster_.TotalDiscount,Purchase_Ordermaster_.Roundoff_Amt, Purchase_Ordermaster_.Total_Amount, Purchase_Ordermaster_.NetTotal, 
                    Purchase_Ordermaster_.Brand,  Purchase_Ordermaster_.PriceBasis, Purchase_Ordermaster_.Delivery,Purchase_Ordermaster_.Validity, Purchase_Ordermaster_.Description1, 
                    Purchase_Ordermaster_.User_Id,Purchase_Ordermaster_.Delivery_Address1,Purchase_Ordermaster_.Delivery_Address2, Purchase_Ordermaster_.Delivery_Address3,
                     Purchase_Ordermaster_.Delivery_Address4,Purchase_Ordermaster_.Charge1,Purchase_Ordermaster_.charge1_Amount, Purchase_Ordermaster_.Charge2,
                     Purchase_Ordermaster_.charge2_Amount,Purchase_Ordermaster_.Discount_Description,Purchase_Ordermaster_.Additional_Discount, Purchase_Ordermaster_.Description2,
                    Purchase_Ordermaster_.Amount_In_Words,Purchase_Ordermaster_.PreparedBy,Purchase_Ordermaster_.Charge1per,Purchase_Ordermaster_.Payment_Term_Description,
                    Purchase_Ordermaster_.VAT_Percentage,Purchase_Ordermaster_.VAT_Amount,Purchase_Ordermaster_.TaxableAmount,
                    Purchase_Ordermaster_.KindAttend,
                    Purchase_Ordermaster_.Purchase_Orderdetails,
                    Purchase_Ordermaster_.SalesQuotationMaster_Id,
                    Purchase_Ordermaster_.AccountType_Id,Purchase_Ordermaster_.PaymentTermValue,
                    Purchase_Ordermaster_.Basic_Discount,Purchase_Ordermaster_.Customer_Reference,Purchase_Ordermaster_.Supplier_Ref_No                
                ], connection)).result();

                    console.log(result1)
                    await connection.commit();
                     connection.release();
                   console.log(result1);
                     rs( result1);
                   }
                catch (err) {
                console.log(err);
                await connection.rollback();
                rej(err);
                var result2=[{'Sales_Master_Id_':0}]      
                rs(result2);
              }
              finally 
              {
              connection.release();
           }
         })
         },


    /*** Added on 18-09-2024 */

    Save_Delivery_Order: async function (Delivery_Order_Master_) {
        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {
            console.log('Delivery_Order_Master_ :', Delivery_Order_Master_);
           const result1 = await(new storedProcedure('Save_Delivery_Order_Master',[
               Delivery_Order_Master_.DeliveryOrderMaster_Id, 
               Delivery_Order_Master_.Account_Party_Id,
               Delivery_Order_Master_.EntryDate,
               Delivery_Order_Master_.DONo,
               Delivery_Order_Master_.CurrencyId,
               Delivery_Order_Master_.PaymentTerms,
               Delivery_Order_Master_.User_Id, 
               Delivery_Order_Master_.Delivery_Address1,
               Delivery_Order_Master_.Delivery_Address2, 
               Delivery_Order_Master_.Delivery_Address3, 
               Delivery_Order_Master_.Delivery_Address4, 
               Delivery_Order_Master_.payment_Term_Value,
               Delivery_Order_Master_.Payment_Term_Description,
               Delivery_Order_Master_.Received_By,
               Delivery_Order_Master_.TypeId,
               Delivery_Order_Master_.UserName,
               Delivery_Order_Master_.Kind_Attend,
            //    Delivery_Order_Master_.LPONo,
               Delivery_Order_Master_.Delivery_Order_Details ,
               Delivery_Order_Master_.SalesQuotationMaster_Id,
               Delivery_Order_Master_.PerformaInvoiceMaster_Id,
               Delivery_Order_Master_.TotalAmount,
               Delivery_Order_Master_.TotalDiscount,
               Delivery_Order_Master_.Total_Amount,
               Delivery_Order_Master_.NetTotal,
               Delivery_Order_Master_.LPONo1,

               Delivery_Order_Master_.Roundoff_Amt,
               Delivery_Order_Master_.Basic_Discount,
               Delivery_Order_Master_.Charge1,
               Delivery_Order_Master_.charge1_Amount,
               Delivery_Order_Master_.Charge2,
               Delivery_Order_Master_.charge2_Amount,
               Delivery_Order_Master_.Discount_Description,
               Delivery_Order_Master_.Additional_Discount,
               Delivery_Order_Master_.Amount_In_Words,
               Delivery_Order_Master_.Charge1per,
               Delivery_Order_Master_.VAT_Percentage,
               Delivery_Order_Master_.VAT_Amount,
               Delivery_Order_Master_.TaxableAmount,
               Delivery_Order_Master_.AttendEmployee,
               Delivery_Order_Master_.Description2,


            ], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Sales_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    },
    

    Search_PurchaseOrder:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Order_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
        User_Type, Login_User_Id, callback)
    { 
        if(Order_No_ == "undefined"){
            Order_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }
        
        console.log('ItemName2_: ', FromDate_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
            console.log('Escaped Client_Accounts_Name:', Part_No_);

    return db.query("CALL Search_PurchaseOrder(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Order_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?,"+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Order_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
        User_Type, Login_User_Id
    ],callback);
    },


    Search_Delivery_Order:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_,
        User_Type,Login_User_Id,callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

           
    console.log('ItemName2_: ', Part_No_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Part_No_)) {
			console.log("String contains special characters.");
            Part_No_ = Part_No_.replace(/\\/g, '\\\\');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Part_No_);

    return db.query("CALL Search_Delivery_Order(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,@Account_Type_Id :=?,"+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_,
        User_Type, Login_User_Id],callback);
    },


    Delete_Delivery_Order: function (DeliveryOrderMaster_Id_, callback) 
    {
        return db.query("CALL Delete_Delivery_Order(@DeliveryOrderMaster_Id_ :=?)", [DeliveryOrderMaster_Id_], callback);
    },

    Get_PurchaseOrder_Details:function(Purchase_OrderMaster_Id_,callback)
    { 
    return db.query("CALL Get_PurchaseOrder_Details(@Purchase_OrderMaster_Id_:=?)",[Purchase_OrderMaster_Id_],callback);
    } ,


    Delete_Purchase_Order: function (Purchase_OrderMaster_Id_, callback) {
        return db.query("CALL Delete_Purchase_Order(@Purchase_OrderMaster_Id_ :=?)", [Purchase_OrderMaster_Id_], callback);
    },


    Get_Delivery_Order_Details:function(DeliveryOrderMaster_Id,callback)
    { 
    return db.query("CALL Get_Delivery_Order_Details(@DeliveryOrderMaster_Id_:=?)",[DeliveryOrderMaster_Id],callback);
    } ,


    Get_Performa_invoice_Details:function(PerformaInvoiceMaster_Id_,callback)
    { 
    return db.query("CALL Get_Performa_invoice_Details(@PerformaInvoiceMaster_Id_:=?)",[PerformaInvoiceMaster_Id_],callback);
    } ,

    /*** Added on 19-09-2024 */

    Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo:function(DeliveryOrderMaster_Id_,callback)
   { 
   return db.query("CALL Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(@DeliveryOrderMaster_Id_ :=?)",[DeliveryOrderMaster_Id_],callback);
   },

    Save_PackingDetails: async function (packinglist_master_) {
        console.log(packinglist_master_);
        console.log(packinglist_master_.packinglist_details);

        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {

            if(packinglist_master_.TotalAmount == null || packinglist_master_.TotalAmount == undefined || packinglist_master_.TotalAmount == 'null' || packinglist_master_.TotalAmount == 'undefined')
            {
                packinglist_master_.TotalAmount = 0;
            }

            if(packinglist_master_.NetTotal == null || packinglist_master_.NetTotal == undefined || packinglist_master_.NetTotal == 'null' || packinglist_master_.NetTotal == 'undefined')
                {
                    packinglist_master_.NetTotal = 0;
                }

                if(packinglist_master_.TotalDiscount == null || packinglist_master_.TotalDiscount == undefined || packinglist_master_.TotalDiscount == 'null' || packinglist_master_.TotalDiscount == 'undefined')
                    {
                        packinglist_master_.TotalDiscount = 0;
                    }
           const result1 = await(new storedProcedure('Save_PackingDetails',[packinglist_master_.PackingList_Master_Id,
            //    packinglist_master_.PackingList_No,
               packinglist_master_.EntryDate,
               packinglist_master_.Consignee_Address,
               packinglist_master_.Total_No_Of_Boxes,packinglist_master_.Box_Details, packinglist_master_.Total_Weight,

               packinglist_master_.Account_Party_Id ,packinglist_master_.CurrencyId ,packinglist_master_.PaymentTerms ,
               packinglist_master_.AttendEmployee ,
               packinglist_master_.Brand , packinglist_master_.PriceBasis  , packinglist_master_.Delivery,packinglist_master_.Validity ,
               packinglist_master_.Description1 ,packinglist_master_.User_Id ,
               packinglist_master_.Delivery_Address1 ,packinglist_master_.Delivery_Address2 ,
               packinglist_master_.Delivery_Address3 ,packinglist_master_.Delivery_Address4 ,
               packinglist_master_.Payment_Term_Description ,packinglist_master_.KindAttend ,packinglist_master_.PaymentTermValue ,
               packinglist_master_.Description2,
               packinglist_master_.SalesQuotationMaster_Id,
               packinglist_master_.TotalAmount, 
               packinglist_master_.TotalDiscount, 
               packinglist_master_.Total_Amount, 
               packinglist_master_.NetTotal,packinglist_master_.Invoice_No,packinglist_master_.POnumber,
             packinglist_master_.packinglist_details], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'PackingList_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    },

    Search_PackingDEtails:function(Is_Date_Check_,FromDate_,ToDate_,Quot_No_,Part_No_,callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

   
    return db.query("CALL Search_PackingDEtails(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Quot_No_ :=?,@Part_No_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Quot_No_,Part_No_,],callback);
    },


    Search_PackingDEtail:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_, callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

        // console.log('User_Type_, Login_User_Id_',User_Type_, Login_User_Id_);


           
        // console.log('ItemName2_: ', Part_No_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                // console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                // console.log("String does not contain special characters.");
            }
        
            // console.log('Escaped Client_Accounts_Name:', Part_No_);

    return db.query("CALL Search_PackingDEtail(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,"+
        "@User_Type_ :=?, @Login_User_Id_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_
    ],callback);
    },


    Get_Packing_Details:function(PackingList_Master_Id_,callback)
    { 
    return db.query("CALL Get_Packing_Details(@PackingList_Master_Id_:=?)",[PackingList_Master_Id_],callback);
    } ,

    Load_Profoma_Items_Pending_List_ByQuotation:function(SalesQuotationMaster_Id_,callback)
    { 
    return db.query("CALL Load_Profoma_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)",[SalesQuotationMaster_Id_],callback);
    } ,

    Load_Invoice_Items_Pending_List_ByQuotation:function(SalesQuotationMaster_Id_,callback)
    { 
    return db.query("CALL Load_Invoice_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)",[SalesQuotationMaster_Id_],callback);
    } ,

    Load_Delivery_Items_Pending_List_ByQuotation:function(SalesQuotationMaster_Id_,callback)
    { 
    return db.query("CALL Load_Delivery_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)",[SalesQuotationMaster_Id_],callback);
    } ,

    Load_Purchase_Items_Pending_List_ByQuotation:function(SalesQuotationMaster_Id_,callback)
    { 
    return db.query("CALL Load_Purchase_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)",[SalesQuotationMaster_Id_],callback);
    } ,


    Delete_Packing_Master: function (PackingList_Master_Id_, callback) {
        return db.query("CALL Delete_Packing_Master(@PackingList_Master_Id_ :=?)", [PackingList_Master_Id_], callback);
    },



    Save_Sales_Returns_Master: async function (Sales_Return_Master_) {
        console.log(' Sales_Return_Master_ : ',Sales_Return_Master_);
        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          let result1;
          var connection = await pool.getConnection();
          try 
          {
           const result1 = await(new storedProcedure('Save_Sales_Returns_Master',[
            Sales_Return_Master_.Sales_Return_Master_Id,
            Sales_Return_Master_.Sales_Master_Id,
            Sales_Return_Master_.Account_Party_Id,
            Sales_Return_Master_.EntryDate,
            Sales_Return_Master_.Invoice_No,
            Sales_Return_Master_.User_Id,
            Sales_Return_Master_.Delivery_Address1,
            Sales_Return_Master_.Delivery_Address2,
            Sales_Return_Master_.Delivery_Address3,
            Sales_Return_Master_.Delivery_Address4,
            Sales_Return_Master_.Bill_Date,
            Sales_Return_Master_.LPONo,
            Sales_Return_Master_.DONo,
            Sales_Return_Master_.PackingListNumber,
            Sales_Return_Master_.CurrencyId,
            Sales_Return_Master_.TypeId,
            Sales_Return_Master_.PaymentTerms,
            Sales_Return_Master_.TotalAmount,
            Sales_Return_Master_.TotalDiscount,
            Sales_Return_Master_.TaxableAmount,
            Sales_Return_Master_.Roundoff_Amt,
            Sales_Return_Master_.NetTotal,
            Sales_Return_Master_.KindAttend,
            Sales_Return_Master_.Charge1,
            Sales_Return_Master_.charge1_Amount,
            Sales_Return_Master_.Charge2,
            Sales_Return_Master_.charge2_Amount,
            Sales_Return_Master_.Discount_Description,
            Sales_Return_Master_.Additional_Discount,
            Sales_Return_Master_.Description2,
            Sales_Return_Master_.Employee,
            Sales_Return_Master_.Basic_Discount,
            Sales_Return_Master_.Amount_In_Words,
            Sales_Return_Master_.Charge1per,
            Sales_Return_Master_.Payment_Term_Description,
            Sales_Return_Master_.VAT_percentage,
            Sales_Return_Master_.VAT_Amount,
            Sales_Return_Master_.SupplyDate,
            Sales_Return_Master_.DueDate,
            Sales_Return_Master_.CurrecnyName,
            Sales_Return_Master_.PaymentTermValue,
            Sales_Return_Master_.AttendEmployee,
            Sales_Return_Master_.Sales_Return_Details],connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
                console.log(result1);
                rs( result1);
              }
           catch (err) {
               console.log(err);
           await connection.rollback();
           rej(err);
        //    var result2=[{'Sales_Return_Master_Id_':0}]      
        //    rs(result2);
         }
         finally 
         {
         connection.release();
      }
   })
},

 

    Get_SalesReturn_Details:function(Sales_Return_Master_Id_,callback)
    { 
    return db.query("CALL Get_SalesReturn_Details(@Sales_Return_Master_Id_:=?)",[Sales_Return_Master_Id_],callback);
    } ,


    Delete_SalesReturn_Master:function(Sales_Return_Master_Id_,callback)
    { 
    return db.query("CALL Delete_SalesReturn_Master(@Sales_Return_Master_Id_ :=?)",[Sales_Return_Master_Id_],callback);
    },


    Save_AddStock: async function (Stock_Add_Master_) {
        console.log(Stock_Add_Master_);
        
        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {
           const result1 = await(new storedProcedure('Save_AddStock',[Stock_Add_Master_.Stock_Add_Master_Id,
               Stock_Add_Master_.EntryDate,Stock_Add_Master_.Description,Stock_Add_Master_.User_Id,Stock_Add_Master_.Stock_Add_Details], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Stock_Add_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    },



    Search_AddStock:function(Is_Date_Check_,FromDate_,ToDate_,User_Type_,Login_User_Id_,callback)
    { 
      
    return db.query("CALL Search_AddStock(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@User_Type_ :=?,@Login_User_Id_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,User_Type_,Login_User_Id_],callback);
    },


    Get_AddStock_Details:function(Stock_Add_Master_Id_,callback)
    { 
    return db.query("CALL Get_AddStock_Details(@Stock_Add_Master_Id_:=?)",[Stock_Add_Master_Id_],callback);
    } ,


    Delete_AddStock_Master: function (Stock_Add_Master_Id_, callback) {
        return db.query("CALL Delete_AddStock_Master(@Stock_Add_Master_Id_ :=?)", [Stock_Add_Master_Id_], callback);
    },

    Load_GRn_Pending_List_ByPurchaseOrder:function(Purchase_OrderMaster_Id_,callback)
    { 
    return db.query("CALL Load_GRn_Pending_List_ByPurchaseOrder_new(@Purchase_OrderMaster_Id_:=?)",[Purchase_OrderMaster_Id_],callback);
    } ,


    Search_GRN_Order:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_,callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }
    return db.query("CALL Search_GRN_Order(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,@Account_Type_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_],callback);
    },


    /*** Added on 17-10-2024 */

    Get_Salesmaster_Quotation_Details:function(SalesQuotationMaster_Id_,callback)
    {  return db.query("CALL Get_Salesmaster_Quotation_Details(@SalesQuotationMaster_Id_ :=?)",[SalesQuotationMaster_Id_],callback); },

    Get_Proforma_InvoiceClick_Details:function(PerformaInvoiceMaster_Id_Edit_,callback)
    {  return db.query("CALL Get_Proforma_InvoiceClick_Details(@PerformaInvoiceMaster_Id_Edit_ :=?)",[PerformaInvoiceMaster_Id_Edit_],callback); },

    Load_SalesMaster:function(Sales_Master_Id_,callback)
    {  return db.query("CALL Load_SalesMaster(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback); },


    Get_Proforma_DOClick_Details:function(PerformaInvoiceMaster_Id_Edit_,callback)
    {  return db.query("CALL Get_Proforma_DOClick_Details(@PerformaInvoiceMaster_Id_Edit_ :=?)",[PerformaInvoiceMaster_Id_Edit_],callback); },

    Get_DeliveryOrder_Quotation_Details:function(SalesQuotationMaster_Id_,callback)
    {  return db.query("CALL Get_DeliveryOrder_Quotation_Details(@SalesQuotationMaster_Id_ :=?)",[SalesQuotationMaster_Id_],callback); },

    Get_Purchase_order_GRNClick_Details:function(Purchase_OrderMaster_Id_Edit_,callback)
    {  return db.query("CALL Get_Purchase_order_GRNClick_Details(@Purchase_OrderMaster_Id_Edit_ :=?)",[Purchase_OrderMaster_Id_Edit_],callback); },

    Get_PurchaseOrder_Quotation_Details:function(SalesQuotationMaster_Id_,callback)
    {  return db.query("CALL Get_PurchaseOrder_Quotation_Details(@SalesQuotationMaster_Id_ :=?)",[SalesQuotationMaster_Id_],callback); },

    Get_PackingList_Quotation_Details:function(SalesQuotationMaster_Id_,callback)
    {  return db.query("CALL Get_PackingList_Quotation_Details(@SalesQuotationMaster_Id_ :=?)",[SalesQuotationMaster_Id_],callback); },

    /*** Added on 19-10-2024 */

    Load_PackingList_Items_Pending_List_ByQuotation:function(SalesQuotationMaster_Id_,callback)
    { return db.query("CALL Load_PackingList_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)",[SalesQuotationMaster_Id_],callback);},

    Get_Delivery_Salesmaster:function(DeliveryOrderMaster_Id,callback)
    {  return db.query("CALL Get_Delivery_Salesmaster_1(@DeliveryOrderMaster_Id :=?)",[DeliveryOrderMaster_Id],callback); },

    /** Added on 24-10-2024 */

    Load_Vat_Percentage:function(callback)
    { return db.query("CALL Load_Vat_Percentage()",[],callback); },

    /*** Added on 26-10-2024 */


    /*** Added on 28-10-2024 */

    Get_Item_Code_Typeahead_For_Purchase_Return: function (Purchase_Master_Id_,Item_Code_, callback) {
    if (Item_Code_ === 'undefined' || Item_Code_ === '' || Item_Code_ === undefined)
        Item_Code_ = '';

    console.log('purchase_master_id: ',Purchase_Master_Id_);
    console.log('item_code: ',Item_Code_);


    
    console.log('ItemName2_: ', Item_Code_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Item_Code_)) {
			console.log("String contains special characters.");
			// Item_Code_ = Item_Code_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Item_Code_);

    return db.query("CALL Get_Item_Code_Typeahead_For_Purchase_Return(@Purchase_Master_Id_ :=?,@Item_Code_ :=?)", [Purchase_Master_Id_,Item_Code_], callback);
},

/*** */

Get_Item_Name_Typeahead_For_Purchase_Return: function (Purchase_Master_Id_,Item_Name_, callback) {
    if (Item_Name_ === 'undefined' || Item_Name_ === '' || Item_Name_ === undefined)
        Item_Name_ = '';

    console.log('purchase_master_id: ',Purchase_Master_Id_);
    console.log('Item_Name: ',Item_Name_);


    
    console.log('ItemName2_: ', Item_Name_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Item_Name_)) {
			console.log("String contains special characters.");
			// Item_Name_ = Item_Name_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Item_Name_);


    return db.query("CALL Get_Item_Name_Typeahead_For_Purchase_Return(@Purchase_Master_Id_ :=?,@Item_Name_ :=?)", [Purchase_Master_Id_,Item_Name_], callback);
},

/*** */


Get_Item_Code_Typeahead_For_Sales_Return: function (Sales_Master_Id_,Item_Code_, callback) {
    if (Item_Code_ === 'undefined' || Item_Code_ === '' || Item_Code_ === undefined)
        Item_Code_ = '';

    console.log('Sales_Master_Id: ',Sales_Master_Id_);
    console.log('item_code: ',Item_Code_);

    
    
    console.log('ItemName2_: ', Item_Code_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Item_Code_)) {
			console.log("String contains special characters.");
			// Item_Code_ = Item_Code_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Item_Code_);
    return db.query("CALL Get_Item_Code_Typeahead_For_Sales_Return(@Sales_Master_Id_ :=?,@Item_Code_ :=?)", [Sales_Master_Id_,Item_Code_], callback);
},

/*** */

Get_Item_Name_Typeahead_For_Sales_Return: function (Sales_Master_Id_,Item_Name_, callback) {
    if (Item_Name_ === 'undefined' || Item_Name_ === '' || Item_Name_ === undefined)
        Item_Name_ = '';

    console.log('Sales_Master_Id: ',Sales_Master_Id_);
    console.log('Item_Name: ',Item_Name_);

        
    console.log('ItemName2_: ', Item_Name_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Item_Name_)) {
			console.log("String contains special characters.");
			// Item_Name_ = Item_Name_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Item_Name_);

    return db.query("CALL Get_Item_Name_Typeahead_For_Sales_Return(@Sales_Master_Id_ :=?,@Item_Name_ :=?)", [Sales_Master_Id_,Item_Name_], callback);
},

/*** */



Save_Price_Request: async function (Price_Request_Master_) {
        console.log('Price_Request_Master_ :',Price_Request_Master_);

        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {
           const result1 = await(new storedProcedure('Save_Price_Request',[Price_Request_Master_.SalesPrice_RequestMaster_Id,
               Price_Request_Master_.Account_Party_Id,Price_Request_Master_.EntryDate,Price_Request_Master_.POnumber,
               Price_Request_Master_.CurrencyId,Price_Request_Master_.PaymentTerms,Price_Request_Master_.AttendEmployee,Price_Request_Master_.TotalAmount,
               Price_Request_Master_.TotalDiscount,Price_Request_Master_.Roundoff_Amt,Price_Request_Master_.Total_Amount,Price_Request_Master_.Basic_Discount,
               Price_Request_Master_.NetTotal, Price_Request_Master_.Brand, Price_Request_Master_.PriceBasis, Price_Request_Master_.Delivery,
               Price_Request_Master_.Validity, Price_Request_Master_.Description1, Price_Request_Master_.User_Id, Price_Request_Master_.Delivery_Address1,
               Price_Request_Master_.Delivery_Address2, Price_Request_Master_.Delivery_Address3, Price_Request_Master_.Delivery_Address4, Price_Request_Master_.Charge1,
               Price_Request_Master_.charge1_Amount, Price_Request_Master_.Charge2, Price_Request_Master_.charge2_Amount,Price_Request_Master_.Discount_Description,
               Price_Request_Master_.Additional_Discount, Price_Request_Master_.Description2,Price_Request_Master_.Amount_In_Words,Price_Request_Master_.PreparedBy,
               Price_Request_Master_.Charge1per,Price_Request_Master_.Payment_Term_Description,Price_Request_Master_.VAT_Percentage,Price_Request_Master_.VAT_Amount,Price_Request_Master_.TaxableAmount,
               Price_Request_Master_.KindAttend,Price_Request_Master_.PaymentTermValue,Price_Request_Master_.Supplier_Ref_No,Price_Request_Master_.Price_Request_Details], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Sales_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    }    ,
Search_Price_Request:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_, callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

        console.log('ItemName2_: ', FromDate_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
            console.log('Escaped Client_Accounts_Name:', Part_No_);
            
    return db.query("CALL Search_Price_Request(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,"+
        "@User_Type_ :=?, @Login_User_Id_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_],callback);
    }    ,
Get_Price_Request_Details:function(SalesPrice_RequestMaster_Id_,callback)
    { 
    return db.query("CALL Get_Price_Request_Details(@SalesPrice_RequestMaster_Id_:=?)",[SalesPrice_RequestMaster_Id_],callback);
    }    ,
Delete_Price_Request_Master: function (SalesPrice_RequestMaster_Id_, callback) {
        return db.query("CALL Delete_Price_Request_Master(@SalesPrice_RequestMaster_Id_ :=?)", [SalesPrice_RequestMaster_Id_], callback);
    }    ,
Load_Price_Request_Master:function(SalesPrice_RequestMaster_Id_,callback)
    {  return db.query("CALL Load_Price_Request_Master(@SalesPrice_RequestMaster_Id_ :=?)",[SalesPrice_RequestMaster_Id_],callback); }

    ,
Save_Price_Request: async function (Price_Request_Master_) {
        console.log('Price_Request_Master_ :',Price_Request_Master_);

        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {
           const result1 = await(new storedProcedure('Save_Price_Request',[Price_Request_Master_.SalesPrice_RequestMaster_Id,
               Price_Request_Master_.Account_Party_Id,Price_Request_Master_.EntryDate,Price_Request_Master_.POnumber,
               Price_Request_Master_.CurrencyId,Price_Request_Master_.PaymentTerms,Price_Request_Master_.AttendEmployee,Price_Request_Master_.TotalAmount,
               Price_Request_Master_.TotalDiscount,Price_Request_Master_.Roundoff_Amt,Price_Request_Master_.Total_Amount,Price_Request_Master_.Basic_Discount,
               Price_Request_Master_.NetTotal, Price_Request_Master_.Brand, Price_Request_Master_.PriceBasis, Price_Request_Master_.Delivery,
               Price_Request_Master_.Validity, Price_Request_Master_.Description1, Price_Request_Master_.User_Id, Price_Request_Master_.Delivery_Address1,
               Price_Request_Master_.Delivery_Address2, Price_Request_Master_.Delivery_Address3, Price_Request_Master_.Delivery_Address4, Price_Request_Master_.Charge1,
               Price_Request_Master_.charge1_Amount, Price_Request_Master_.Charge2, Price_Request_Master_.charge2_Amount,Price_Request_Master_.Discount_Description,
               Price_Request_Master_.Additional_Discount, Price_Request_Master_.Description2,Price_Request_Master_.Amount_In_Words,Price_Request_Master_.PreparedBy,
               Price_Request_Master_.Charge1per,Price_Request_Master_.Payment_Term_Description,Price_Request_Master_.VAT_Percentage,Price_Request_Master_.VAT_Amount,Price_Request_Master_.TaxableAmount,
               Price_Request_Master_.KindAttend,Price_Request_Master_.PaymentTermValue,Price_Request_Master_.Supplier_Ref_No,Price_Request_Master_.Price_Request_Details], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Sales_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
    }    ,
Search_Price_Request:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_, callback)
    { 
        if(Quot_No_ == "undefined"){
            Quot_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

        console.log('ItemName2_: ', FromDate_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
            console.log('Escaped Client_Accounts_Name:', Part_No_);
            
    return db.query("CALL Search_Price_Request(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,"+
        "@User_Type_ :=?, @Login_User_Id_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Quot_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
        User_Type_, Login_User_Id_],callback);
    }    ,

    /**
     * Workflow helpers (RequirementMaster_Id is treated as "Reference ID")
     */
    Get_ReferenceId_ByQuotation: function (SalesQuotationMaster_Id_, callback) {
        const qid = Number(SalesQuotationMaster_Id_ || 0);
        if (!qid) return callback(null, [[]]);
        const sql = "SELECT ReferenceID FROM Reference_Quotation WHERE QuotationID = ? ORDER BY ReferenceID DESC LIMIT 1";
        return db.query(sql, [qid], (err, rows) => {
            if (err) return callback(err);
            callback(null, [rows]);
        });
    },

    Get_Proforma_History_ByReference: function (ReferenceID_, callback) {
        const refId = Number(ReferenceID_ || 0);
        if (!refId) return callback(null, [[]]);

        const sql = "SELECT QuotationID FROM Reference_Quotation WHERE ReferenceID = ?";
        return db.query(sql, [refId], (err, rows) => {
            if (err) return callback(err);
            const quotationIds = (rows || []).map(r => Number(r.QuotationID || 0)).filter(x => x > 0);
            if (quotationIds.length === 0) return callback(null, [[]]);

            let pending = quotationIds.length;
            let combined = [];
            quotationIds.forEach(qid => {
                db.query("CALL Get_Proforma_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [qid], (err2, spRows) => {
                    if (!err2 && spRows && spRows[0]) combined = combined.concat(spRows[0]);
                    pending -= 1;
                    if (pending === 0) callback(null, [combined]);
                });
            });
        });
    },

    Update_Quotation_Workflow_Status: function (SalesQuotationMaster_Id_, StatusCode_, callback) {
        const qid = Number(SalesQuotationMaster_Id_ || 0);
        const status = String(StatusCode_ || '').trim();
        if (!qid || !status) return callback(null, [{ ok: 0 }]);

        const createSql = `
            CREATE TABLE IF NOT EXISTS quotation_workflow_status (
                id INT NOT NULL AUTO_INCREMENT,
                quotation_id INT NOT NULL,
                status_code VARCHAR(64) NOT NULL,
                entry_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                KEY idx_qws_quotation_id (quotation_id),
                KEY idx_qws_status_code (status_code)
            )
        `;

        db.query(createSql, [], (err) => {
            if (err) return callback(err);

            const insertSql = "INSERT INTO quotation_workflow_status (quotation_id, status_code) VALUES (?, ?)";
            db.query(insertSql, [qid, status], (err2) => {
                if (err2) return callback(err2);

                // Best-effort: update current status on salesquotationmaster if the column exists.
                db.query("UPDATE salesquotationmaster SET workflow_status = ? WHERE SalesQuotationMaster_Id = ?", [status, qid], (_err3) => {
                    callback(null, [{ ok: 1 }]);
                });
            });
        });
    },
};
module.exports=Sales_Master;


