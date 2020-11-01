//PACKAGE TO GET ENV VARIABLE AT RUNTIME
import {} from 'dotenv/config';
//PACKAGE TO HANDLE CORS POLICY
import cors from 'cors';
//BODY PARSING MIDDLEWARE
import bodyParser from 'body-parser';
//IMPORT EXPRESS FRAMEWORK
import express from 'express';
//IMPORT API ROUTES
import routes from './routes';
//IMPORT LOGGER 
import logger from '../logger/logger';


//INITIALIZE APP
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/login', routes.login);
app.use('/patch', routes.patch);
app.use('/thumbnail', routes.thumbnail);

app.listen(process.env.PORT, () =>
    logger.info(`HackerBay app at ${process.env.PORT} port`),
);

//EXPORT APP
module.exports = app;