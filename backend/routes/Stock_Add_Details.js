 var express = require('express');
 var router = express.Router();
 var Stock_Add_Details=require('../models/Stock_Add_Details');
 router.post('/Save_Stock_Add_Details/',function(req,res,next)
 { 
 try 
 {
Stock_Add_Details.Save_Stock_Add_Details(req.body, function (err, rows) 
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
 router.get('/Search_Stock_Add_Details/:Stock_Add_Details_Name_?',function(req,res,next)
 { 
 try 
 {
Stock_Add_Details.Search_Stock_Add_Details(req.params.Stock_Add_Details_Name_, function (err, rows) 
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

 router.get('/Get_Stock_Add_Details/:Stock_Add_Master_Id_?',function(req,res,next)
 { 
 try 
 {
Stock_Add_Details.Get_Stock_Add_Details(req.params.Stock_Add_Master_Id_, function (err, rows) 
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


 router.get('/Delete_Stock_Add_Details/:Stock_Add_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Stock_Add_Details.Delete_Stock_Add_Details(req.params.Stock_Add_Details_Id_, function (err, rows) 
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
  router.get('/Get_ItemGroup_Load_Data/',function(req,res,next)
  { 
  try 
  {
    Stock_Add_Details.Get_ItemGroup_Load_Data(function (err, rows)  
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

  router.get('/Get_Item_Name_Get_With_Code_Stock_Add_Details/:Item_Code_?/:Item_Group_Id_?',function(req,res,next)
  { 
    try 
    {
      Stock_Add_Details.Get_Item_Name_Get_With_Code_Stock_Add_Details(req.params.Item_Code_,req.param.Item_Group_Id, function (err, rows) 
      {
        if (err) 
        {
          res.json(err);
		  console.log(err);
        }
        else 
        {
          res.json(rows);
		  console.log(rows);
        }
      });
    }
    catch (e) {
		console.log(e);
	}
    finally {}
  });

  	/****Added on 23-02-2024 */

    router.get('/Get_Item_Name_Get_With_Code_Stock_Add_Details_App/:Item_Code_?/:Item_Group_Id_?',function(req,res,next)
  { 
    try 
    {
      console.log('req.params: ', req.params);
      Stock_Add_Details.Get_Item_Name_Get_With_Code_Stock_Add_Details_App(req.params.Item_Code_,req.params.Item_Group_Id_, function (err, rows) 
      {
        if (err) 
        {
          res.json(err);
		  console.log(err);
        }
        else 
        {
          res.json(rows);
		  console.log(rows);
        }
      });
    }
    catch (e) {
		console.log(e);
	}
    finally {}
  });


  /*** Added on 22-08-2024 */

  router.get('/Get_Stock_Add_Details_Report/:Stock_Add_Master_Id_?',function(req,res,next)
    { 
      try 
      {
    Stock_Add_Details.Get_Stock_Add_Details_Report(req.params.Stock_Add_Master_Id_, function (err, rows) 
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
      catch (e) {}
      finally {}
    });
  module.exports = router;

