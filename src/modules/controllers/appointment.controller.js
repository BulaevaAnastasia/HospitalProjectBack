const Appointment = require('../../db/models/appointment');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports.getAllAppointments = async (req, res) => {
    try {
        const userId = req.query.userId;
        Appointment.find({userId}).then(result => {
            res.send({data: result})
        });
    } catch {
        res.status(400).json({ message: 'Ошибка загрузки' })
    }  
};

module.exports.createNewAppointment = async (req, res) => {
    try {
        req.body.id = uuidv4()
        const {name, doctor, date, complaint, id, userId} = req.body;
        const appointment = new Appointment({
            id: req.body.id,
            userId: req.body.userId,
            name: req.body.name,
            doctor: req.body.doctor,
            date: req.body.date,
            complaint: req.body.complaint
        })
        await appointment.save().then(result => {
            Appointment.find({userId: req.body.userId}).then(result => {
                res.send(result);
            })
        })

    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};

module.exports.changeAppointmentInfo = async (req, res) => {
    try {
        const {id, userId, name, doctor, date, complaint} = req.body;
        Appointment.updateOne({id: id}, {userId: userId, name: name, doctor: doctor, date: date, complaint: complaint}).then(result => {
            Appointment.find({userId}).then(result => {
                res.send({result});
            })
        })
    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};

module.exports.deleteAppointment = async (req, res) => {
    try {
        Appointment.deleteOne({ id: req.query.id }).then(result => {
            Appointment.find({userId: req.query.userId}).then(result => {
                res.send(result);
            });
        })

    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};