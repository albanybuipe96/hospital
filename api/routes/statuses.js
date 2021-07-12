const express = require('express')
const mongoose = require('mongoose')

const helpers = require('../helpers/helpers')
const codes = require('../helpers/error.codes')
const Status = require('../models/status.model')

const router = express.Router()

/**
 * Get all @param {statuses} of  @param {patient}s
 */
router.get('/', async (req, res) => {
    const statusList = await Status.find().select(' -__v ')

    if (!statusList) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Could not fetch statuses.' })
    }

    res.status(codes.OK).send(statusList)
})

/**
 * @param {id} of @param {status}
 * @returns {Status}
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    const status = Status.findById(id)

    if (!status) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Status could not be fetched.' })
    }

    res.status(codes.OK).send(status)
})

/**
 * @param {name} of @param {status}
 * @param {icon} of @param {status}
 * @param {color} of @param {status}
 *
 * @returns {Status}
 */

router.post('/', async (req, res) => {
    const { name, icon, color } = req.body

    const status = await new Status({ name, icon, color }).save()

    if (!status) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Internal server error.' })
    }

    res.status(codes.OK).send(status)
})

/**
 * @param {id} of @param {status}
 * @param {name} of @param {status}
 * @param {icon} of @param {status}
 * @param {color} of @param {status}
 *
 * @returns {Status}
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    const { name, icon, color } = req.body
    const status = await Status.findByIdAndUpdate(
        id,
        { name, icon, color },
        { new: true }
    )

    if (!status) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'Specified status not found.' })
    }

    res.status(codes.OK).send(status)
})

/**
 * @param {id} of @param {status}
 * @returns {string}
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    Status.findByIdAndRemove(id)
        .then((status) => {
            if (status) {
                return res
                    .status(codes.OK)
                    .json({ success: true, message: 'Status deleted.' })
            } else {
                return res
                    .status(codes.NOT_FOUND)
                    .json({ success: false, message: 'Status not found.' })
            }
        })
        .catch((err) => {
            return res
                .status(codes.NOT_FOUND)
                .json({ success: false, error: err })
        })
})

module.exports = router
