const ZoboCat = require("./../modules/zoboCat")
const Zobo = require("./../modules/zobo")
const User = require("./../modules/users")
const Notification = require("./../modules/notification")
const Payment = require("./../modules/payment")
const { check, validationResult } = require('express-validator')
const fs = require('fs')
const TransactionController = require('./Auth/TransactionController')
const Follower = require("./../modules/follower")
const https = require('https')
let PayStack = require('paystack-node')
let APIKEY = 'pk_test_9a79054f46776dddee3854e7f2d75fc3dc341353'
const environment = process.env.NODE_ENV



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
    withdraw,
    yieldedZobo,
    verifyTest

}

function validateData(field) {
    switch (field) {
        case 'create':
            return [
                check('title').not().isEmpty().withMessage('title must not be empty'),
                // check('type').not().isEmpty(),
            ];
            break;

        default: []
            break;
    }
}






function getById(req, res) {
    Zobo.findById(req.params.id).populate('user_id', '_id firstname profile_image lastname email username').exec(function (err, zobo) {
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
    Zobo.findOne({ slug: req.params.slug }).populate('user_id', '_id firstname profile_image lastname email username').exec(function (err, zobo) {
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



async function create(req, res) {
    let title = req.body.title;
    let description = req.body.description;
    let type = req.body.type;
    let cover = req.body.cover;
    let celep = req.body.celep;
    let user_id = req.user._id;
    let min = req.body.min;
    let currency = req.user.currency;
    let slug = createSlug(title)
    let follower = await Follower.findOne({ user_id: user_id }).exec()

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            error: true,
            errors,
            global: true
        })
    } else {
        var newPost = new Zobo({
            title,
            celep,
            slug,
            description,
            type,
            user_id,
            cover,
            min,
            currency
        })

        newPost.link = `${process.env.SERVER_HOST}/zobo/${newPost._id}/${slug}`
        newPost.save().then(() => {
            follower && notifyUsers(follower.follower_id, 'z-created', user_id)
            res.status(200).json({
                success: true,
                msg: "Zobo has been Created"
            })
        }).catch((err) => {
            res.status(400).json({
                error: err,
                msg: "something went wrong,please try again later"
            })

        })
    }
}

function notifyUsers(ids, type, sender) {
    if (!ids.length) return
    for (let index = 0; index < ids.length; index++) {
        let notify = new Notification({
            type: type,
            sender: sender,
            recipient: ids[index]
        })
        notify.save().then((data, err) => {
            console.log('====================================');
            console.log("sending email......");
            console.log('====================================');
        })
    }
}



function userZobos(req, res, next) {

    Zobo.find({ user_id: req.user._id }).sort({ createdAt: -1 }).exec(function (err, zobos) {
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
                    let coverArray = zobo.cover.split('/')
                    let filename = coverArray[coverArray.length - 1];
                    if (['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'].includes(filename)) {
                      resolve(true)   
                    }else{
                        
                        fs.unlink(`./public/images/${filename}`, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                    }
                }
                resolve(true)
            }
        })
    })
}


function destroyZobo(req, res) {
    unlinkfile(req.params.id).then(() => {
        Zobo.remove({ _id: req.params.id }, function (err) {
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
        }).catch((err) => {
            console.log(err);
            res.status(400).json({
                success: false,
                msg: "Opps,something went wrong please try again later"
            })
        })
    })
}



function payment(req, res) {
    let status = ['success', 'fail', 'success', 'success', 'success', 'fail'];
    let num = Math.round(Math.random() * status.length - 1);
    switch (status[num]) {
        case 'success':
            return saveTranzaction(req, res)
            break;
        case 'fail':
            return tranzactionFail(res)
            break;
        default: 'pending'
            break;
    }
}

// UM2L2BgeZ5

function verifyTest(req, res) { 
  

}

function hCallback(resp) {  
        let data = ''
        resp.on('data', (chunk) => {
            data += chunk
        });
        resp.on('end', ()=> {
             if (JSON.parse(data).status == false) {
                 console.log('no transacsion found');
                 
             }else{
                 console.log('good');
                 
             }
           
        }).on('error', error => {
            console.log(error);
             

    })
    
}




function saveTranzaction(req, res) {

    let amount = req.body.amount;
    let zobo_id = req.body.zobo_id;
    let owner_id = req.body.user_id;
    let sender_id = req.user._id;
    let msg = req.body.msg;
    // let transaction_id=Math.round(Math.random()*10000+new Date().getTime());
    let type = 'deposit'
    let show = req.body.show;
    let status = req.body.details.status;
    let transaction_id = req.body.details.transaction;
    let reference = req.body.details.trxref;
    let newPayment = new Payment({
        amount,
        msg,
        zobo_id,
        owner_id,
        sender_id,
        transaction_id,
        show,
        type,
        status,
        reference
    })
    "UM2L2BgeZ5"
        TransactionController.verifyPayment('UM2L2BgeZ5',(resp)=>{
            let data = ''
        resp.on('data', (chunk) => {
            data += chunk
        });
        resp.on('end', ()=> {
             if (JSON.parse(data).status == false) {
                 res.status(400).json({
                    err: error,
                    msg: "Transaction not found"
                })
                 
             }else{
                newPayment.save().then((data, err) => {
                    if (data) {
                        updateBenefactor(owner_id, zobo_id, amount, res)
                        let notify = new Notification({
                            type: 'payment',
                            sender: sender_id,
                            recipient: owner_id
                        })
                        notify.save().then((data, err) => {
                            console.log('====================================');
                            console.log("sending email......");
                            console.log('====================================');
                        })
                    } else {
                        console.log(err);
        
                        res.status(400).json({
                            error: true,
                            msg: "something went wrong,please try again later"
                        })
                    }
            }).catch(function (error) {
                res.status(400).json({
                    err: error,
                    msg: "Tranzaction failed"
                })
            })
                 
             }
           
        }).on('error', error => {
            console.log(error);
             

    })
        })   
   
       
}

async function updateBenefactor(owner_id, zobo_id, amount, res) {
    try {
        await User.update({ _id: owner_id }, { $inc: { balance: amount } }).exec()
        await Zobo.update({ _id: zobo_id }, { $inc: { balance: amount } }).exec()

        res.status(200).json({
            success: true,
            msg: 'tranzaction successfull'
        })

    } catch (err) {
        res.status(400).json({
            error: true,
            err,
            msg: "something went wrong,please try again later"
        })
    }

}

function tranzactionFail(res) {
    res.status(400).json({
        error: true,
        msg: "tranzaction fail"
    })
}


function UserTransactions(req, res) {
    Payment.find({ sender_id: req.user._id }).sort({ createdAt: -1 }).exec(function (err, transactions) {
        console.log('====================================');
        console.log(req.user._id);
        console.log('====================================');
        if (transactions) {
            res.status(200).json({
                success: true,
                transactions
            })
        } else {
            console.log(err)
        }
    })
}



function withdraw(req, res) {
    // let status=['success','fail','success','success','success','fail'];
    // let num=Math.round(Math.random()*status.length-1);

    //**** Customer Fetch */
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/customer/emmer2@gmail.com',
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_test_f95cf6515fb76187eb141a0777fd476eb987b76e'
        }
    }
    let reqs = https.request(options, resp => {
        let data = ''
        resp.on('data', (chunk) => {
            data += chunk
        });
        resp.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })

    reqs.end()

    //***** Transfer to customer   *****//
    // const params = JSON.stringify({
    //     "source": "balance", 
    //     "reason": "Calm down", 
    //     "amount":100000, 
    //     "recipient": "CUS_9nni3zhb7asq5tl"
    //   })

    //   const options = {
    //     hostname: 'api.paystack.co',
    //     port: 443,
    //     path: '/transfer',
    //     method: 'POST',
    //     headers: {
    //       Authorization: 'Bearer sk_test_f95cf6515fb76187eb141a0777fd476eb987b76e',
    //       'Content-Type': 'application/json'
    //     }
    //   }

    //   const reqs = https.request(options, resp => {
    //     let data = ''
    //     resp.on('data', (chunk) => {
    //       data += chunk
    //     });
    //     resp.on('end', () => {
    //       console.log(JSON.parse(data))
    //     })
    //   }).on('error', error => {
    //     console.error(error)
    //   })
    //   reqs.write(params)
    //   reqs.end()



    // switch (status[num]) {
    //     case 'success':
    //        return withdrawHandle(req,res)
    //         break;
    //     case 'fail':
    //         return withdrawFail(res)
    //         break;
    //     default:'pending'
    //         break;
    // }
}

function withdrawHandle(req, res) {
    let amount = req.body.amount
    let owner_id = req.user._id
    User.update({ _id: owner_id }, { $inc: { balance: -amount } }).exec(function (err, user) {
        if (user) {
            res.status(200).json({
                success: true,
            })
        } else {
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




function yieldedZobo(req, res) {
    let user_id = req.user._id;
    let zobo_id = req.params.zoboId;
    Payment.find({ owner_id: user_id, type: 'deposit', zobo_id: zobo_id }).sort({ createdAt: -1 }).populate('sender_id').exec(function (err, yielded) {
        res.status(200).json({
            yielded
        })
    })
}

module.exports = ZoboController