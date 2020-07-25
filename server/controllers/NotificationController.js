const Notification= require("../modules/notification")




const NotificationController = {
    getNotifications,   
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
            msg:"You have no notifications"
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