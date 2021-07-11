const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    isNurse: { // gives more priviliges to user if set to [true]
        type: Boolean,
        default: false,
    },
    department: {
        type: String,
        defalut: ''
    }
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('User', userSchema)