const {request, response} = require('express')

const User = require('../models/users.models')

const bcryptsjs =  require('bcryptjs')

const postAuth = async (req = request, res = response) => {

    
    const {email, password} = req.body
    try {

        //Validacion usuario existente

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: `El usuario no existe`
            })
        }

        //Validacion usuario activo

        if (!user.estado) {
            return res.status(400).json({
                msg: `El usuario se encuentra inactivo`
            })
        }

        //Validacion contraseña usuario

        const validationPass = bcryptsjs.compareSync(password, user.password)

        if (!validationPass) {
            return res.status(400).json({
                msg: `Las contraseña no coincide`
            })
        }

        //Generar token (JWT)

        const TOKEN_USER = await generateJWT(
            // dataUser
            user.identificacion,
            user.nombre,
            user.apellidos,
            user.direccion,
            user.telefono,
            user.email
        )

    } catch (error) {
        console.log("Error del servidor "+error);
        throw new Error("Lo sentimos, se nos ha presentado un problema, intente mas tarde")
    }

    res.json({
        email, password
    })
}

module.exports = {
    postAuth
}