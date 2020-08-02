const Article = require("../../models/article")

const getArticle = async (req, res) => {
	try {
		const topic = req.query.topicId
		const id = req.query.id
		const orderBy = req.query.orderBy
		if(topic || id){
			const query = {isFeatured: false}
			topic ? query.topic = topic : query._id = id
			console.log(query)
			req.user ? delete query.isFeatured: true
			let article = await Article.find(query).lean()
			// When an Article is fetched, fetch related Articles also based on matching tags
			if(id){
				if(article[0]&& article[0].tags.length>0){
					const articleWithSameTags =  await Article.find({tags: {$in: article[0].tags}}).lean()
					console.log(articleWithSameTags)
					article = article.concat(articleWithSameTags)
				}
			}
			console.log("all article", article)
			if(orderBy){
				article.sort((a,b)=>{return a[orderBy]- b[orderBy]})
			}
			increaseCount(article)
			res.status(200).send(article);
		} else {
			res.status(422).send("Article get failed.");
		}
	} catch (err) {
		console.log("error getting article ", err)
		res.status(500).send("Article get failed." + err);
	}
};

async function increaseCount(articles){
	try {
		const allIds = []
		articles.forEach(element => {
			allIds.push(element._id)
		});
		await Article.update({_id: {$in: allIds}}, {$inc: {count: 1}}, {multi: true})
	} catch (error) {
		console.log(error)
	}
}
module.exports = getArticle;

