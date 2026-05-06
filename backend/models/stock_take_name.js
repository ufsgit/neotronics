var db=require('../dbconnection');
var fs = require('fs');
const storedProcedure=require('../helpers/stored-procedure');
var stock_take_name =
{ 
    Save_stock_take_name: async function (stock_take_name_) {
        console.log('stock_take_name: ',stock_take_name_)
         return new Promise(async (rs,rej)=>{
           const pool = db.promise();
           let result1;
           var connection = await pool.getConnection();
           try {
            const result1 = await(new storedProcedure('Save_stock_take_name',[stock_take_name_.Stock_Take_Name_Id,
                stock_take_name_.Stocktakename,stock_take_name_.StartDate,stock_take_name_.Status_Id,stock_take_name_.Status_Name], connection)).result();
                console.log(result1);
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

Search_Search_stock_take_name:function(Stocktakename_,callback)
    {
    console.log(Stocktakename_);
    if (Stocktakename_ == null || Stocktakename_ == undefined)
        Stocktakename_='';
        return db.query("CALL Search_Search_stock_take_name(@Stocktakename_ :=?)",
         [Stocktakename_],callback);
    },

Delete_stock_take_name:function(Stock_Take_Name_Id_,callback)
    { 
    return db.query("CALL Delete_stock_take_name(@Stock_Take_Name_Id_ :=?)",[Stock_Take_Name_Id_],callback);
    },

Get_stock_take_name:function(Stock_Take_Name_Id_,callback)
    { 
    return db.query("CALL Get_stock_take_name(@Stock_Take_Name_Id_ :=?)",[Stock_Take_Name_Id_],callback);
    },

    Get_StockTakeName_Dropdown:function(callback)
    {   
    return db.query("CALL Get_StockTakeName_Dropdown()",[],callback);
    },
    

    Status_Dropdown:function(callback)
    {   
    return db.query("CALL Status_Dropdown()",[],callback);
    },
    

};
module.exports=stock_take_name;
