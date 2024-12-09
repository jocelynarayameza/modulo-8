const {SECRET} = require ("../config/auth.config.js")
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: "Enviar el token"});
    }
    try {
        const payload = jwt.verify(req.headers.authorization, SECRET);
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido"});
    }
}

module.exports = {verifyToken}