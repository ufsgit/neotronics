var express = require('express');
var router = express.Router();
var Employee_Details=require('../models/Employee_Details');
router.post('/Save_Employee_Details/',async function(req,res,next)
      { 
      try 
      {
      const resp=await Employee_Details.Save_Employee_Details(req.body);
      return res.send(resp);
      }
      catch(e){
      return res.send(e);
      }
      });
router.get('/Search_Employee_Details/:Client_Accounts_Name_?',function(req,res,next)
      { 
      try 
      {
      Employee_Details.Search_Employee_Details(req.params.Client_Accounts_Name_, function (err, rows) 
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
router.get('/Get_Employee_Details/:Employee_Details_Id_?',function(req,res,next)
      { 
      try 
      {
      Employee_Details.Get_Employee_Details(req.params.Employee_Details_Id_, function (err, rows) 
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
router.get('/Get_Employee/:Client_Accounts_Id_?',function(req,res,next)
      { 
      try 
      {
      Employee_Details.Get_Employee(req.params.Client_Accounts_Id_, function (err, rows) 
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
router.get('/Delete_Employee_Details/:Client_Accounts_Id_?',function(req,res,next)
      { 
      try 
      {
      Employee_Details.Delete_Employee_Details(req.params.Client_Accounts_Id_, function (err, rows) 
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
router.get("/Get_Employee_Detail/:Client_Accounts_Id_?",async (req, res, next) =>
      {
      try
      {
      const result = await Employee_Details.Get_Employee_Detail(req.params.Client_Accounts_Id_);
            //console.log('result', result);
      res.json(result);
      } 
      catch (e)
      {
      res.send(e);
      } 
      finally
      {
      }
      });
module.exports = router;

