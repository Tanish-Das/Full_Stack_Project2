const mongoose = require("mongoose")
const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    rollno: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    profilephoto: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneno: {
        type: Number,
        required: true,
    },
    localaddress: {
        type: String,
        required: true,
    },
    fathername: {
        type: String,
        required: true,
    },
    mothername: {
        type: String,
        required: true,
    },
    fatheroccupation: {
        type: String,
        required: true,
    },
    motheroccupation: {
        type: String,
        required: true,
    },
    fatherphoneno: {
        type: Number,
        required: true,
    },
    fathermailid: {
        type: String,
        required: true,
    },
    motherphoneno: {
        type: Number,
        required: true,
    },
    mothermailid: {
        type: String,
        required: true,
    },
    classxpercentage: {
        type: Number,
        required: true,
    },
    classxiipercentage: {
        type: Number,
        required: true,
    },
    mentoringdetails: {
        type: String,
        required: true,
    },
    declaration: {
        type: Boolean,
        default: false
    },
})
const Register = mongoose.model("Register", registerSchema)
module.exports = Register