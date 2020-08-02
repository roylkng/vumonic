const Topic = require("../../models/topic")


const getTopic = async (req, res) => {
	try {
        const id = req.query.id
        const query = id ? {_id:id}: {}
        console.log(query)
        const topic = await Topic.find(query).lean()
		console.log("all topic", topic)
		res.status(200).send(topic);
	} catch (err) {
		console.log("error creating topic ", err)
		res.status(500).send("Topic create failed." + err);
	}
};

module.exports = getTopic;

