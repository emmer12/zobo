let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let paymentSchema=mongoose.Schema({
  zobo_id:[{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'zobos',
  }],
  owner_id:[{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'users',
  }],
  sender_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  show:{
    type:Boolean,
    default:true
  },
  status:{
    type:String,
    required:true,
  },
  msg:{
    type:String,
    required:false,

  },
  transaction_id:{
    type:String,
    required:true,
  },
  reference:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    required:true,
  },
  amount:{
    type:Number,
    required:true
  }
},
{
  timestamps:true
}
);


let Payments=module.exports= mongoose.model('payments',paymentSchema)
