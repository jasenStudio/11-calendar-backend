/*
Rutas de usuarios /auth
host + api/auth
*/


const { Router } = require('express');
const { check  } = require('express-validator');
const { createUser, validateToken, loginUser } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const   router   = Router();

router.post('/',
            [
                check('email','El email debe ser obligatorio').isEmail().not().isEmpty(),
                check('password','El password debe ser minimo de 6 caracteres').isLength({min: 6}),
                validarCampos
            ] ,
            loginUser);

router.post('/new',
            [
                // middleware
            check('name','El nombre es obligatorio').not().isEmpty(),
            check('email','El email es obligatorio').isEmail(),
            check('password','El password debe de ser 6 caracteres').isLength({min:6}),
            validarCampos

            ],
            createUser );

router.get('/renew', validarJWT ,validateToken);


module.exports = router;
