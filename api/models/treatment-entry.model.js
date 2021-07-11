const mongoose = require('mongoose')

const treatmentEntrySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }
})

treatmentEntrySchema.virtual('id').get(function () {
    return this._id.toHexString()
})

treatmentEntrySchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('TreatmentEntry', treatmentEntrySchema)
