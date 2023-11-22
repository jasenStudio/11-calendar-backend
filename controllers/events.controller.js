const { response } = require('express');
const Event = require('../models/EventModel');


const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    try {
        return res.status(200).json({
            ok: true,
            eventos: events
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })


    }
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSave = await event.save();

        return res.status(200).json({
            ok: true,
            event: eventSave
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })


    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            console.log("No deberia estar aqui")
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user:req.uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId,newEvent,{new: true});

        return res.status(200).json({
            ok: true,
            event: eventUpdate
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })


    }


}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;

  


    try {

        const event = await Event.findById(eventId);

        if (!event) {
            console.log("No deberia estar aqui")
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar este evento'
            })
        }

        const eventDelete = await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            ok: true,
            delete: eventDelete

        })

    } catch (error) {

    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}