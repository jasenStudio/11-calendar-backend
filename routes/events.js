/*
 EVENTS ROUTERS

 /api/events

*/

const { Router } = require('express');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEvents,createEvent,updateEvent,deleteEvent } = require('../controllers/events.controller');
const { isDate } = require('../helpers/isDate');

const   router   = Router();

router.use(validarJWT);
//Obtener eventos
router.get('/' ,getEvents);

//Crear un evento
router.post('/new',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligotario').custom(isDate),
    check('end','Fecha de final es obligotario').custom(isDate),
    validarCampos
] ,createEvent);

// //Actualizar Evento
router.put('/:id' ,[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligotario').custom(isDate),
    check('end','Fecha de final es obligotario').custom(isDate),
    validarCampos
],updateEvent);

// //BorrarEVENTO
router.delete('/:id' ,deleteEvent);

module.exports = router;
