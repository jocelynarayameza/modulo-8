const express = require("express");
const router = express.Router();

const { findById, findAllBootcamps, createBootcamp, addUser } = require("../controllers/bootcamp.controller.js");
const { verifyToken, validateRegisterBootcamp } = require("../middleware/index.js");

router.get("/api/bootcamp/:id", verifyToken, findById);
router.get("/api/bootcamp", findAllBootcamps);
router.post("/api/bootcamp",validateRegisterBootcamp, verifyToken, createBootcamp)
router.post("/api/addUser",verifyToken, addUser)

module.exports = router;
