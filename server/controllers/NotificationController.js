const Notification= require("../modules/notification")




const NotificationController = {
    getNotifications,   
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





module.exports = NotificationController