const Validator = require('jsonschema').Validator;
var v = new Validator();
const validatePayload = (payload, schema) => {
    var valid = v.validate(payload, schema);
    if (valid.errors.length > 0) {
        console.log("invalid payload",valid.errors[0].stack)
        throw new Error(valid.errors[0].message);
    } else {
        return true
    }
}
module.exports =  validatePayload;