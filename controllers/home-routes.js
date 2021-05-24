const router = require('express').Router();
//let sequelize = require ;
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');

//ROUTERget//
router.get('/', (req, res) => {
    Post.findAll({
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
//------------rendering--------------//
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        //        .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });


        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
///-------post--------///
router.get('/post/:id', (req, res) => {
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
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }
//let post = dbPostData.get({
//     plain: true
// });

            const post = dbPostData.get({
                plain: true
            });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//-----------------/login-----------------//
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
//---------render signup---------//
    res.render('signup');
});


router.get('*', (req, res) => {
    /////res.redurect //////////
    res.status(404).send("unable to go there....");
   
})

