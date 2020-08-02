const User = require("../../models/users")

const findUser = async (query) => {
    console.log(User);
	try {
		const resp = await User.findOne(query).lean();
		console.log("User found", resp)
        return resp
	} catch (err) {
		console.log("error finding Users ", err)
		throw err
	}
};

module.exports = findUser