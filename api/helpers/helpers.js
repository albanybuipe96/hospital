const mongoose = require('mongoose')

const helpers = {
    validateID: (id) => {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(codes.BAD_REQUEST).json({ success: false, message: '[MongooseError]: Error casting ID.' })
        }
    }
}

module.exports = helpers