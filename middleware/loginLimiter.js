const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15minute
    max: 5, // Limit each IP to 5 login requests per `window` per minute,
    message: {
        message:
            "Too many login attempts from this IP, please try again later after a 60 seconds pause",
    },
    handler: (req, res, next, options) => {
        logEvents(
            `Too many request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
            "errLog.log"
        );
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginLimiter;
