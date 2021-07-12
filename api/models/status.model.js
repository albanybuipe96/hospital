const mongoose = require('mongoose')

const statusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
})

statusSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

statusSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Status', statusSchema)