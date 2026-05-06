var express = require("express");
var router = express.Router();
var Login = require("../models/Login");
const jwt = require('jsonwebtoken');

const config=require('../config.json');

router.get("/Login_Check/:userName?/:password?", function(req, res, next) {
  try {
  //  console.log("req.params.password");req.params.userName, req.params.password
    console.log(req.params);
    Login.Login_Check(req.params.userName, req.params.password, function(
      err,
      rows

    ) 
    {
      console.log(rows);
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log({s:config.secret});
        const token = jwt.sign({ sub: rows[0][0] }, config.secret);

      //  console.log(rows);
        res.json({...rows,token});


      }
    });
  } catch (e) {
  } finally {
  }
});





router.get("/Login_Checks/:userName?/:password?", function(req, res, next) {
  try {
    
  //  console.log("req.params.password");req.params.userName, req.params.password
    console.log("req.query",req.query);
    console.log("req.body",req.body);
    console.log("req.params",req.params);

    Login.Login_Checks(req.query.userName, req.query.password, function(
      err,
      rows

    ) 
    {
     console.log(rows);
      console.log(rows);
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        if(rows[0].length){


          
          console.log({s:config.secret});
          const token = jwt.sign({ sub: rows[0][0] }, config.secret);
          
           console.log(token);
          res.json({...rows,token});
        }else{
          res.json({...rows,token:null});

        }


      }
    });
  } catch (e) {
  } finally {
  }
});

module.exports = router;
