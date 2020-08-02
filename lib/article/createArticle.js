const Article = require("../../models/article")
const validatePayload = require("../../_helpers/json_validator")



//should be kept in a sepretate folder of API paylaod schema
const CreateArticleSchema = {
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
                "isFeatured"
            ],
            "title": "ArticlePayloadSchema"
        }
    }
}


const createArticle = async (req, res) => {
	try {	
		const payload = req.body;
		var isValidPayload = validatePayload(payload, CreateArticleSchema)
		if(isValidPayload === true){
			const article = new Article(payload)
			await article.save()
			console.log("created article", article)
			res.status(200).send(article);
		} else {
			res.status(500).send("Article create failed." + isValidPayload);
		}
	} catch (err) {
		console.log("error creating article ", err)
		res.status(500).send("Article create failed." + err);
	}
};

module.exports = createArticle;

