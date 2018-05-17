var express = require('express');
var router = express.Router();


function response(res, sql_query) {
  res.locals.connection.query(sql_query, function (error, result, field) {
    if(error){
      res.send(JSON.stringify({"status":500, "error":error, "result":null}));
    }
    else {
      res.send(JSON.stringify({"status":200, "error":null, "result":result}));
    }
  });
}

router.get('/', function(req, res, next) {
  sql = "SELECT * from employee";
  response(res, sql);
});

router.get('/:id', function(req, res, next) {
  id = req.params['id'];
  sql = "SELECT * from employee where employee_id = " + id;
  response(res, sql);
});

router.delete('/:id', function(req, res, next) {
  id = req.params['id'];
  sql = "DELETE from employee where employee_id = " + id;
  response(res, sql);
});

router.post('/', function(req, res, next) {
  id = req.body.id;
  name =  req.body.name;
  adr = req.body.adr;
  city = req.body.city;
  mobile = req.body.mobile;
  email = req.body.email;
  sql = "insert into employee values(" + id + ",\"" + name + "\",\"" + adr + "\",\"" + city + "\"," + mobile + ",\"" + email + "\")";
  response(res, sql);
});

router.put('/:id', function(req, res, next) {
  name = req.body.name;
  address = req.body.address;
  city = req.body.city;
  mobile = req.body.mobile_no;
  email = req.body.email_id;
  id = req.params['id'];
  if(name){
      sql = "update employee set name=\""+ name +"\" where employee_id=" + id;
      response(res, sql);
  }
  if(address){
      sql = "update employee set address=\""+ address +"\" where employee_id=" + id;
      response(res, sql);
  }
  if(city){
      sql = "update employee set city=\""+ city +"\" where employee_id=" + id;
      response(res, sql);
  }
  if(mobile){
      sql = "update employee set mobile_no=\""+ mobile +"\" where employee_id=" + id;
      response(res, sql);
  }
  if(email){
      sql = 'update employee set "email_id"="'+ email +'" where employee_id=' + id;
      response(res, sql);
  }
});

module.exports = router;
