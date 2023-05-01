const express = require('express');

const {addUser, editUser } = require('../controllers/adminController');
const { authenticateRoutes } = require('../middlewares/adminMiddleware');

const adminRouter = express.Router();

adminRouter.post('/addUser', authenticateRoutes, addUser);
adminRouter.put('/editUser', authenticateRoutes, editUser);

module.exports = adminRouter;
