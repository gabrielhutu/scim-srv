const mongodb = require("mongoose");
const userSchema = new mongodb.Schema({
    schemas: {
        type: [String],
        value: ["urn:ietf:params:scim:schemas:core:2.0:User"]
    },
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    },
    middleName: {
        type: String
    },
    email: {
        type: String,
//        required: true
    },
    groups: {
        type: String
    }

}, {
    collection: "users"
});

module.exports = mongodb.model("user", userSchema);