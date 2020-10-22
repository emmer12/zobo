let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let specialSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  user_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],

},
{
  timestamps:true
}
);


let Zobo=module.exports= mongoose.model('specials',specialSchema)
