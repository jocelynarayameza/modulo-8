const validateRegisterUser = (req, res, next) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password  ) {
        return res.status(400).json({message: "Faltan parámetros"})
    }else{
        next();
    }
}

const validateRegisterBootcamp = (req, res, next) => {
    if(!req.body.title || !req.body.cue || !req.body.description  ) {
        return res.status(400).json({message: "Faltan parámetros"})
    }else{
        next();
    }
}

module.exports = {validateRegisterUser, validateRegisterBootcamp}