let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let zoboSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
      type:String,
      required:false
  },
  cover:{
    type:String,
    required:true
  },
   slug:{
    type:String,
  },
  type:[{
    type:Schema.Types.ObjectId,
    ref:'zoboCats'
  }],
  balance:{
    type:Number,
    required:false,
    default:0
  },
  currency:{
    type:String,
    required:false,
    default:'USD'
  },
  link:{
    type:String,
    required:false
  },
  min:{
    type:Number,
    required:true,
  },
  user_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  stack:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
}
);


let Zobo=module.exports= mongoose.model('zobos',zoboSchema)
