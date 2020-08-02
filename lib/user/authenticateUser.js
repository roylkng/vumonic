const User = require("../../models/users")
const findUser = require("./findUser")
const validatePayload = require("../../_helpers/json_validator")
const jwt = require('jsonwebtoken')
const secretKey = require('../../config/config').secretKey
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res) => {
	try {
		const payload = req.body;
		var isValidPayload = validatePayload(payload, LoginPayloadSchema)
		if(isValidPayload === true){
			const user = await findUser({"email": payload.email});
			doesPasswordsMatch = bcrypt.compareSync(payload.password, user.password)
			if(doesPasswordsMatch){
				user.token = createToken(user);
				res.status(200).send(user);
			} else {
				res.status(401).send("Authentication failed. Please check email id and password entered.");
			}
		} else {
			res.status(500).send("Authentication failed." + isValidPayload);
		}
	} catch (err) {
		console.log("Authentication failed.", err)
		res.status(500).send("Authentication failed." + err);
	}
};


//generate jwt token with user info
const createToken = (user)=>{
	try {
		delete user.password
		var token = jwt.sign(user, secretKey, {
			expiresIn: 300000 // expires in 5 minuts
		});
		return token
	} catch (error) {
		console.log("error creating token", error)
		throw error
	}
}

//should be kept in a sepretate folder of API paylaod schema
const LoginPayloadSchema = {
    "$schema": "http://json-schema.org/schema#",
    "$ref": "#/definitions/LoginPayloadSchema",
    "definitions": {
        "LoginPayloadSchema": {
            "type": "object",
            "additionalProperties": true,
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string",
                }
            },
            "required": [
                "email",
                "password"
            ],
            "title": "LoginPayloadSchema"
        }
    }
}


module.exports = authenticateUser;

