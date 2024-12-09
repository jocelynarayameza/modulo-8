const {
  users
} = require('../models')
const db = require('../models')
const User = db.users
const jwt = require("jsonwebtoken")
const Bootcamp = db.bootcamps
const { SECRET } = require("../config/auth.config.js")
const bcrypt = require("bcrypt")

// Crear y Guardar Usuarios
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const { firstName, lastName, email, password } = userData;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash
    });
    return res.status(201).json({ message: "Registro creado", data: user })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}

// obtener los bootcamp de un usuario
exports.findUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      },],
    })
    if(!user){
      return res.status(401).json({message: "Id inválido"})
    }
    return res.status(200).json({ message: "Usuario encontrado", data: user })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAllUsers = async () => {
  try {
    const users = await User.findAll({
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      },],
    })
    return users
  } catch (error) {
    throw new Error("Error al encontrar los usuarios")
  }
}

exports.findAll = async (req, res) => {
  try {
    const users = await this.findAllUsers();
    return res.status(200).json({ message: "Usuarios obtenidos", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}

// Actualizar usuarios
exports.updateUserById = async (req, res) => {
  try {

    const user = await User.findByPk(req.params.id);
    if(!user) {
      return res.status(400).json({message: "Id inválido"})
    }
    const newUserData = await User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }, {
      where: {
        id: req.params.id
      }
    })

    return res.status(201).json({ message: "Actualizado con éxito", newData: {id: newUserData[0], firstName: req.body.firstName, lastName: req.body.lastName }  })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}

// Actualizar usuarios
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if(!user) {
      return res.status(400).json({message: "Id inválido"})
    }
    const userToDelete = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({ message: "Eliminado con éxito", data: {id: userToDelete, firstname: user.firstName, lastName: user.lastName}  })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }

}

exports.findUsersToken = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (error) {
    throw new Error("Error al encontrar los usuarios")
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = await this.findUsersToken();
  const user = users.find((user) => user.email == email)
  const compare = await bcrypt.compare(password, user.password)

  if (!compare) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }
  const { ...payload } = user;
  const token = jwt.sign(payload, SECRET);

  return res.status(200).json({ message: "Autenticación exitosa", payload: payload.dataValues, token });
}