const ZoboCat= require("./../modules/zoboCat")
const Zobo= require("./../modules/zobo")
const User= require("./../modules/users")
const Notification= require("./../modules/notification")
const Payment= require("./../modules/payment")
const {check,validationResult}=require('express-validator')
const fs = require('fs')




const ZoboController = {
    create,
    getCat,
    validateData,
    userZobos,
    getById,
    getBySlug,
    destroyZobo,
    payment,
    UserTransactions,
    withdraw
}




function validateData(field){
    switch (field) {
        case 'create':
            return [
                check('title').not().isEmpty().withMessage('title must not be empty'),
                // check('type').not().isEmpty(),
            ];
            break;
    
        default:[]
            break;
    }
}
 

 



function getById(req, res) {
    Zobo.findById(req.params.id).exec(function (err, zobo) {
        if (zobo) {
            res.status(200).json({
                zobo
            })
        } else {
            res.status(400).json({
                err
            })
        }
    })
}


function getBySlug(req, res) {
    Zobo.findOne({slug:req.params.slug}).exec(function (err, zobo) {
        if (zobo) {
            res.status(200).json({
                zobo
            })
        } else {
            res.status(400).json({
                err
            })
        }
    })
}

function getCat(req, res, next) {
    ZoboCat.find({}).sort({ createdAt: -1 }).exec(function (err, zobos) {
        res.status(200).json({
            zobos,
        })
    })
}

function createSlug(text) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}



function create(req,res){
    let title="Buy me " + req.body.title;
    let description=req.body.description;
    let type=req.body.type;
    let cover=req.body.cover;
    let user_id=req.user._id;
    let min=req.body.min;
    let slug=createSlug(title)

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors,
            global:true
        })
    } else{
    var newPost = new Zobo({
        title,
        slug,
        description,
        type,
        user_id,
        cover,
        min
    })

    newPost.link=`${process.env.SERVER_HOST}/zobo/${newPost._id}/${slug}`
    newPost.save().then(() => {
        res.status(200).json({
            success: true,
            msg: "Zobo has been Created"
        })
    }).catch((err) => {
        res.status(400).json({
            error: true,
            msg: "something went wrong,please try again later"
        })

    })
}
}




function userZobos(req, res, next) {
    
    Zobo.find({ user_id: req.user._id }).sort({ createdAt: -1 }).exec(function (err,zobos) {
        res.status(200).json({
            zobos,
        })
    })
}







function unlinkfile(id) {

    return new Promise((resolve) => {
        Zobo.findOne({ _id: id }).exec(function (err, zobo) {
            if (zobo) {
                if (zobo.cover) {
                    let coverArray=zobo.cover.split('/')
                    let filename=coverArray[coverArray.length-1];   
                    fs.unlink(`./public/images/${filename}`, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                resolve(true)
            }
        })
    })
}


function destroyZobo(req, res) {
    unlinkfile(req.params.id).then(() => {
        Zobo.remove({ _id:req.params.id}, function (err) {
            if (err) {
                res.states(401).json({
                    error: true,
                    msg: "something went wrong,please try again later"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    msg: "Zobo Deleted"
                })
            }        
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({
            success: false,
            msg: "Opps,something went wrong please try again later"
        })
    })
  })
}



function payment(req,res){
    let status=['success','fail','success','success','success','fail'];
    let num=Math.round(Math.random()*status.length-1);
    switch (status[num]) {
        case 'success':
           return saveTranzaction(req,res)
            break;
        case 'fail':
            return tranzactionFail(res)
            break;
        default:'pending'
            break;
    }

    
}


function saveTranzaction(req,res){

    let amount=req.body.amount;
    let zobo_id=req.body.zobo_id;
    let owner_id=req.body.user_id;
    let sender_id=req.user._id;
    let transaction_id=Math.round(Math.random()*10000+new Date().getTime());
    let type='deposit'
    let show=true

    let newPayment=new Payment({
        amount,
        zobo_id,
        owner_id,
        sender_id,
        transaction_id,
        show,
        type
    })


    newPayment.save().then((data,err)=>{
        if (data) {
           updateBenefactor(owner_id,zobo_id,amount,res)
           let notify=new Notification({
               type:'payment',
               sender:sender_id,
               recipient:owner_id
           })
           notify.save().then((data,err)=>{
               console.log('====================================');
               console.log("sending email......");
               console.log('====================================');
           })
        }else{
            console.log(err);
            
            res.status(400).json({
                error: true,
                msg: "something went wrong,please try again later"
            })
        }
        
    })
}

async function updateBenefactor(owner_id,zobo_id,amount,res){
  try{
    await  User.update({_id:owner_id},{$inc:{balance:amount}}).exec() 
    await  Zobo.update({_id:zobo_id},{$inc:{balance:amount}}).exec()

    res.status(200).json({
        success:true,
        msg:'tranzaction successfull'
    })

  }catch(err){
    res.status(400).json({
        error: true,
        err,
        msg: "something went wrong,please try again later"
    })
  } 

}

function tranzactionFail(res){
    res.status(400).json({
        error: true,
        msg: "tranzaction fail"
    })
}


function UserTransactions(req,res) {
    Payment.find({sender_id:req.user._id}).exec(function (err,transactions) {  
        console.log('====================================');
        console.log(req.user._id);
        console.log('====================================');
        if (transactions) {
            res.status(200).json({
                success:true,
                transactions
            })
        }else{
            console.log(err)
        }
    })
  }



  function withdraw(req,res){
    let status=['success','fail','success','success','success','fail'];
    let num=Math.round(Math.random()*status.length-1);
    switch (status[num]) {
        case 'success':
           return withdrawHandle(req,res)
            break;
        case 'fail':
            return withdrawFail(res)
            break;
        default:'pending'
            break;
    }
  }

function withdrawHandle(req,res){
    let amount = req.body.amount
    let owner_id=req.user._id
    User.update({_id:owner_id},{$inc:{balance:-amount}}).exec(function(err,user){
        if (user) {
            res.status(200).json({
                success:true,
            })
        }else{
            console.log('====================================');
            console.log(err);
            console.log('====================================');
            res.status(400).json({
                error: true,
                msg: "tranzaction fail"
            })
        }
    }) 
}


function withdrawFail(res) {
    res.status(400).json({
        error: true,
        msg: "tranzaction fail"
    })
}

module.exports = ZoboController