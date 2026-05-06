var express = require('express');
var router = express.Router();
var Brand=require('../models/Brand');
router.post('/Save_Brand/',function(req,res,next)
{ 
try 
{
    Brand.Save_Brand(req.body, function (err, rows) 
{
if (err) 
{
res.json(err);
}
else 
{
res.json(rows);
console.log(rows);

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

// router.get('/Search_Brand/:Brand_Name?', function(req, res, next) {
//     try {
//         const brandName = req.params.Brand_Name || ''; // Use req.params
//         console.log(brandName, "////Brand_Name_");

//         Brand.Search_Brand(brandName, function(err, rows) {
//             if (err) {
//                 res.json(err);
//                 console.log(err);
//             } else {
//                 res.json(rows);
//                 console.log(rows);
//             }
//         });
//     } catch (e) {
//         console.log(e);
//     } finally {
//         // Optional: Cleanup or additional logic
//     }
// });

router.get('/Search_Brand',function(req,res,next)
{ 
try 
{
	Brand.Search_Brand( req.query.Brand_Name_, function (err, rows)
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

// router.get('/Search_Brand/:Brand_Name?',function(req,res,next)
// { 
    
// try 
// {
//     Brand.Search_Brand(req.query.Brand_Name, function (err, rows) 
// {
//     console.log(req.query.Brand_Name,"////Brand_Name_");
   
// if (err) 
// {
// res.json(err);
// console.log(err);

// }
// else 
// {
// res.json(rows);
// console.log(rows);

// }
// });
// }
// catch (e) 
// {
//     console.log(e);
    
// }
// finally 
// {
// }
// });
router.get('/Delete_Brand/:Brand_Id_?',function(req,res,next)
{ 
try 
{
    Brand.Delete_Brand(req.params.Brand_Id_, function (err, rows) 
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
    console.log(e)
}
finally 
{
}
});
router.get('/Search_Under_Brand/',function(req,res,next)
{ 
try 
{
    Brand.Search_Under_Brand(function (err, rows) 
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

