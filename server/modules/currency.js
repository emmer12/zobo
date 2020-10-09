let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let currencySchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  unit:{
    type:String,
    required:true
  },
},
{
  timestamps:true
}
);


let Currency=module.exports= mongoose.model('currency',currencySchema)
