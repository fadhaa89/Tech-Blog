const router = require('express').Router();
const apiRoutes = require('./api');
// let apiRoutes = require('./api');
//let  homeRoutes = require;
//let dashBoardRoutes = require;
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
//////////////////////---api------------/////////////////
//router.use('/api';apiroutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
//router.use(dashBoard, dashboardRoutes);
router.use('/', homeRoutes);

/////////--req,res--///////
router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;