const logger = require('../logger');

const routeLogger = (req, res, next) =>{
    const path = req.path;
    const method = req.method;
    const response = res.status
    logger.info(`called ${path} with ${method} method ...`)
    next();
}

module.exports = {
    routeLogger
}
