const express = require('express');
const sendUnauthorizedResponse = require("./authorization/authorization");

require("./db");

const port = 3000;
const app = express();


//Since this will act as an API and SCIM endpoint, we'll set up the middleware to parse JSON
//The router to the SCIM endpoint
app.use(express.json());

app.use(async (request, response, next) => {
    //Check if the authorization token provided is correct, if not bye bye :)
    const authorized = await sendUnauthorizedResponse(response, request.header("authorization"));
    //the following applies to ALL methods that call sendauthorizedResponse

    // if the user is not authorized (a.k.a token is not correct), do not go further down, by removing this IF statement,  
    // the code will go in the try-catch statement and will try to send another 200 response, which will indefinetly crash the server 
    // on each incorrect token (since sendauthorizedResponse is already calling response.send)
    
    // to keep it short, make sure that this if statement stays here
    if(!authorized){
        return;
    }
    next();
});


app.use("/scim/v2", require('./routes/scim_endpoint'));
app.use("/token", require('./routes/tokens'));



//Start the Listener
app.listen(port, () => {
    console.log("running on port: " + port)
}); 
