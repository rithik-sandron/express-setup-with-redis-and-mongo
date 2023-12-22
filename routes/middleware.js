var { appendFile } = require('node:fs');

const requestTime = function (req, res, next) {
    // req.requestTime = Date.now();
    const date = new Date();
    req.requestTime = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}_${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    next()
}

const log = function (req, res, next) {
    appendFile('log.txt', `${req.method}|${req.originalUrl}|${req.ip}|${req.requestTime}\n`, (err) => {
        if (err) throw err;
    });
    next()
}

module.exports = { log, requestTime }