let mongoose = require('mongoose');


let zoboCategorySchema=mongoose.Schema({
  zobo:{
    type:String,
    required:false,
    default:"Zobo"
  },
  min:{
    type:Number,
    required:false,
    default:100
  },
  display:{
    type:String,
    required:true
  },
  access:{
    type:String,
    default:'Public'
  }
},
{
  timestamps:true
}
);


let ZoboCat=module.exports= mongoose.model('zoboCats',zoboCategorySchema)
