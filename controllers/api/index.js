const router = require('express').Router();
//let userRoutes = require('./user-routes.js');
// let  postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
// const router.use('/comments', commentRoutes)
//const router.use('/posts', postRoutes);
//const router.use('/posts', postRoutes);

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports = router;