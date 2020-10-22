// const jwt = require('jsonwebtoken');
const User = require("./../modules/users")
const Zobo = require("./../modules/zobo")
const Special = require("./../modules/special")
const Currency = require("./../modules/currency")
const { currencyConverter } = require("./../utility")
const Mailer = require('../config/mailer')

// let mongoose = require('mongoose');


const UserController = {
    getUser,
    updateProfile,
    getByUsername,
    userFilter,
    getCurrency,
    setCurrency,
    sendMail,
    addSpecial
    // requestPasswordReset,  
    // passwordReset,
    // confirmPasswordReset
}

 



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$!#\s]/g, "\\$&")
}




function search(req, res) {
    let query = req.query.q
    if (query) {
        const regex = new RegExp(escapeRegex(query), 'gi')
        User.find({ username: regex })
            .limit(3)
            .sort({ created_at: -1 })
            .exec(function (err, users) {
                Feed.find({ title: regex })
                    .limit(3)
                    .sort({ created_at: -1 })
                    .exec(function (err, challenges) {
                        res.status(200).json({
                            success: true,
                            result: {
                                users,
                                challenges
                            }
                        })
                    })
            })
    }
}
async function getUsers(req, res, next) {

    var limit = parseInt(req.query.limit)

   
   
   
    const count = await User.count().exec()

        // let query={_id:{$ne:req.user._id}}
        await User.aggregate({
            $lookup: {
                from: "followeds",
                localField: "_id",
                foreignField: "user_id",
                as: "following"
            }
        }).sort({ createdAt: -1 }).limit(limit).exec(function (err, users) {
            if (users) {
                res.status(200).json({
                    users,
                    exhusted:count < limit ? true : false 
                })
            }
        })

    }

function userFilter(user) {
    let newUser = {}
    newUser._id = user._id
    newUser.username = user.username
    newUser.balance = user.balance
    newUser.phoneNo = user.phoneNo
    newUser.birthday = user.birthday
    newUser.firstname = user.firstname
    newUser.lastname = user.lastname
    newUser.email = user.email
    newUser.location = user.location
    newUser.role = user.role
    newUser.createdAt = user.createdAt
    newUser.profile_image = user.profile_image
    newUser.confirmed = user.confirmed
    newUser.currency = user.currency
    return newUser
}

    

function getUser(req, res) {
    res.status(200).json({
        user:userFilter(req.user)
    })
}

function addSpecial(req,res){
    let name=req.body.name
    let date=req.body.date
    let user_id=req.user._id

    let newSpecial=new Special({
        name,
        date,
        user_id
    })

    newSpecial.save().then((data, err) => {
        User.findOneAndUpdate({ _id: user_id },{ $push:{special:data}} , { new: true }).then(()=>{
            res.status(200).json({
                success: true,
            })
        }).catch(err=>console.log(err));
       
    }).catch(()=>{
        res.status(400).json({
            success:false,
        })
    })
}

function updateProfile(req, res) {
    let field = req.body.field;
    let value = req.body.value;
    let user_id = req.user._id;
    let data = {}
    data[field] = value
    console.log(data);
    
    if (field == "username") {
        User.findOne({ username: value }).exec(function (err, user) {
            if (user) {
                res.status(400).json({
                    success: false,
                    msg: "username has been taken"
                })
            } else {
                update(res, data, user_id)
            }

        })
    } else if (field == "email") {

        User.findOne({ email: value }).exec(function (err, user) {
            if (user) {
                res.status(400).json({
                    success: false,
                    msg: "email has been taken"
                })
            } else {
                update(res, data, user_id)
            }

        })
    }
    else if (field == "password") {
        if (req.user.validPassword(value)) {
            let data = {}
            data[field] = req.user.encryptPassword(req.body.password_new);
            update(res, data, user_id)
        } else {
            res.status(400).json({
                success: false,
                msg: "Invalid old password"
            })

        }

    }
    else {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        update(res, data, user_id)
    }




    console.log('====================================');
    console.log(field, value);
    console.log('====================================');
}

function update(res, data, id) {
    User.findOneAndUpdate({ _id: id }, data, { new: true }).exec(function (err, user) {
        
        if (user) {
            let token = user.tokenize()
            res.status(200).json({
                success: true,
                user:userFilter(user),
                token
            })
        }
    })

}

function getByUsername(req,res) {
    let username=req.params.username;

    User.findOne({username:username}).exec(async function (err,user) { 
       if (user) {
        res.status(200).json({
            user:userFilter(user),
            zobo:await Zobo.find({user_id:user._id}).sort({createdAt:-1}).exec()
        })
       }else{
        res.status(400).json({
            error:true,
            msg:"No user found"
            })
       }
     })
}


function getCurrency(req, res) {
    Currency.find({}).exec(function(err,currency){
       if (err) {
           res.status(400).json({
               msg: "No post found"
           })
       }
       res.status(200).json({
        currency
       })
    })
}

function setCurrency(req,res) {
    let converted=currencyConverter(req.user.currency,req.body.data,req.user.balance)
    User.findOneAndUpdate({ _id: req.user._id },{currency:req.body.data,balance:converted } , { new: true }).exec(function (err, user) {
        if (user) {
            res.status(200).json({
                success: true,
            })
        }
    })
  }


  function sendMail() { 
    Mailer.randomEmailwithTemplate()
      console.log('====================================');
      console.log('sebnding.....');
      console.log('====================================');
  }


// function confirmUser(req, res) {
//     User.findOneAndUpdate(
//         { confirmationToken: req.params.token },
//         { confirmationToken: "",confirmed:true },
//         {new:true}
//         ).exec(function (err,user) { 
//                 user ? res.status(200).json({ success: true, token:user.tokenize() }) : res.status(400).json({msg:"invalid token"});
//          })
// }

// function requestPasswordReset(req,res) {
//     console.log(req.body.email);
    
//     User.findOne({email:req.body.email}).exec(function(err,user) {
//         if(user){
//             Mailer.sendPasswordResetEmail(user)
//             res.status(200).json({success: true}) 
//         }else{
//             res.status(400).json({
//                 msg:"There is no user with such email"
//             })
//         }
//     })
// }
// function confirmPasswordReset(req,res) {
//     var token=req.params.token;
//     jwt.verify(token,process.env.JWT_SECRET_TOKEN,function (err,decoded){ 
//         if(err){
//           res.status(400).json({
//             error:true,
//             msg:"invalid access token"
//           })
//         }else{
//           res.status(200).json({
//               success:true,
//           })
//         }
//     })
// }

// function passwordReset(req,res) {
//     var token=req.body.token;
//     var password=req.body.password;
//     jwt.verify(token,process.env.JWT_SECRET_TOKEN,function (err,decoded){ 
//         if (err) {
//             console.log(err,'token');
//         }else{
//             let id=decoded._id
//             User.findOne({_id:id}).exec(function(err,user) { 
//                 if (user) {
//                     user.password=user.encryptPassword(password)
//                     User.update({_id:id},{password:user.password}).then(()=>res.status(200).json({ success: true }))
//                 }else{
//                     res.status(400).json({msg:"Invalid Token"});
//                 }
//              })
            
//         }
//     })
// }





// function remove(req, res) {
//     console.log('====================================');
//     console.log(req.body.username);
//     console.log('====================================');
//     User.remove({ username: req.body.username }).exec(function (err, user) {
//         if (user) {
//             res.status(200).json({
//                 success: true,
//                 msg: "User Removed"
//             })
//         }
//     })

// }

// function updateProfilePic(req, res) {
//     let user_id = req.user._id;
//     let filename = req.file.filename;
//     console.log(req.file);

//     User.findOneAndUpdate({ _id: user_id }, { profile_image: filename }, { new: true }).exec(function (err, user) {
//         let token = user.tokenize()
//         if (user) {
//             res.status(200).json({
//                 success: true,
//                 token
//             })
//         }
//     })
// }

module.exports = UserController