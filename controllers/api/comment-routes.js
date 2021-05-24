const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
//let wirhAuth=require
const withAuth = require('../../utils/auth');


//*************Get comments*****************//
router.get("/", (req, res) => {
    Comment.findAll()
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//-------------- comment to be created-----------------//
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })


            //  .then(dbcommentData => res.json(dbCommentData))
    //         .catch(error => {
    //             console.log(error);
    //             res.status(400).json(error);
    //         });
    // }


            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});


module.exports = router;