const { transports, File, format, createLogger } = require("winston");
const logConfiguration = {
  transports: [
    new transports.File({
      filename: "logs/example.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) =>
            `${info.level}: ${[info.timestamp]}: Data : ${info.message}`
        )
      ),
    }),
  ],
};
const logger = createLogger(logConfiguration);
module.exports = logger;
