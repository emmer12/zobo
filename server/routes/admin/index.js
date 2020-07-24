var express = require('express');
var router = express.Router();
const multer = require('multer');

var img_storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now()+file.originalname);
    }
  });

// var RegisterController = require('../../controllers/auth/RegisterController')
// var LoginController = require('../../controllers/auth/LoginController')
// var UserController = require('../../controllers/UserController')

var FeedsController = require('./../../../controllers/tunner/FeedsController')
var UserController = require('./../../../controllers/tunner/UserController')
var CategoryController = require('./../../../controllers/tunner/CategoryController')
var FollowController = require('./../../../controllers/tunner/FollowController')



var middleware = require('./../../../middleware/auth');








router.get('/feeds', FeedsController.allFeeds);

router.get('/user/:id',UserController.getUser);

router.get('/feeds/response/:id', FeedsController.allFeedResponse);

router.get('/userfeeds',middleware.authenticate,FeedsController.userFeeds);


router.get('/userfeeds/:id',FeedsController.userFeedsById);


router.get('/user/rate/:id',UserController.getRating);

router.get('/feeds/get-post-by-slug/:slug',FeedsController.FeedBySlug);

router.get('/user',middleware.authenticate,UserController.user);


router.get('/user/follow/:uid',FollowController.getfollow);





router.get('/all-users',UserController.getUsers);

router.get('/search',UserController.search);



 



router.get('/user/confirmation/:token',UserController.confirmUser);

router.post('/request-password-reset',UserController.requestPasswordReset);




router.get('/pasword-reset-verify/:token',UserController.confirmPasswordReset);



router.post('/password-reset',UserController.passwordReset);

router.post('/user/follow',middleware.authenticate,FollowController.follow);
router.post('/user/unfollow',middleware.authenticate,FollowController.unFollow);


var upload=multer({storage:img_storage,limits:{fileSize:5000000}}).fields([{name:'display'},{name:'video'}])
var uploadResponse=multer({storage:img_storage,limits:{fileSize:5000000}}).single('video');
var uploadProfile=multer({storage:img_storage,limits:{fileSize:2000000}}).single('profile_image');

router.get('/feed/follower-feeds',middleware.authenticate,FeedsController.followerFeeds);



router.post('/feed/update-views', FeedsController.updateFeedsViews);


router.post('/feed/create',middleware.authenticate,function(req,res,next){
  upload(req,res,function(err){
    if (err) {
      res.status(400).json({
        success:false,
        msg:[{msg:"The maximum upload file size is 5MB"}]
      })
    }else{
      if (req.files.display==null || req.files.video==null) {
        console.log(req.files);
        
          res.status(401).json({
            success:false,
            msg:[{msg:"files empty,please select files to upload"}]
          })
    }else{
      next()
      }
      
    }
  })
},FeedsController.create);


router.post('/upload-profile-image',middleware.authenticate,function(req,res,next){
  uploadProfile(req,res,function(err){
    if (err) {
      res.status(400).json({
        success:false,
        msg:err
      })
    }
    next()
  })
},UserController.updateProfilePic);




router.post('/feed/response',middleware.authenticate,function(req,res,next){
  uploadResponse(req,res,function(err){
    if (err) {
      res.status(400).json({
        success:false,
        msg:err
      })
    }else{
      if (req.file==undefined) {
          res.status(401).json({
            success:false,
            msg:[{msg:"files empty,please select files to upload"}]
          })
    }else{
      next()
      }
      
    }
  })
},FeedsController.response);

// create new feeds
router.delete('/feed/destroy', FeedsController.destroy);


// like and unlike
router.post('/feed/like',middleware.authenticate, FeedsController.likeFeed);
router.post('/feed/unlike',middleware.authenticate, FeedsController.unlikeFeed);


router.delete('/delete-feeds',middleware.authenticate, FeedsController.destroyFeeds);


router.delete('/user-remove',UserController.remove);

// create new user
router.post('/user/create', UserController.create);




router.post('/user/rate-user', UserController.rateUser);


// login user
router.post('/user/login', UserController.login);

// update prodile
router.post('/update-profile',middleware.authenticate,UserController.updateProfile);


// category 

router.get('/categories', CategoryController.getCategory);



router.post('/comment',FeedsController.comments);



// router.post('/register', RegisterController.register);
// router.post('/login', LoginController.login);

// router.post('/newpost', PostController.create);


// router.get('/protected', middleware.authenticate, PostController.allPost);


// router.get('/paginate', PostController.allPostPaginate);



module.exports = router;
