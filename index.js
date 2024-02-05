const express = require('express');

require("./db");

const port = 3000;
const app = express();


//Since this will act as an API and SCIM endpoint, we'll set up the middleware to parse JSON
//The router to the SCIM endpoint
app.use(express.json());
app.use("/scim/v2", require('./routes/scim_endpoint'));
app.use("/token", require('./routes/tokens'));


app.get("/Ping", (req, rep) => {
    rep.send({
        "Resp": "Pong"
    })
});


//Start the Listener
app.listen(port, () => {
    console.log("running on port: " + port)
}); 
