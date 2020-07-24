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

router.get('/:username',UserController.getByUsername)


router.post('/update',middleware.authenticate,UserController.updateProfile)


router.post('/follow',middleware.authenticate,FollowController.follow)


router.post('/unfollow',middleware.authenticate,FollowController.unFollow)



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
