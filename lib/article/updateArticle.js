const Article = require("../../models/article")
const validatePayload = require("../../_helpers/json_validator")



//should be kept in a sepretate folder of API paylaod schema
const UpdateArticleSchema = {
    "$schema": "http://json-schema.org/schema#",
    "$ref": "#/definitions/ArticlePayloadSchema",
    "definitions": {
        "ArticlePayloadSchema": {
            "type": "object",
            "additionalProperties": true,
            "properties": {
				"title": {
                    "type": "string"
                },
                "_id": {
                    "type": "string"
                },
                "imageUrl": {
                    "type": "string",
                },
                "content": {
                    "type": "string",
                },
                "topic": {
                    "type": "string",
                },
                "isFeatured": {
                    "type": "boolean",
                }
            },
            "required": [
                "title",
                "imageUrl",
                "content",
                "topic",
                "isFeatured",
                "_id"
            ],
            "title": "ArticlePayloadSchema"
        }
    }
}


const updateArticle = async (req, res) => {
	try {	
		const payload = req.body;
		var isValidPayload = validatePayload(payload, UpdateArticleSchema)
		if(isValidPayload === true){
            const article = await Article.findOneAndUpdate({_id: payload._id}, {$set : payload}, {new:true})
			console.log("updated article", article)
			res.status(200).send(article);
		} else {
			res.status(500).send("Article update failed." + isValidPayload);
		}
	} catch (err) {
		console.log("error updating article ", err)
		res.status(500).send("Article update failed." + err);
	}
};

module.exports = updateArticle;

