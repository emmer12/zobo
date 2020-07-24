let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let followerSchema=mongoose.Schema({
  user_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  follower_id:{
    type:Array
  },
  created_at:{
      type:Date,
      default:new Date(),
    },

});


let Follower=module.exports= mongoose.model('follower',followerSchema)

