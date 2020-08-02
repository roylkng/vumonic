const User = require("../../models/users")
const validatePayload = require("../../_helpers/json_validator")
const bcrypt = require('bcrypt');


//should be kept in a sepretate folder of API paylaod schema
const SignUpPayloadSchema = {
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
				"name": {
                    "type": "string"
                },
                "password": {
                    "type": "string",
                }
            },
            "required": [
                "email",
				"password",
				"name"
            ],
            "title": "LoginPayloadSchema"
        }
    }
}


const createUser = async (req, res) => {
	try {	
		const payload = req.body;
		var isValidPayload = validatePayload(payload, SignUpPayloadSchema)
		if(isValidPayload === true){
			let saltRounds = 10;
			// hash the password
			let hash = bcrypt.hashSync(payload.password, saltRounds);
			const user = new User({email: payload.email, password: hash, name: payload.name})
			await user.save()
			console.log("created user", user)
			res.status(200).send(user);
		} else {
			res.status(422).send("SignUp failed." + isValidPayload);
		}
	} catch (err) {
		console.log("error creating User ", err)
		res.status(500).send("Sign Up failed." + err);
	}
};

module.exports = createUser;

