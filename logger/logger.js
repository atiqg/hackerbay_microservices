import {transports, createLogger, format} from 'winston';

/**
 * CREATE A LOGGER
 */
const logger = createLogger({
    //set logger level
    level: 'info',
  
    format: format.combine(
        //add timestamps in logs
        format.timestamp(),
        format.json()
    ),
  
    //add centralized log source
    transports: [
        new transports.File({ filename: 'app.log' })
    ]
});


//EXPORT LOGGER
export default logger;