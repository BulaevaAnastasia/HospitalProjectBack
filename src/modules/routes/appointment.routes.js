const express = require('express');
const router = express.Router();

const {
    getAllAppointments,
    createNewAppointment,
    changeAppointmentInfo,
    deleteAppointment
} = require('../controllers/appointment.controller')

router.get('/allAppointments', getAllAppointments);
router.post('/saveAppointment', createNewAppointment);
router.put('/changeAppointment', changeAppointmentInfo);
router.delete('/removeAppointment', deleteAppointment);

module.exports = router;