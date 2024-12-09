const express = require("express");
const router = express.Router();

const {createUser, findAll, findUserById, updateUserById, deleteUserById, login } = require("../controllers/user.controller.js");

//MIDDLEWARES
const {verifySignUp, validateRegisterUser, verifyToken} = require("../middleware/index.js");


router.get("/api/user", verifyToken,  findAll);
router.get("/api/user/:id", verifyToken,  findUserById);
router.post("/api/signin", login)
router.post("/api/signup", validateRegisterUser, verifySignUp, createUser);
router.put("/api/user/:id", verifyToken, updateUserById);
router.delete("/api/user/:id",verifyToken, deleteUserById);


module.exports = router;
