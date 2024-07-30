//const {createLogger,transports,format} = require('winston');

// require('winston-daily-rotate-file');
// const fs = require('fs');
// const path = require('path');

// const env = process.env.NODE_ENV || 'development';
// const logDir = 'C:/GCTI_LOGS';

// // Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

// const dailyRotateFileTransport = new transports.DailyRotateFile({
//   filename: `${logDir}/Chthonic-%DATE%.log`,
//   datePattern: 'YYYY-MM-DD'
// });


// const logger = createLogger({
//     transports:[
//         new transports.File({
//             filename:'info.log',
//             level:'info',
//             format:format.combine(format.timestamp(),format.json()),
//         })
//     ]
// })

//const logger = createLogger({
  //  // change level if in dev environment versus production
  //   level: env === 'development' ? 'debug' : 'info',
  //   format: format.combine(
  //     format.timestamp({
  //       format: 'YYYY/MM/DD HH:mm:ss'
  //     }),
  //     format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  //   ),
  //   transports: [
  //     new transports.Console({
  //       level: 'info',
  //       format: format.combine(
  //         format.colorize(),
  //         format.printf(
  //           info => `${info.timestamp} ${info.level}: ${info.message}`
  //         )
  //       )
  //     }),
  //     dailyRotateFileTransport
  //   ]
  // });
// module.exports = logger;
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'F:/Chthonic_Logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/Chthonic-%DATE%.log`,
  datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});
module.exports = logger;
