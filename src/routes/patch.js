/**
 * Express router providing json patch routes
 * @module routes/patch
 * @requires express
 * @requires jsonpatch
 * @requires dotenv/config
 * @requires env secret key
 */

//PACKAGE TO PATCH JSON 
import jsonpatch from 'jsonpatch';
//IMPORT JWT PACKAGE
import jwt from 'jsonwebtoken';
//PACKAGE FOR ENV VARIABLES
import 'dotenv/config';
//EXPRESS AND LOGGER MODULE
import { Router } from 'express';
import logger from '../../logger/logger';
 
/**
 * route to mount json patch functions on.
 * @type {object}
 * @const
 * @namespace patch route
 */
const router = Router();

//GET SECRET KEY
const accessTokenSecret = process.env.MY_SECRET;

/**
 * MIDDLEWARE TO AUTHENTICATE api/patch REQUEST 
 * BY VERIFYING JWT TOKEN.
 * @function
 * @param {object} req api/patch auth request object
 * @param {object} res api/patch auth response object
 * @param {callback} next function to invoke next middleware
 * @returns {middleware} next() (if jwt verified)
 */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    return function () {
        //if jwt is provided
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            //verify it with env secret key
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    //log and pass error
                    logger.error(`server.endpoint.patch.patch.jwt_authentication.error: ${err}`);
                    return res.json({error: err});
                }

                //pass request
                req.user = user;
                next();
            });
        } else {
            //log and pass error
            logger.error('server.endpoint.patch.patch.jwt_not_provided.error');
            return res.json({error: 'access token is not provided'});
        }      
    };
};


/**
 * ROUTE SERVING JSON PATCH
 * @name patch/patch
 * @function
 * @memberof module:routes/patch~patchJson
 * @inner
 */
router.patch('/', authenticateJWT, (req, res) => {
    logger.info('server.endpoint.patch.patch.return_patched_json.started');

    //if json object are not provided
    if (! req.body.unPatched || ! req.body.patch) {
        logger.error('server.endpoint.patch.patch.input_not_received.error');
        return res.json({error: 'unPatched and patch json objects are required'});
    }

    //set variables
    const unPatched = req.body.unPatched;
    const patch = req.body.patch;
    let patched = '';

    return function () {
        //patch json
        try {
            patched = jsonpatch.apply_patch(unPatched, [ patch ]);
        } catch (err) {
            //log and pass error
            logger.error(`server.endpoint.patch.patch.try_catch.error: ${err}`);
            return res.json({error: err});
        }

        logger.info('server.endpoint.patch.patch.return_patched_json.ended');
        return res.send(patched);    
    };
});


export default router;