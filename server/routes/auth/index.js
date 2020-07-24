var express = require('express');
var router = express.Router();


var AuthController = require('./../../controllers/Auth/AuthController')

var middleware = require('./../../middleware/auth');



router.post('/request-password-reset', AuthController.requestPasswordReset);




router.post('/create',AuthController.validateData('create'),AuthController.create)


router.post('/login',AuthController.validateData('login'),AuthController.login)


router.post('/check-pin',middleware.authenticate,AuthController.checkPin)




// router.get('/pasword-reset-verify/:token',AuthController.confirmPasswordReset);



// router.post('/password-reset',AuthController.passwordReset);






// router.post('/upload-profile-image',middleware.authenticate,function(req,res,next){
//   uploadProfile(req,res,function(err){
//     if (err) {
//       res.status(400).json({
//         success:false,
//         msg:err
//       })
//     }
//     next()
//   })
// },AuthController.updateProfilePic);





module.exports = router;
