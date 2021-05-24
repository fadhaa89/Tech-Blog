// let router = require('express').Router();
// const {
//     User,
//     Post,
//     Comment
// const withAuth = require('../../utils/auth');
const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');
//  posts to be goten //
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["id", "content", "title", "created_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })

    // .then((dbpostData) => res.json(dbpostData))
    // .catch((error) =< {
    //     console.log(err);
    //     res.status(404).json(error);
    // });


    .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });
    // in order to Get a single post //
   //router.get("/:id", (req, res)
   router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// ----------------Create a post------------------//
router.post("/", withAuth, (req, res) => {
    console.log("creating");
    Post.create({
            title: req.body.title,
            content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//////////----------update --------------////////
//   Post.update //// 
router.put("/:id", withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//--------------------------Delete a post-------------------------///
// router.delete("/:id", withAuth, (req, res) => {
//     Post.destroy({
//             where: {
//                 id: req.params.id,
//             },
//         })
// .catch((err) => {
//     console.log(err);
//     res.status(500).json(err);
// });
// });
//module.exports = router;





router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;