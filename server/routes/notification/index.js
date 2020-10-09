var express = require('express');
var router = express.Router();


var NotificationController = require('./../../controllers/NotificationController')

var middleware = require('./../../middleware/auth');




router.get('/get',middleware.authenticate,NotificationController.getNotifications)

router.get('/get-all',middleware.authenticate,NotificationController.getAllNotifications)


router.post('/mark-as-read',middleware.authenticate,NotificationController.markAsRead)







module.exports = router;
