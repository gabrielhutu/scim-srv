const bearerToken = require("../models/token");

const authorize = async (tokenToCheck) => {

    localToken = (await bearerToken.findOne({token: tokenToCheck.substr(7)}));
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
        return false;
    }
    return true;
}

module.exports = authorize;
module.exports = sendUnauthorizedResponse;