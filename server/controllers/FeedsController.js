const multer = require('multer');
const Feed = require("./../../modules/tunner/feeds")
const Like = require("./../../modules/tunner/likes")
const FeedResponse = require("./../../modules/tunner/challengesResponse")
const Following = require("./../../modules/tunner/following")
const fs = require('fs')

/**

   -------------------------------------
     ++++++> CONFIG  ['muter'] <++++++++
   -------------------------------------

**/



const FeedsController = {
    allFeeds,
    userFeeds,
    create,
    destroy,
    destroyFeeds,
    likeFeed,
    unlikeFeed,
    unprotectedPost,
    allPostPaginate,
    FeedBySlug,
    response,
    allFeedResponse,
    userFeedsById,
    followerFeeds,
    updateFeedsViews,
    comments
}

async function updateFeedsViews(req,res){
    await Feed.update({slug:req.body.slug},{$inc:{views:1}}).exec((err,feed)=>{
        err ?  res.status(401).json({
            error: true,
            msg: "something went wrong,please try again later"
        })

        :

        res.status(200).json({
            success: true,
        })
    })
}


function comments(req,res){
    let comment=req.body.comment;
    let id=req.user.id
    let postId=req.body.postId

    let newComment=new Comment();
    newComment.comment=comment,
    newComment.fromId=id,
    newComment.postId=postId

    newComment.save().then(comment=>{
        res.status(200).json({
            success:true,
            msg:"commnet posted"
        })
    })

}

async function getFollower(req,res){
          await Following.findOne({ user_id: req.user._id }).exec(function (err, data) {
              if (data) {
                Feed.find({user_id:{$in:data.following_id}}).populate('user_id').exec((err,feeds)=>{
                    res.status(200).json({
                        feeds
                    })
                })      
              }else{
                res.status(200).json({
                    feeds:[]
                })
                
              }
       })
        
}

function createSlug(text) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

async function allFeeds(req, res, next) {
   var limit = parseInt(req.query.limit)
   let count=await Feed.count().exec() 
   await Feed.find({}).sort({ createdAt: -1 }).populate('user_id').limit(limit).exec(function (err, feeds) {        
        res.status(200).json({
            feeds,
            exhusted:count < limit ? true : false 
        })
    })
}


function followerFeeds(req,res){
    getFollower(req,res);
}



function allFeedResponse(req, res, next) {
    FeedResponse.find({feed_id:req.params.id}).sort({ createdAt: -1 }).populate('user_id').exec(function (err, feedResponse) {        
        console.log('====================================');
        console.log(feedResponse,req.params.id);
        console.log('====================================');
        res.status(200).json({
            feedResponse,
        })
    })
}

function userFeedsById(req,res){
    Feed.find({user_id: req.params.id}).sort({ createdAt: -1 }).exec(function (err, posts) {
        res.status(200).json({
            posts,
        })
    })
}


function userFeeds(req, res, next) {
    Feed.find({ user_id: req.user._id }).sort({ createdAt: -1 }).exec(function (err, posts) {
        res.status(200).json({
            posts,
        })
    })
}

function FeedBySlug(req, res, next) {
    
    Feed.findOne({ slug: req.params.slug }).populate('user_id').exec(function (err,feed) {
        if (feed) {
            res.status(200).json({
                feed,
            })
        }else{
            res.status(400).json({
                err,
          })
        }
    })
}

async function allPostPaginate(req, res, next) {

    var paginate = {}

    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)

    let startingIndex = (page - 1) * limit;
    let endIndex = page * limit


    if (endIndex < await Post.count().exec()) {
        paginate.nextPage = {
            nextPage: page + 1,
        }
    }
    if (page > 1) {
        paginate.prevPage = {
            prevPage: page - 1,
        }

    }

    try {
        let result = await Feed.find().limit(limit).skip(startingIndex).exec()
        paginate.result = result
        console.log(paginate);
    } catch (err) {
        console.log(err);
    }









    // return (req,res,next)=>{
    // console.log(req.query.limit);
    res.status(200).json({
        resp: paginate
    })
    // }
}


function unprotectedPost(req, res, next) {
    Post.find({}, function (err, posts) {
        res.status(200).json({
            posts
        })
    })
}


function paginate(req, res, next) {

    var page = req.query.page;
    var limit = req.query.limit;


    var startIndex = (page - 1) * limit;
    var endIndex = page * limit


    // let result=data.splice(startIndex,endIndex);
    console.log(limit);

}


function create(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const tags = req.body.tags;
    const display = req.files.display[0].filename
    const videoUrl = req.files.video[0].filename
    const user_id = req.user._id
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('category', 'category is required').notEmpty();




    console.log(req.body);

    

    let error = req.validationErrors();

    if (error) {
        res.status(400).json({
            error: true,
            msg: error
        })
    } else {
        var newPost = new Feed({
            title,
            slug: createSlug(title),
            description,
            category,
            tags:tags.split(','),
            display,
            videoUrl,
            user_id
        })

        // fs.move('./public/uploads/'+videoUrl,'./public/uploads/videos/')


        // fs.move('./public/uploads/'+display,'./public/uploads/images/')


        newPost.save().then(() => {
            console.log('saved');

            res.status(200).json({
                success: true,
                msg: "post Created"
            })
        }).catch((err) => {
            console.log(err);

            res.status(400).json({
                error: true,
                msg: "something went wrong,please try again later"
            })

        })
    }

}


function response(req, res) {
    const comment = req.body.comment;
    const feed_id = req.body.feed_id;
    const user_id = req.user._id;
    const videoUrl = req.file.filename
    req.checkBody('comment', 'comment is required').notEmpty();

    let error = req.validationErrors();

    if (error) {
        res.status(400).json({
            error: true,
            msg: error
        })
    } else {

        var newPost = new FeedResponse({
            comment,
            feed_id,
            user_id,
            videoUrl,
        })

        // fs.move('./public/uploads/'+videoUrl,'./public/uploads/videos/')


        // fs.move('./public/uploads/'+display,'./public/uploads/images/')


        newPost.save().then(() => {
            console.log('saved');

            Feed.findByIdAndUpdate(feed_id,{$push:{'challenge_response_id':user_id}}).exec(function(err,data){
                res.status(200).json({
                    success: true,
                    msg: "post Created"
                })
            })
        }).catch((err) => {
            console.log(err);

            res.status(400).json({
                error: true,
                msg: "something went wrong,please try again later"
            })

        })
    }

}

function destroy(req, res, next) {
    Feed.remove({ _id: req.body.id }, function (err, post) {
        if (err) {
            console.log(err);

            res.states(401).json({
                error: true,
                msg: "something went wrong,please try again later"
            })
        }
        else {
            res.status(200).json({
                success: true,
                msg: "post Destroyed"
            })

        }
    })
}




function unlinkfiles(ids) {

    return new Promise((resolve) => {
        Feed.find({ _id: { $in: ids } }).exec(function (err, posts) {
            if (posts) {
                posts.forEach(function (post) {
                    fs.unlink(`./public/uploads/${post.display}`, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                    fs.unlink(`./public/uploads/${post.videoUrl}`, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })

                })

                resolve(true)

            }
        })
    })
}

function destroyFeeds(req, res, next) {
    unlinkfiles(req.body.ids).then(() => {
        Feed.remove({ _id: {$in:req.body.ids}}, function (err, post) {
    
            if (err) {
                console.log(err);
    
                res.states(401).json({
                    error: true,
                    msg: "something went wrong,please try again later"
                })
            }
            else {
    
                res.status(200).json({
                    success: true,
                    msg: "post Destroyed"
                })
    
            }
        })
        
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({
            success: false,
            msg: "Opps,something went wrong please try again later"
        })
    })
}


function likeFeed(req,res) {
    
    let newLike=new Like({
        user_id:req.user._id,
        feed_id:req.body.post_id
    })
    newLike.save().then(()=>{
        Feed.findByIdAndUpdate(req.body.post_id,{$push:{'like_id':req.user._id}}).exec(function(err,data){
            res.status(200).json({
                success: true,
                msg: "Liked"
            })
        })

    })
}

function unlikeFeed(req,res){
    console.log(req.body.post_id);
    Like.remove({user_id:req.user.id,feed_id:req.body.post_id},function(err,data){
        if (err) {
            console.log(err);
        }
        Feed.findByIdAndUpdate(req.body.post_id,{$pull:{'like_id':req.user._id}}).exec(function(err,data){
            res.status(200).json({
                success: true,
                msg: "UnLiked"
        })
    })
    
    })
}


function update(req, res, next) {
    console.log("updating....");

}



module.exports = FeedsController