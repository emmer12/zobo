let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let withdrawSchema=mongoose.Schema({
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
    ref:'newusers'
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


let Withdrawers=module.exports= mongoose.model('withdrawers',withdrawSchema)
