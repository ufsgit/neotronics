var express = require('express');
var router = express.Router();
var stock_take_name=require('../models/stock_take_name');

router.post('/Save_stock_take_name/',async function(req,res,next)
  { 
  try 
  {
    console.log('req.body: ',req.body)
  const resp=await stock_take_name.Save_stock_take_name(req.body);
  console.log(resp)
  return res.send(resp);
  }
  catch(e){
    console.log(e)
  return res.send(e);
  }
  });

router.get('/Search_Search_stock_take_name/:Stocktakename_ ?',function(req,res,next)
  { 
  try 
  {
    stock_take_name.Search_Search_stock_take_name(req.params.Stocktakename_, function (err, rows) 
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

router.get('/Get_stock_take_name/:Stock_Take_Name_Id_?',function(req,res,next)
{ 
try 
{
  stock_take_name.Get_stock_take_name(req.params.Stock_Take_Name_Id_, function (err, rows) 
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

router.get('/Delete_stock_take_name/:Stock_Take_Name_Id_?',function(req,res,next)
  { 
  try 
  {
    stock_take_name.Delete_stock_take_name(req.params.Stock_Take_Name_Id_, function (err, rows) 
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

  
  router.get('/Get_StockTakeName_Dropdown/',function(req,res,next)
  { 
  try 
  {
    stock_take_name.Get_StockTakeName_Dropdown(function (err, rows) 
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

  router.get('/Status_Dropdown/',function(req,res,next)
  { 
  try 
  {
    stock_take_name.Status_Dropdown(function (err, rows) 
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
    
module.exports = router;