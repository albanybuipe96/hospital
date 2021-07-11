const mongoose = require('mongoose')
const codes = require('../helpers/error.codes')

const helpers = {
    /**
     *
     * @param {id} id of object
     * @param {res} res of invoking callback
     * @returns json
     */
    validateID: (id, res) => {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(codes.BAD_REQUEST).json({
                success: false,
                message: '[MongooseError]: Error casting ID.'
            })
        }
    }
}

module.exports = helpers