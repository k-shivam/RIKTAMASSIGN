const express = require('express');

const {authRoutes} = require('../middlewares/adminMiddleware');
const { createGroup, deleteGroup, searchGroup, addMembers } = require('../controllers/groupController');

const groupRouter = express.Router();

groupRouter.post('/create', authRoutes, createGroup);
groupRouter.delete('/:groupId', authRoutes, deleteGroup);
groupRouter.get('/:groupId', searchGroup);
groupRouter.get('/', searchGroup);
groupRouter.post('/:groupId/addmembers', authRoutes,addMembers);

module.exports = groupRouter;
