const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }
})

statusSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

statusSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Category', categorySchema)