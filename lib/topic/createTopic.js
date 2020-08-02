const Topic = require("../../models/topic")
const validatePayload = require("../../_helpers/json_validator")



//should be kept in a sepretate folder of API paylaod schema
const CreateTopicSchema = {
    "$schema": "http://json-schema.org/schema#",
    "$ref": "#/definitions/TopicPayloadSchema",
    "definitions": {
        "TopicPayloadSchema": {
            "type": "object",
            "additionalProperties": true,
            "properties": {
				"name": {
                    "type": "string"
                },
                "imageUrl": {
                    "type": "string",
                }
            },
            "required": [
                "name",
				"imageUrl"
            ],
            "title": "TopicPayloadSchema"
        }
    }
}


const createTopic = async (req, res) => {
	try {	
		const payload = req.body;
		var isValidPayload = validatePayload(payload, CreateTopicSchema)
		if(isValidPayload === true){
			const topic = new Topic({name: payload.name, imageUrl: payload.imageUrl})
			await topic.save()
			console.log("created topic", topic)
			res.status(200).send(topic);
		} else {
			res.status(500).send("Topic create failed." + isValidPayload);
		}
	} catch (err) {
		console.log("error creating topic ", err)
		res.status(500).send("Topic create failed." + err);
	}
};

module.exports = createTopic;

