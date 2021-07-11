const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    otherName: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    dateStarted: {
        type: Date,
        default: Date.now
    }
})

patientSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

patientSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Patient', patientSchema)