const mongodb = require("mongoose");
const groupSchema = new mongodb.Schema({
    schemas: {
        type: [String],
        value: ["urn:ietf:params:scim:schemas:core:2.0:Group"]
    },
    displayName: {
        type: String
    },
    members: {
        type: [String]
    }

});
