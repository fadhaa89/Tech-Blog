  
// let router = require('express').Router();
// const {
//     User,
//     Post,
//     Comment
// } = require;
const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
//----get all users ---///
// router.get
// ('/', (req, res) => {
// //     User.findAll({
//             attributes: {
//                 [password']
//             }
//         })
//         .then(dbUserData => res.json(dbUserData))
//         .catch(err => {
//             res.status(404).json(err);
//         });
// });
router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//-------------- Get specific user------------//
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a user//
router.post('/', (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password
        })

        // .then(dbUserData => {
        //     req.session() => {
            //consloe.log ()
        //         req.session.user_id = dbUserData.id;
        //         req.session.username = dbUserData.username;
        //         req.session.loggedIn = true;



        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })

        // catch(error => {
        //     console.log(error);
        //     res.status(404).json(errpr)
        // }),



        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({
                    message: 'No user with that username is found!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: dbUserData,
                    message: 'You are logged in!'
                });
            });
//checkPassword//
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'password is Incorrect !'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: dbUserData,
                    message: 'You are now logged in!'
                });
            });
        });
});

// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(204).end();


/////////////////////-router.post (login)////////////////
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

});

module.exports = router

