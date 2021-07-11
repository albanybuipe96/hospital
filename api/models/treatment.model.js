const mongoose = require('mongoose')

const treatmentSchema = new mongoose.Schema({
    treatmentEntries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TreatmentEntry',
            required: true
        }
    ],
    status: {
        type: String,
        required: true,
        default: 'Treating'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateStarted: {
        type: Date,
        default: Date.now
    }
})

treatmentSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

orderSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Treatment', treatmentSchema)
