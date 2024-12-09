const {verifyToken} = require("./auth.js");
const {verifySignUp} = require("./verifySignUp.js");
const {validateRegisterUser, validateRegisterBootcamp} = require ("../middleware/validateRegister.js")

module.exports = {verifySignUp, verifyToken, validateRegisterUser, validateRegisterBootcamp}

