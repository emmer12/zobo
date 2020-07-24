let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let followingSchema=mongoose.Schema({
  user_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  following_id:{
    type:Array
  },
  created_at:{
      type:Date,
      default:new Date(),
    },

});


let Following=module.exports= mongoose.model('followings',followingSchema)
