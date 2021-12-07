const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentScheme = new Schema ({
    id: String,
    userId: String,
    patient: String,
    doctor: String,
    date: Date,
    complaints: String
});

const Appointment = mongoose.model('appointment', appointmentScheme);
module.exports = Appointment;