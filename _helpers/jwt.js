const expressJwt = require('express-jwt')
const secretKey = require('../config/config').secretKey

module.exports = jwt;

function jwt() {
    console.log(secretKey)
    return expressJwt({ secret : secretKey }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/signUp',
            '/topics/getTopic',
            '/health',
            '/articles/getArticle'
        ]
    });
}
