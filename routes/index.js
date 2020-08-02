const createUser = require("../lib/user/createUser")
const authenticateUser = require("../lib/user/authenticateUser")
const createTopic = require("../lib/topic/createTopic")
const getTopic = require("../lib/topic/getTopic")
const jwt = require('jsonwebtoken')
const createArticle = require("../lib/article/createArticle")
const updateArticle = require("../lib/article/updateArticle")
const getArticle = require("../lib/article/getArticle")
const getArticleTree = require("../lib/article/getArticleTree")
const secretKey = require('../config/config').secretKey

module.exports = function (server) {
	server.post("/users/signUp", createUser);
	server.post("/users/authenticate", authenticateUser);
	server.post("/topics/createTopic", requireAdmin, createTopic);
	server.get("/topics/getTopic", getTopic);
	server.post("/articles/createArticle", requireAdmin, createArticle);
	server.post("/articles/updateArticle", requireAdmin, updateArticle);
	server.get("/articles/getArticle", checkIsLoggedIn, getArticle);
	server.get("/articles/getArticleTree", getArticleTree);
};
function requireAdmin(request, response, next) {
    if (request.user.isAdmin != true) {
        response.json({message: 'Permission denied.' });
    }
    else {
        next();
    }
};

function checkIsLoggedIn(request, response, next) {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
		var token = request.headers.authorization.split(' ')[1];
		try {
			request.user = jwt.verify(token, secretKey);
			console.log(request.user)
			next()
		} catch (error) {
			console.log(error)
			response.json({message: 'Invalid token.' });
		}		
    }
    else {
        next();
    }
};