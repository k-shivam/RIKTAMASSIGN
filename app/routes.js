const express = require('express');

const router = express.Router();

const adminRouter = require('./routes/adminRouter');
const groupRouter = require('./routes/groupRoutes');
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/userRouter');


router.use('/users', adminRouter);
router.use('/users', userRouter);
router.use('/messages', messageRouter);
router.use('/groups', groupRouter);

module.exports = router;
