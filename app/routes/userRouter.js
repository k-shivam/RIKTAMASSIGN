const express = require('express');

const {login, getAllUsers, logout} = require('../controllers/userController');
const {authRoutes} = require('../middlewares/adminMiddleware');

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.get('/', authRoutes, getAllUsers);
userRouter.post('/logout', authRoutes, logout);

module.exports = userRouter;
