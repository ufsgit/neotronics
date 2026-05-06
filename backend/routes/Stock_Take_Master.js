var express = require('express');
var router = express.Router();
var Stock_Take_Master=require('../models/Stock_Take_Master');

router.post('/Save_Stock_Take_Master/',async function(req,res,next)
  { 
  try 
  {
    console.log('req.body: ',req.body)
  const resp=await Stock_Take_Master.Save_Stock_Take_Master(req.body);
  console.log(resp)
  return res.send(resp);
  }
  catch(e){
    console.log(e)
  return res.send(e);
  }
  });
//look_In_Date_Value,From_Date,To_Date,Stock_Take_Name_Id,Login_User_Id
router.get('/Search_Stock_Take_Master/:Is_Date_Check_ ?/:From_Date_?/:To_Date_?/:Stock_Take_Name_Id_ ?/:Login_User_Id_?',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Search_Stock_Take_Master(req.params.Is_Date_Check_,req.params.From_Date_,req.params.To_Date_,req.params.Stock_Take_Name_Id_,req.params.Login_User_Id_, function (err, rows) 
  {
  if (err) 
  {
  console.log(err);
  res.json(err);
  }
  else 
  {
  console.log(rows);
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });

  router.get('/Get_Stock_Take_Details/:Stock_Take_Master_Id_?',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Get_Stock_Take_Details(req.params.Stock_Take_Master_Id_, function (err, rows) 
  {
   if (err) 
   {
   res.json(err);
   }
   else 
   {
     res.json(rows);
   }
   });
   }
  catch (e) 
  {
  }
  finally 
  {
  }
   });

  router.get('/Search_Stock_Add_Report/:Is_Date_Check_?/:From_Date_?/:To_Date_?/:Item_ ?/',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Search_Stock_Add_Report(req.params.Is_Date_Check_,req.params.From_Date_,req.params.To_Date_,
    req.params.Item_, function (err, rows) 
  {
  if (err) 
  {
    console.log(err)
  res.json(err);
  }
  else 
  {
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });
router.get('/Get_Stock_Add_Master/:Stock_Add_Master_Id_?',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Get_Stock_Add_Master(req.params.Stock_Add_Master_Id_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });
router.get('/Delete_Stock_Add_Master/:Stock_Add_Master_Id_?',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Delete_Stock_Add_Master(req.params.Stock_Add_Master_Id_, function (err, rows) 
  {
  if (err) 
  {
    console.log(err)
  res.json(err);
  }
  else 
  {
    console.log(rows)
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
    console.log(e)
  }
  finally 
  {
  }
  });
  router.get('/Get_Barcode_Stock/:Barcode_?',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Get_Barcode_Stock(req.params.Barcode_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });
  router.get('/Get_Item_Typeahead/:ItemName_?',function(req,res,next)
  { 
  try 
  {
    Stock_Take_Master.Get_Item_Typeahead(req.params.ItemName_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });

  /*** Added on 22-08-2024 */

  router.get('/Search_Stock_Add_Master_Report/:From_Date_?/:To_Date_?/:Is_Date_Check_ ?/:Branch_ ?',function(req,res,next)
    { 
    try 
      {
        Stock_Take_Master.Search_Stock_Add_Master(req.params.From_Date_,
                                               req.params.To_Date_,
                                               req.params.Is_Date_Check_,
                                               req.params.Branch_, function (err, rows) 
      {
      if (err) 
        {
          console.log(err);
          res.json(err);
        }
        else 
        {
          console.log(rows);
          res.json(rows);
        }
      });
      }
    catch (e) {}
    finally {}
    });

  
module.exports = router;

