
const { Router } = require('express');
const {postAuth} = require('../controllers/auth.controller')

const { check } = require('express-validator');

const route = Router();

route.post('/',
[
    check('identificacion', 'La identificación no es aceptada').isNumeric(),
    check('identificacion', 'La identificación no tiene la longitud permitida').isLength({min:8, max:10}),
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email, no tiene el formato permitido').isEmail(),
]
, postAuth)

module.exports = route;