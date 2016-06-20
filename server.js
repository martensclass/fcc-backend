var express = require('express');

var app = express();
var months=["January","February","March","April","May","June","July","August","September","October","November","December"];

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

app.get('/:id', function (req, res) {
  var id = req.params.id;
  var d,u, n;
  //what if id is a number?  Then UNIX time it is
 if(isNaN(Number(id))==false){
   d = new Date(Number(id)*1000);
   u = d.getTime()/1000;
   n = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
 }
 else{ //try to make a date out of it
    d = new Date(id);
     u = d.getTime()/1000;
     if(months[d.getMonth()]===undefined)
      n=null;
    else{ //make the unix and natural dates
        n = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }
 }
 res.json({unix: u, natural: n});
 
});

app.listen(process.env.PORT || 5000);

