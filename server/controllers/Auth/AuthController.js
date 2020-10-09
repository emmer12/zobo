const jwt = require('jsonwebtoken');
const User = require("../../modules/users")
const {check,validationResult}=require('express-validator')
const Mailer = require('./../../config/mailer')

const AuthController = {
    create,
    login,
    confirmUser,
    requestPasswordReset,  
    passwordReset,
    confirmPasswordReset,
    validateData,
    checkPin
}


function validateData(field){
    switch (field) {
        case 'create':
            return [
                check('username').not().isEmpty().withMessage('email must not be empty'),
                check('firstname').not().isEmpty().withMessage('firstname is required'),
                check('lastname').not().isEmpty().withMessage('lastname is required'),
                check('location').not().isEmpty().withMessage('location is required'),
                check('email').not().isEmpty().withMessage('email is required'),
                check('email').isEmail().withMessage('inverlid email address'),
                check('birthday').not().isEmpty().withMessage('date must not be empty'),
                check('pin').not().isEmpty().withMessage('pin is required'),
                check('password').not().isEmpty().withMessage('password is required'),
                check('password').isLength({min:6}).withMessage('password must not be less than 6 value')
            ];
            break;

            case 'login':
            return [
                check('password').not().isEmpty().withMessage("password feild is empty"),
            ];
            break;
    
        default:[]
            break;
    }
}
 



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$!#\s]/g, "\\$&")
}


function checkPin(req, res, next) {

    const user_pin = req.body.val;
    const username=req.user.username
        User.findOne({username:username}, (err, user) => {
            if (user && user.validPin(user_pin)) {
                var pinToken = user.pinAuthToken()
                res.status(200).json({
                    pinToken,
                    token:user.tokenize(),
                    user:userFilter(user)
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    msg: "Wrong pin"
                })

            }
        })

}
function userFilter(user) {
    let newUser = {}
    newUser._id = user._id
    newUser.username = user.username
    newUser.balance = user.balance
    newUser.firstname = user.firstname
    newUser.lastname = user.lastname
    newUser.email = user.email
    newUser.location = user.location
    newUser.createdAt = user.createdAt
    newUser.profile_image = user.profile_image
    newUser.confirmed = user.confirmed
    return newUser
}


function login(req, res, next) {
    const username_email = req.body.username;
    const password = req.body.password;

    console.log(req.body);
    
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            global:true,
            errors,
        })
    } else {
        User.findOne({ $or: [{ username: username_email }, { email: username_email }] }, (err, user) => {
            if (user && user.validPassword(password)) {
                var token = user.tokenize()
                res.status(200).json({
                    success: true,
                    token,
                    user:userFilter(user) 
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    msg: "Invalid credantials"
                })

            }
        })
    }

}



function create(req, res, next) {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const birthday = req.body.birthday;
    const password = req.body.password;
    const pin = req.body.pin;
    const location = req.body.location;


    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            global:true,
            errors,
        })
    } else {
        User.findOne({
            $or: [
                { "username": username }, { "email": email }
            ]
        }).exec(function (err, user) {

            if (user) {
                if (user.username == username) {
                    res.status(400).json({
                        success: false,
                        msg:`username ${username} has been taken`
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        msg:`email ${email} has been taken`
                    })
                }
            } else {
                var newUser = new User({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    pin,
                    birthday,
                    location,

                })

                newUser.password = newUser.encryptPassword(password);
                newUser.pin = newUser.encryptPin(pin);
                newUser.confirmationToken = newUser.setConfirmationToken()
                newUser.save(function (err) {
                    if (err) {
                        console.log('====================================');
                        console.log(err);
                        console.log('====================================');
                        res.status(400).json({
                            error: true,
                            msg: "something went wrong,please try again later",
                        })
                    }
                    else {
                        Mailer.sendConfirmationEmail(newUser)
                        let token = newUser.tokenize()
                        res.send({ success: true, token,user:userFilter(newUser)  });
                    }
                })
            }
        })
    }
}

function confirmUser(req, res) {
    User.findOneAndUpdate(
        { confirmationToken: req.params.token },
        { confirmationToken: "",confirmed:true },
        {new:true}
        ).exec(function (err,user) { 
                user ? res.status(200).json({ success: true, token:user.tokenize() }) : res.status(400).json({msg:"invalid token"});
         })
}

function requestPasswordReset(req,res) {
    console.log(req.body.email);
    
    User.findOne({email:req.body.email}).exec(function(err,user) {
        if(user){
            Mailer.sendPasswordResetEmail(user)
            res.status(200).json({success: true}) 
        }else{
            res.status(400).json({
                msg:"User not found"
            })
        }
    })
}
function confirmPasswordReset(req,res) {
    var token=req.params.token;
    jwt.verify(token,process.env.JWT_SECRET_TOKEN,function (err,decoded){ 
        if(err){
          res.status(400).json({
            error:true,
            msg:"invalid access token"
          })
        }else{
          res.status(200).json({
              success:true,
          })
        }
    })
}

function passwordReset(req,res) {
    var token=req.body.token;
    var password=req.body.password;
    jwt.verify(token,process.env.JWT_SECRET_TOKEN,function (err,decoded){ 
        if (err) {
            console.log(err,'token');
        }else{
            let id=decoded._id
            User.findOne({_id:id}).exec(function(err,user) { 
                if (user) {
                    user.password=user.encryptPassword(password)
                    User.update({_id:id},{password:user.password}).then(()=>res.status(200).json({ success: true }))
                }else{
                    res.status(400).json({msg:"Invalid Token"});
                }
             })
            
        }
    })
}


module.exports = AuthController