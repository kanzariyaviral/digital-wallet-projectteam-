const winston = require('winston');
const{transports,File}=require('winston')
const logConfiguration = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};

const logger = winston.createLogger(logConfiguration);
module.exports=logger