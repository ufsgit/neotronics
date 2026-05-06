var express = require('express');
var router = express.Router();
var Item=require('../models/Item');
router.post('/Save_Item/',function(req,res,next)
{ 
try 
{
Item.Save_Item(req.body, function (err, rows) 
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
// router.get('/Search_Item/:Item_Name_?/:Group_Id_?/:Item_Code_?',function(req,res,next)
// { 
// try 
// {
// Item.Search_Item(req.params.Item_Name_,req.params.Group_Id_,req.params.Item_Code_, function (err, rows) 
// {
// if (err) 
// {
//   console.log(err);
// res.json(err);
// }
// else 
// {
//   res.json(rows);
// }
// });
// }
// catch (e) 
// {
//   console.log(e);
// }
// finally 
// {
// }
// });


router.get('/Search_Item',function(req,res,next)
{ 
try 
{
	Item.Search_Item( req.query.Item_Name_,req.query.Group_Id_,req.query.Item_Code_, function (err, rows)
{
if (err) 
{
  console.log(err);
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
  console.log(e);

}
finally 
{
}
});
router.get('/Get_Item/:Item_Id_?',function(req,res,next)
{ 
try 
{
Item.Get_Item(req.params.Item_Id_, function (err, rows) 
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
router.get('/Item_Typeahead',function(req,res,next)
{ 
try 
{
  Item.Item_Typeahead(req.query.Item_Name, function (err, rows)
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
router.get('/HSN_Dropdown/',function(req,res,next)
{ 
try 
{
Item.HSN_Dropdown(function (err, rows) 
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
router.get('/Delete_Item/:Item_Id_?',function(req,res,next)
{ 
try 
{
Item.Delete_Item(req.params.Item_Id_, function (err, rows) 
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


router.post('/Save_Service_Type/',function(req,res,next)
{ 
try 
{
  Item.Save_Service_Type(req.body, function (err, rows)
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
router.get('/Search_Service_Type/:Service_Type_Name_?',function(req,res,next)
{ 
try 
{
  Item.Search_Service_Type(req.params.Service_Type_Name_, function (err, rows)
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
router.get('/Get_Service_Type/:Service_Type_Id_?',function(req,res,next)
{ 
try 
{
  Item.Get_Service_Type(req.params.Service_Type_Id_, function (err, rows)
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
router.get('/Delete_Service_Type/:Service_Type_Id_?',function(req,res,next)
{ 
try 
{
  Item.Delete_Service_Type(req.params.Service_Type_Id_, function (err, rows)
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

