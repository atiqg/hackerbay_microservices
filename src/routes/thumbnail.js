/** Express router providing thumbnail generation routes
 * @module routes/thumbnail
 * @requires express
 * @requires image-thumbnail
 * @requires dotenv/config
 * @requires env secret key
 */

//PACKAGE TO GENERATE THUMBNAIL
import imageThumbnail from 'image-thumbnail';
//IMPORT JWT PACKAGE
import jwt from 'jsonwebtoken';
//PACKAGE FOR ENV VARIABLES
import 'dotenv/config';
//FILE, EXPRESS AND LOGGER MODULE
import fs from 'fs';
import { Router } from 'express';
import logger from '../../logger/logger';
 

/**
 * route to mount thumbnail generation functions on.
 * @type {object}
 * @const
 * @namespace thumbnail route
 */
const router = Router();

//GET SECRET KEY
const accessTokenSecret = process.env.MY_SECRET;

/**
 * MIDDLEWARE TO AUTHENTICATE api/thumbnail REQUEST 
 * BY VERIFYING JWT.
 * @function
 * @param {object} req api/thumbnail auth request object
 * @param {object} res api/thumbnail auth response object
 * @param {callback} next function to invoke next middleware
 */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //if jwt is provided
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        //verify it with env secret key
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                //log and pass error
                logger.error('server.endpoint.get.thumbnail.jwt_authentication.error: ' + err);
                return res.json({error: err});
            }

            //pass request
            req.user = user;
            next();
        });
    } else {
        //log and pass error
        logger.error('server.endpoint.get.thumbnail.jwt_not_provided.error');
        return res.json({error: 'access token is not provided'});
    }
};


/**
 * ROUTE SERVING THUMBNAIL GENERATION
 * @name get/thumbnail
 * @function
 * @memberof module:routes/thumbnail~generateThumbnail
 * @inner
 * @param {string} path - Express path
 * @param {callback} authenticateJWT - jwt verification middleware.
 */
router.get('/', authenticateJWT, async (req, res) => {
    logger.info('server.endpoint.get.thumbnail.generate_thumbnail.started');

    //if image url is not provided
    if (!req.body.imageUrl) {
        logger.error('server.endpoint.get.thumbnail.image_url_not_provided.error');
        return res.json({error: 'High res image url required'});
    }

    try {
        //generate thumbnail
        const thumbnail = await imageThumbnail({ uri: req.body.imageUrl }, { width: 50, height: 50});
        fs.writeFile('./assets/thumbnail.png', thumbnail, 'binary',
        function(){
            //send res
            logger.info('server.endpoint.get.thumbnail.generate_thumbnail.ended');
            return res.json({success: 'Thumbnail has been saved at project_root/assets/thumbnail.png'});
        });
    } catch (err) {
        //log and pass error
        logger.error('server.endpoint.get.thumbnail.try_catch.error: ' + err);
        return res.json({error: err});
    }
});


export default router;