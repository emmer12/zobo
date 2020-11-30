var express = require('express');
var router = express.Router();
const multer = require('multer');


var UserController = require('./../../controllers/UserController')
var FollowController = require('./../../controllers/FollowController')

var middleware = require('./../../middleware/auth');

var storage=multer.diskStorage({
    destination:'./public/images',
    filename:function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now()+file.originalname);
    }
  });





router.get('/user',middleware.authenticate,UserController.getUser)

router.get('/z/:username',UserController.getByUsername)


router.post('/update',middleware.authenticate,UserController.updateProfile)


router.post('/follow',middleware.authenticate,FollowController.follow)


router.post('/unfollow',middleware.authenticate,FollowController.unFollow)



router.post('/send-email',middleware.authenticate,UserController.sendMail)

router.post('/resend-verify-email',middleware.authenticate,UserController.resendVerifyMail)

router.post('/add-special',middleware.authenticate,UserController.addSpecial)

router.delete('/delete-special/:id',middleware.authenticate,UserController.deleteSpecial)

router.get('/get-follow',middleware.authenticate,FollowController.getfollow)

router.get('/get-profile-follow/:uid',FollowController.getProfollow)

router.get('/get-currency',UserController.getCurrency)

router.get('/get-other-user',middleware.authenticate,UserController.getOtherUser)

router.patch('/set-currency',middleware.authenticate,UserController.setCurrency)

router.get('/get-searched-user',UserController.searchCelebs)

var upload=multer({storage:storage,limits:{fileSize:2000000}}).single('file');
router.post('/upload-file',middleware.authenticate,function(req,res,next){
    upload(req,res,function(err){
        if (err) {
          res.status(400).json({
            success:false,
            msg:[{msg:"The maximum upload file size is 5MB"}]
          })
        }else{
          if (req.file.filename==null) {
              res.status(401).json({
                success:false,
                msg:[{msg:"files empty,please select files to upload"}]
              })
        }else{
            res.status(200).json({
                success:true,
                url:`${process.env.HOST}/images/${req.file.filename}`,
                filename:`${req.file.filename}`
              })
          }
          
        }
      })
})




module.exports = router;
