const { findAllUsers } = require("../controllers/user.controller.js")

exports.verifySignUp = async (req, res, next) => {
    try {
        const email = req.body.email;
        const users = await findAllUsers();
        const exists = users.find((user) => email == user.email)

        if (exists) {
            return res.status(409).json({ message: "El correo ya ha sido registrado" });
        }

        next();

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

