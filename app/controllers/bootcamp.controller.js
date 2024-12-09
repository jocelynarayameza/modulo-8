const {
  users,
  bootcamps
} = require('../models')
const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = async (req, res) => {
  try {

    const bootcamps = await Bootcamp.findAll();
    const exists = bootcamps.find((bootcamp) => bootcamp.title == req.body.title )
    if(exists){
      return res.status(409).json({message: "Ya existe un bootcamp con ese título"})
    }
    const bootcamp = await Bootcamp.create({
      title: req.body.title,
      cue: req.body.cue,
      description: req.body.description,
    })
    return res.status(201).json({ message: "Bootcamp creado", data: bootcamp })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}

// Agregar un Usuario al Bootcamp
exports.addUser = async (req, res) => {
  try {
    const bootcampId = await Bootcamp.findByPk(req.body.idBootcamp)

    if (!bootcampId) {
      return res.status(400).json({message: "No se encontró el bootcamp"}) 
      
    }
    const userId = await User.findByPk(req.body.idUser);
    if (!userId) {
      return res.status(400).json({message: "No se encontró el usuario"}) 

    }
    await bootcampId.addUser(userId);
    return res.status(200).json({message: `Se añadió el usuario con id=${userId.id} al bootcamp con id=${bootcampId.id}` });
  } catch (error) {
    return res.status(500).json({message: "Error interno del servidor"})
  }

}


// obtener los bootcamp por id 
exports.findById = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      },],
    });
    if(!bootcamp){
      return res.status(401).json({message: "Id inválido"})
    }
    return res.status(200).json({ message: "Bootcamp encontrado", data: bootcamp })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAllBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      },],
    })
    return res.status(200).json({ message: "Bootcamps encontrados", data: bootcamps })
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" })
  }
}