var db=require('../dbconnection');
var fs = require('fs');
const storedProcedure=require('../helpers/stored-procedure');
var Stock_Add_Master=
{ 
Save_Stock_Add_Master: async function (Stock_Add_Master_) {
        console.log('stock_add_master: ',Stock_Add_Master_)
         return new Promise(async (rs,rej)=>{
           const pool = db.promise();
           let result1;
           var connection = await pool.getConnection();
           try {
            const result1 = await(new storedProcedure('Save_Stock_Add_Master',[Stock_Add_Master_.Stock_Add_Master_Id,
                Stock_Add_Master_.Entry_Date,Stock_Add_Master_.Description1,Stock_Add_Master_.User_Id,Stock_Add_Master_.Item_Group_Name,
                Stock_Add_Master_.Item_Group,Stock_Add_Master_.Branch, Stock_Add_Master_.Branch_Name,Stock_Add_Master_.Doc_Photo,
                Stock_Add_Master_.File_Path,Stock_Add_Master_.Description,
                Stock_Add_Master_.Stock_Add_Details], connection)).result();
                                    console.log(result1) 

                await connection.commit();
                 connection.release();
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

Save_Stock_Add_Master1: async function (Stock_Add_Master_) 
    {
    return new Promise(async (rs,rej)=>
    {
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    await connection.beginTransaction();  
    try
        {
            let lt = await (new storedProcedure('OpenTrans',[], connection)).result();
            const result1 =await(new storedProcedure('Save_Stock_Add_Master',[Stock_Add_Master_.Stock_Add_Master_Id,
            Stock_Add_Master_.Entry_Date,Stock_Add_Master_.Description1,Stock_Add_Master_.User_Id], connection)).result();
            var Stock_Add_Master_Id_ = result1[0].Stock_Add_Master_Id_;  
            var Stock_Add_Details_= Stock_Add_Master_.Stock_Add_Details;
            var Stock_=Stock_Add_Master_.Stock;
            const result3 =await(new storedProcedure('Save_Stock_Add_Details',[Stock_Add_Details_,Stock_Add_Master_Id_],connection)).result();
            await connection.commit();
            let cltr = await (new storedProcedure('CloseTrans', [], connection)).result();
            connection.release();
            rs( result1);
        }
    catch (err) {
        console.log(err);
    await connection.rollback();
    rej(err);}
    })
    },
Search_Stock_Add_Report:function(Is_Date_Check_,From_date_,To_date_,Item_,callback)
    {
    console.log(Is_Date_Check_,From_date_,To_date_,Item_)
        return db.query("CALL Search_Stock_Add_Report(@Is_Date_Check_ :=?,@From_date_ :=?,@To_date_  :=?,@Item_ :=?)",
         [Is_Date_Check_,From_date_,To_date_,Item_],callback);
    },
Delete_Stock_Add_Master:function(Stock_Add_Master_Id_,callback)
    { 
    return db.query("CALL Delete_Stock_Add_Master(@Stock_Add_Master_Id_ :=?)",[Stock_Add_Master_Id_],callback);
    },
Get_Stock_Add_Master:function(Stock_Add_Master_Id_,callback)
    { 
    return db.query("CALL Get_Stock_Add_Master(@Stock_Add_Master_Id_ :=?)",[Stock_Add_Master_Id_],callback);
    },
Search_Stock_Add_Master:function(FromDate_,ToDate_,Is_Date_Check_,Branch_,callback)
    { 
    return db.query("CALL Search_Stock_Add_Master(@FromDate_ :=?,@ToDate_ :=?,@Is_Date_Check_ :=?,@Branch_ :=? )",[FromDate_,ToDate_,Is_Date_Check_,Branch_],callback);
    },
Get_Barcode_Stock:function(Barcode_,callback)
    { 
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Get_Barcode_Stock(@Barcode_ :=?)",[Barcode_],callback);
    },
Get_Item_Typeahead:function(ItemName_,callback)
    { 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
    return db.query("CALL Get_Item_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
    },

/*** Added on 22-08-2024 */

Search_Stock_Add_Master_Report:function(FromDate_,ToDate_,Is_Date_Check_,Branch_,callback)
    { 
        return db.query("CALL Search_Stock_Add_Master_Report(@FromDate_ :=?,@ToDate_ :=?,@Is_Date_Check_ :=?,@Branch_ :=? )",[FromDate_,ToDate_,Is_Date_Check_,Branch_],callback);
    },

};
module.exports=Stock_Add_Master;
