const express = require('express');
const token = require("./models/tokens");

require("./db");

const port = 3000;
const app = express();


//Since this will act as an API and SCIM endpoint, we'll set up the middleware to parse JSON
//The router to the SCIM endpoint
app.use(express.json());
app.use("/scim/v2", require('./routes/scim_endpoint'));

app.get("/Ping", (req, rep) => {
    rep.send({
        "Resp": "Pong"
    })
});


//Start the Listener
app.listen(port, () => {
    console.log("running on port: " + port)
}); 
