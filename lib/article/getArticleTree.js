const Article = require("../../models/article")

const getArticle = async (req, res) => {
	try {
		let article = await Article.find().select(' title count').sort({title : 1}).lean()
		console.log(article.length)
		tree = article.reduce((t, v) => t ? insertNode(t, v) : new Node(v), null);
		console.log(tree);
		res.status(200).send(tree);
		
	} catch (err) {
		console.log("error getting article ", err)
		res.status(500).send("Article get failed." + err);
	}
};
function Node(value) {
    this.value = value;
}

function insertNode(tree, value) {
    var node = tree,
        key;
    while (node.value.count !== value.count) {
         key = value.count < node.value.count ? 'left' : 'right';
         if (!node[key]) {
             node[key] = new Node(value);
             break;
         }
         node = node[key];
    }
    return tree;
}
module.exports = getArticle;

