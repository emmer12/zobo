var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');
var cors = require('cors')
 


var apiAuth = require('./routes/auth/index');
var apiZobo = require('./routes/zobo/index');
var apiUser = require('./routes/user/index');
var apiNotifications=require('./routes/notification/index');
// var apiAdmin = require('./routes/admin/index');


let dotenv=require('dotenv')

let r=dotenv.config();


var app = express();

app.use(cors())



mongoose.connect(process.env.DB_HOST,{useNewUrlParser:true,useUnifiedTopology:true});

let db=mongoose.connection;
db.once('open',function(){
  console.log('====================================');
  console.log("Zobo api connected");
  console.log('====================================');
});
db.on('error',function(err) {
     console.log(err);
});





//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth',apiAuth);
app.use('/api/zobo',apiZobo);
app.use('/api/user',apiUser);
app.use('/api/notification',apiNotifications);
// app.use('/api/admin',apiAdmin);

if (process.env.NODE_ENV==='production') {
  app.use(express.static(__dirname+'/public'))
}

app.get(/.*/,function(req,res,next) {
  res.sendFile(__dirname+'/public/index.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT, () => {
  console.log('App listening on port 3000!');
});
