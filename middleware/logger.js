const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), "dd-MM-yyyy\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    const logFolder = path.join(__dirname, "..", "logs");

    try {
        if (!fs.existsSync(logFolder)) {
            await fsPromises.mkdir(logFolder);
        }
        await fsPromises.appendFile(path.join(logFolder, logFileName), logItem);
    } catch (error) {
        console.log(error);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logEvents, logger };
