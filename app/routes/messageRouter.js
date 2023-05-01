const express = require('express');

const {authRoutes} = require('../middlewares/adminMiddleware');
const {sendMessage, likeMessages} = require('../controllers/groupMessageController');

const messageRouter = express.Router();

messageRouter.post('/:groupId', authRoutes, sendMessage);
messageRouter.post('/:groupId/:messageId/like', authRoutes, likeMessages);

module.exports = messageRouter;
