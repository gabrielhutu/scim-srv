const mongodb = require("mongoose");
const userSchema = new mongodb.Schema({
    schemas: {
        type: [String]
    },
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    },
    email: {
        type: String,
//        required: true
    }
}, {
    collection: "users"
});

module.exports = mongodb.model("user", userSchema);