const User = require("./../modules/users")
const Following = require("./../modules/following")
const Follower = require("./../modules/follower")



const FeedsController = {
    follow,
    unFollow,
    getfollow
}

async function follow(req, res) {
    try {
        await Following.findOne({ user_id: req.user._id }, async function (err, user) {
            if (user) {
                await Following.update({ user_id: req.user._id }, { $push: { 'following_id': req.body.fuid } }).exec()
            } else {
                let newFollown = new Following()
                newFollown.following_id.push(req.body.fuid)
                newFollown.user_id = req.user._id
                newFollown.save()
            }
        })
        await Follower.findOne({ user_id: req.body.fuid }, async function (err, userIn) {
            if (userIn) {
               await Follower.update({ user_id: req.body.fuid }, { $push: { 'follower_id': req.user._id } }).exec()
            } else {
                let newFollower = new Follower()
                newFollower.follower_id.push(req.user._id)
                newFollower.user_id = req.body.fuid
                newFollower.save()
            }
        })

        res.status(200).json({
            success: true,
            msg: "Followed"
        })
    } catch (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        res.status(400).json({
            success: false,
            msg: "Opps, something went wrong please try again later"
        })
    }
} 


function unFollow(req, res) {
    Following.findOne({ user_id: req.user._id }, function (err, user) {
        if (user) {
            Following.update({ user_id: req.user._id }, { $pull: { 'following_id': req.body.fuid } }).exec()
        } else {
         console.log("opps something went wrong");
         
        }
    })
    Follower.findOne({ user_id: req.body.fuid }, function (err, userIn) {
        if (userIn) {
            Follower.update({ user_id: req.body.fuid }, { $pull: { 'follower_id': req.user._id } }).exec()
        } else {
            console.log("opps something went wrong");
        }
    }).then(() => {
        res.status(200).json({
            success: true,
            msg: "unFollowed"
        })
    })
} 


function getfollow(req, res) {
    console.log(req.params.uid);
    
    Followed.find({ user_id: req.params.uid }).exec(function (err, followby) {
        Following.find({ user_id: req.params.uid }).exec(function (err, following) {
            res.status(200).json({
                followby,
                following
            })
        })
    })

}

// function unFollows(req, res) {
//     console.log(req.body.post_id);
//     Like.remove({ user_id: req.user.id, feed_id: req.body.post_id }, function (err, data) {
//         if (err) {
//             console.log(err);
//         }
//         Feed.findByIdAndUpdate(req.body.post_id, { $pull: { 'like_id': req.user._id } }).exec(function (err, data) {
//             res.status(200).json({
//                 success: true,
//                 msg: "UnLiked"
//             })
//         })

//     })
// }



module.exports = FeedsController