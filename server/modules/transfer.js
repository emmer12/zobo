let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let transferSchema=mongoose.Schema({
  ref_number:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true,
    default:"Pending"
  },
  account_no:{
    type:Number,
    required:true,
  },
  user_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  receiver_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  amount:{
    type:Number,
    required:true
  }
},
{
  timestamps:true
}
);


let Transfer=module.exports= mongoose.model('withdrawers',transferSchema)
