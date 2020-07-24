var express = require('express');
var router = express.Router();


var NotificationController = require('./../../controllers/NotificationController')

var middleware = require('./../../middleware/auth');




router.get('/get',middleware.authenticate,NotificationController.getNotifications)







module.exports = router;
