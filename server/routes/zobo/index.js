var express = require('express');
var router = express.Router();
const multer = require('multer');


var ZoboController = require('./../../controllers/ZoboController')

var middleware = require('./../../middleware/auth');

var storage=multer.diskStorage({
    destination:'./public/images',
    filename:function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now()+file.originalname);
    }
  });



router.post('/create',middleware.authenticate,ZoboController.validateData('create'),ZoboController.create)

router.patch('/update',middleware.authenticate,ZoboController.validateData('create'),ZoboController.update)

router.get('/get-zobo-cat',middleware.authenticate,ZoboController.getCat)


router.get('/get-my-zobos',middleware.authenticate,ZoboController.userZobos)

router.get('/verify-test',ZoboController.verifyTest)

router.get('/get-by-id/:id',middleware.authenticate,ZoboController.getById)

router.get('/get-by-id-visitor/:id',ZoboController.getById)

router.get('/get-by-slug/:slug',ZoboController.getBySlug)

router.get('/my/transactions',middleware.authenticate,ZoboController.UserTransactions)


router.post('/my/withdraw',middleware.authenticate,ZoboController.withdraw)

router.delete('/remove/:id',middleware.authenticate,ZoboController.destroyZobo)



router.get('/yielded/:zoboId',middleware.authenticate,ZoboController.yieldedZobo)


router.get('/feeds',middleware.authenticate,ZoboController.getAllFeeds)


router.get('/get-celep-limit/',ZoboController.getCelepLimit)

router.get('/get-celep-all/',ZoboController.getCelepAll)




router.post('/payment',middleware.authenticate,ZoboController.payment)





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
