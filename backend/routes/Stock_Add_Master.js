var express = require('express');
var router = express.Router();
var Stock_Add_Master=require('../models/Stock_Add_Master');

router.post('/Save_Stock_Add_Master/',async function(req,res,next)
  { 
  try 
  {
    console.log('req.body: ',req.body)
  const resp=await Stock_Add_Master.Save_Stock_Add_Master(req.body);
  console.log(resp)
  return res.send(resp);
  }
  catch(e){
    console.log(e)
  return res.send(e);
  }
  });


  

router.get('/Search_Stock_Add_Master/:From_Date_?/:To_Date_?/:Is_Date_Check_ ?/:Branch_ ?',function(req,res,next)
  { 
  try 
  {
  Stock_Add_Master.Search_Stock_Add_Master(req.params.From_Date_,req.params.To_Date_,req.params.Is_Date_Check_,req.params.Branch_, function (err, rows) 
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
  router.get('/Search_Stock_Add_Report/:Is_Date_Check_?/:From_Date_?/:To_Date_?/:Item_ ?/',function(req,res,next)
  { 
  try 
  {
  Stock_Add_Master.Search_Stock_Add_Report(req.params.Is_Date_Check_,req.params.From_Date_,req.params.To_Date_,
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
  Stock_Add_Master.Get_Stock_Add_Master(req.params.Stock_Add_Master_Id_, function (err, rows) 
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
  Stock_Add_Master.Delete_Stock_Add_Master(req.params.Stock_Add_Master_Id_, function (err, rows) 
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
  Stock_Add_Master.Get_Barcode_Stock(req.params.Barcode_, function (err, rows) 
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
  Stock_Add_Master.Get_Item_Typeahead(req.params.ItemName_, function (err, rows) 
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
      Stock_Add_Master.Search_Stock_Add_Master(req.params.From_Date_,
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

