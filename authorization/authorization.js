const bearerToken = require("../models/tokens");

const authorize = async (tokenToCheck) => {

    console.log("Incoming token: " + tokenToCheck.substr(7));
    localToken = (await bearerToken.findOne({token: tokenToCheck.substr(7)}));
    console.log(localToken);
    if(localToken != null){
        return {
            isTokenValid: true,
            message: "Token is valid"
        }
    }
    return {
        isTokenValid: false,
        message: "Token is not valid"
    }
};

const sendUnauthorizedResponse = async (responseObject, tokenToCheck) => {
    const tokenFinder = await authorize(tokenToCheck);
    if(!(tokenFinder.isTokenValid)){
        await responseObject.status(401).send({
            "error": "Unauthorized"
        });
        return;
    }
}

module.exports = authorize;
module.exports = sendUnauthorizedResponse;