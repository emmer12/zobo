let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let blogSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
      type:String,
      required:true
    },
  tags:{
    type:Array,
    required:true
  },
  comments_id:[{
    type:Schema.Types.ObjectId,
    ref:'comments'
  }],
  user_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
  preview_image:{
    type:String,
    required:true
  }
},
{
  timestamps:true
}
);


let Blog=module.exports= mongoose.model('zobos',blogSchema)
