const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const logger = require('./logger');
const { PORT, MONGO_URI } = require('./settings');
const {routeLogger} = require('./middlewares/loggerMiddleware')

const router = require('./routes');

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect(MONGO_URI);
const con = mongoose.connection

con.on('open', () =>{
    console.log('connected...')
})

app.use(routeLogger);
app.use('/', router)


app.listen(PORT, () =>{
    logger.info(`Server started at port ${PORT}`)
})
