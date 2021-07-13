const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const Patient = require('../models/patient.model')
const Status = require('../models/status.model')
const helpers = require('../helpers/helpers')
const codes = require('../helpers/error.codes')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const valid = FILE_TYPE_MAP[file.mimetype]
        valid
            ? (uloadError = null)
            : (uploadError = new Error('Invalid image type'))
        cb(null, '/public/uploads')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-')
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    },
})

const uploadOptions = multer({ storage })

const router = express.Router()

/**
 * @method Retrieve all @param {[Patient]}
 * @returns {[Patient]}
 */

router.get('/', async (req, res) => {
    const { statuses } = req.query
    let filter = {}

    if (statuses) {
        filter = { statuses: statuses.split(',') }
    }

    const patients = await Patient.find()
        .select('firstName lastName status dateStarted')
        .populate('status')

    if (!patients) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Internal server error.' })
    }

    res.status(codes.OK).send(patients)
})

/**
 * @method Get @param {Patient}
 * @param {id} of @param {patient}
 * @returns {Patient}
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    const patient = await Patient.findById(id)
        .select('firstName lastName status')
        .populate('status')

    if (!patient) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Internal server error.' })
    }

    res.status(codes.OK).send(patient)
})

/**
 * @method Register new @param {Patient}
 * @param {firstName} of @param {patient}
 * @param {lastName} of @param {patient}
 * @param {otherName} of @param {patient}
 * @param {image} of @param {patient}
 * @param {status} of @param {patient}
 * @param {phone} of @param {patient}
 */

router.post('/', uploadOptions.single('image'), async (req, res) => {
    const { firstName, lastName, otherName, phone } = req.body
    const status = await Status.findById(req.body.status)

    if (!status) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Specified status not found.' })
    }

    const file = req.file || {
        filename: '/public/uploads/' + Date.now() + '.png', // added to allow smooth running; must be deleted in production
    }
    if (!file) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'No image in the request.' })
    }
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

    const patient = await new Patient({
        firstName,
        lastName,
        otherName,
        status,
        phone,
        image: `${basePath}${fileName}`,
    }).save()

    if (!patient) {
        return res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Internal server error.' })
    }

    res.status(codes.OK).send(patient)
})

/**
 * @method Update @param {Patient}
 * @param {id} of @param {patient}
 * @param {firstName} of @param {patient}
 * @param {lastName} of @param {patient}
 * @param {otherName} of @param {patient}
 * @param {image} of @param {patient}
 * @param {status} of @param {patient}
 * @param {phone} of @param {patient}
 */

router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    const { firstName, lastName, otherName, phone } = req.body
    const status = await Status.findById(req.body.status)

    if (!status) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'BAD REQUEST' })
    }

    const currPatient = await Patient.findById(id)

    const file = req.file
    let imagePath
    if (file) {
        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        imagePath = `${basePath}${fileName}`
    } else {
        imagePath = currPatient.image
    }

    const updPatient = await Patient.findByIdAndUpdate(
        id,
        { firstName, lastName, otherName, phone, image: imagePath },
        { new: true }
    )

    if (!updPatient) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'Patient info. not updated.' })
    }

    res.status(codes.OK).send(updPatient)
})

/**
 * @method Delete @param {Patient}
 * @param {id} of @param {patient}
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    Patient.findByIdAndRemove(id)
        .then((patient) => {
            if (patient) {
                return res.status(codes.OK).json({
                    success: true,
                    message: 'Specified patient deleted successfully.',
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Specified patient not found/deleted.',
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err })
        })
})

/**
 * @method GetCount
 * @returns {int} of @param {[Patient]}
 */

router.get('/get/count', async (req, res) => {
    const count = await Patient.countDocuments((count) => count)

    if (!count) {
        return res.status(codes.INTERNAL_SERVER_ERROR).json({ success: false })
    }

    res.status(codes.OK).send({
        count,
    })
})

module.exports = router
