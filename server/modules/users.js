let mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');

const Schema=mongoose.Schema
let userSchema=mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  phoneNo:{
    type:Number,
    required:false
  },
  birthday:{
    type:Date,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:false
  },
  password:{
    type:String,
    required:true
  },
  pin:{
    type:String,
    required:true
  },
  profile_image:{
    type:String,
    required:false,
    default:'default.png'
  },
  confirmed:{
    type:Boolean,
    default:false
  },
  confirmationToken:{
    type:String,
  },
  role:{
    type:String,
    required:true,
    default:"User"
  },
  balance:{
    type:Number,
    required:false,
    default:0
  },
  bio:{
    type:String,
    required:false
  },
  profile_image:{
    type:String,
    required:false,
    default:'profile.png'
  },
  card_id:[{
    type:Schema.Types.ObjectId,
    ref:'users'
  }],
},
{
  timestamps:true
}
);

userSchema.methods.encryptPassword=function encryptPassword(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}

userSchema.methods.encryptPin=function encryptPin(pin) {
  return bcrypt.hashSync(pin,bcrypt.genSaltSync(5),null)
}
userSchema.methods.validPin=function validPin(pin) {
  return bcrypt.compareSync(pin,this.pin)
}

userSchema.methods.validPassword=function validPassword(password) {
  return bcrypt.compareSync(password,this.password)
}
userSchema.methods.setConfirmationToken=function setConfirmationToken() {
  return this.confirmationToken=this.tokenize()
}
userSchema.methods.generateConfirmationUrl=function generateConfirmationUrl() {
  return `${process.env.HOST}/users/confirmation/${this.confirmationToken}`
}

userSchema.methods.generateResetPasswordLink=function generateResetPasswordLink() {
  return `${process.env.HOST}/reset-password/${this.resetPasswordToken()}`
}



userSchema.methods.resetPasswordToken=function resetPasswordToken(){
  const token=jwt.sign(
    {_id:this._id},
    process.env.JWT_SECRET_TOKEN,
    {expiresIn:"1h"}
 )
 return token
}

userSchema.methods.tokenize=function tokenize(){
  const token=jwt.sign({
   email:this.email,
 },
 process.env.JWT_SECRET_TOKEN,
 {expiresIn:'1y'}
 )
 return token
}


userSchema.methods.pinAuthToken=function pinAuthToken(){
  const token=jwt.sign({
   email:this.email,
 },
 process.env.JWT_SECRET_TOKEN,
 {expiresIn:'1h'}
 )
 return token
}






let User=module.exports= mongoose.model('users',userSchema)
