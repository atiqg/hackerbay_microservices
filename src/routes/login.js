/**
 * Express router providing user login routes
 * @module routes/login
 * @requires express
 * @requires jsonwebtoken
 * @requires dotenv/config
 * @requires env secret key
 */

//IMPORT JWT PACKAGE
import jwt from 'jsonwebtoken';
//PACKAGE FOR ENV VARIABLES
import 'dotenv/config';
//EXPRESS AND LOGGER MODULE
import { Router } from 'express';
import logger from '../../logger/logger';

/**
 * route to mount user login functions on.
 * @type {object}
 * @const
 * @namespace login route
 */
const router = Router();

//GET SECRET KEY
const accessTokenSecret = process.env.MY_SECRET;

/**
 * ROUTE SERVING USER LOGIN AND GENERATING JWT
 * @name post/login
 * @function
 * @memberof module:routes/login~userLogin
 * @inner
 * @param {string} path - Express path
 */
router.post('/', (req, res) => {
    logger.info('server.endpoint.post.login.return_signed_jwt.started');

    //if username or password is not provided
    if (! req.body.username || ! req.body.password) {
        logger.error('server.endpoint.post.login.username_password_not_provided.error');
        return res.json({error: 'username and password are required'});
    }
    
    //set variables
    const { username, password } = req.body;

    //accept any arbitrary user (user verification logic)
    const user = true;
    let accessToken = '';

    //if user exist
    if (user) {
        return function () {

            try {
                //check if pass is not too small
                if (password.length < 3) throw new Error('password is too small, try more than 2 digit password');
                //generate json web token
                accessToken = jwt.sign({ username: username,  password: password }, accessTokenSecret);
            } catch (err) {
    
                //log and pass error
                logger.error(`server.endpoint.post.login.try_catch.error: ${err}`);
                return res.json({error: err});
            }
    
            //send res
            logger.info('server.endpoint.post.login.return_signed_jwt.ended');
            return res.json({ accessToken });
        };
    }
});


export default router;