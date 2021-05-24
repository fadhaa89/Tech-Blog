// let router = require('express').Router();
// let sequelize = require('../config/connection');
// let withAuth = require('../utils/auth');

const router = require('express').Router();
//sequelize //
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');

//withAuth = require('../utils/auth');
const withAuth = require('../utils/auth');

//----findAll --------------///
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', {
                posts,
                loggedIn: true
            });
        })


        // .catch(error => {
        //     console.log(error);
        //     res.status(404).json(error);
        // });



        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//router.get('/edit/:id', withAuth, (req, res);
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

//-------------------****------------------------///
// .then(dbPostData => {
//     if (!dbPostData) {
//         res.status(505).json({
//             message: 'No post found with this id'
//         });
//         return;
//     }


        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found!'
                });
                return;
            }

            const post = dbPostData.get({
                plain: true
            });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
/////////////---loggeedin---//////////////
router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
})

module.exports = router;