const mongoose = require('mongoose');


const clientSchema = mongoose.Schema({
    title: String,
    firstName: String,
    surname: String,
    dob: String,
    mobilePhone: String,
    homePhone: String,
    email: String,
    guardianName: String,
    permission: String,
    record: String,
    doctor: String,
    referred: String,
    address1: String,
    address2: String,
    town: String,
    county: String,
    eircode: String
}, {timestamps: true});

const physioSchema = mongoose.Schema({
    title: String,
    firstName: String,
    surname: String,
    mobilePhone: String,
    homePhone: String,
    email: String,
    address1: String,
    address2: String,
    town: String,
    county: String,
    eircode: String
}, {timestamps: true});

const sessionSchema = mongoose.Schema({
    sessionDate: String,
    sessionTime: String,
    client: String,
    physio: String,
    fee: String,
    sessionNo: String,
    sessionStatus: String,
    sessionType: String,
    sessionNotes: String
}, {timestamps: true});

module.exports = {
    Clients: mongoose.model('clients', clientSchema),
    Physios: mongoose.model('physios', physioSchema),
    Sessions: mongoose.model('sessions', sessionSchema)
};
