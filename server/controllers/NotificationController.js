const Notification= require("../modules/notification")




const NotificationController = {
    getNotifications,  
    getAllNotifications, 
    markAsRead
}

 


function getNotifications(req,res) {
    let id=req.user._id;

    Notification.find({recipient:id,read:false}).exec(function (err,notifications) { 
       if (notifications) {
        res.status(200).json({
            notifications
        })
       }else{
        res.status(400).json({
            error:true,
            msg:"Opps, error has occured"
            })
       }
     })
}


function getAllNotifications(req,res) {
    let id=req.user._id;

    Notification.find({recipient:id}).populate('sender').sort({createdAt:-1}).exec(function (err,notifications) { 
       if (notifications) {
        res.status(200).json({
            notifications
        })
       }else{
        res.status(400).json({
            error:err,
            msg:"Opps, error has occured",
            })
       }
      
     })
}





function markAsRead(req,res) {
    let id=req.user._id;
    Notification.updateMany({recipient:id},{read:true}).exec(function (err,notifications) { 
       if (notifications) {
        res.status(200).json({})
       }else{
        res.status(400).json({
            error:true,
            msg:"Oops, something went wrong"
            })
       }
     })
}





module.exports = NotificationController