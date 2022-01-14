// utils/logger.js
const winston = require('winston');


// const logger = winston.createLogger({
//     level: 'info',
//     transports: [
//         new winston.transports.Console()
//     ]
// })



const myFormat = winston.format.printf(({
    message,
    level,
    timestamp,
    stack,
    ...meta
}) => {
    let obj;

    for (let key in meta) {
        if (!obj) {
            obj = {}
        }
        obj[key] = meta[key];
    }
    return `${timestamp} [${level}]: ${message} ${obj?'\n\t'+ JSON.stringify(obj):''} ${stack?'\n'+stack:''}`;
});


const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: 'logs/log.log',
            format: winston.format.combine(
                winston.format.errors({
                    stack: true
                }),
                winston.format.timestamp(),
                winston.format.json(),
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.errors({
                    stack: true
                }),
                winston.format.timestamp({
                    format: 'Do MMM, YYYY hh:mm:ss a Z'
                }),
                myFormat,
            )
        })
    ]
})

module.exports = logger