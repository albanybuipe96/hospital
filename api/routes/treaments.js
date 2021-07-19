const express = require('express')
const Treatment = require('../models/treatment.model')
const TreatmentEntry = require('../models/treatment-entry.model')

const helpers = require('../helpers/helpers')
const codes = require('../helpers/error.codes')

const router = express.Router()

router.get('/', async (req, res) => {
    const treatments = await Treatment.find()
        .populate('user', 'name')
        .populate({
            path: 'orderItems',
            populate: { path: 'product', populate: 'category' },
        })
        .sort({ dateOrdered: -1 })

    if (!orderList) {
        res.status(500).json({ success: false })
    }

    res.status(200).send(orderList)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
        .populate('user', 'name')
        .populate({
            path: 'treatmentEntries',
            populate: { path: 'patient', populate: 'status' },
        })

    if (!order) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'Treatment entry missing.' })
    }

    res.status(codes.OK).send(order)
})

router.post('/', async (req, res) => {
    const { treatmentEntries, status, user } = req.body
    const treatmentEntryIDs = Promise.all(
        orderItems.map(async (patientEntry) => {
            let treatmentEntry = new TreatmentEntry({
                number: patientEntry.number,
                patient: patientEntry.patient,
            })

            treatmentEntry = await treatmentEntry.save()
            return treatmentEntry._id
        })
    )
    const treatmentsResolved = await treatmentEntryIDs

    const totalPopulation = await Promise.all(
        orderItemsItsResolved.map(async (treatmentEntryID) => {
            const treatmentEntry = await TreatmentEntry.findById(
                treatmentEntryID
            ).populate('patient', 'number')
            const totalNumber = treatmentEntry.patient.number
            return totalNumber
        })
    )
    const totalNumber = totalPopulation.reduce((a, b) => a + b, 0)
    let treatment = new Treatment({
        treatmentEntries,
        status,
        user,
    })

    treatment = await treatment.save()

    if (!treatment) {
        res.status(codes.BAD_REQUEST).json({
            success: false,
            message: 'Error creating treatment.',
        })
    }

    res.send(treatment)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const treatment = await Treatment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    )

    if (!treatment) {
        return res.status(codes.BAD_REQUEST).send('Error modifying order.')
    }

    res.status(200).send(treatment)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    Treatment.findByIdAndRemove(id)
        .then(async (treatment) => {
            if (treatment) {
                await treatment.treatmentEntries.map(async (treatmentEntry) => {
                    await TreatmentEntry.findByIdAndRemove(treatmentEntry)
                })
                return res.status(codes.OK).json({
                    success: true,
                    message: 'Treatment deleted successfully.',
                })
            } else {
                return res
                    .status(codes.NOT_FOUND)
                    .json({ success: false, message: 'Error deleting order.' })
            }
        })
        .catch((err) =>
            res
                .status(codes.INTERNAL_SERVER_ERROR)
                .json({ success: false, error: err })
        )
})

router.get('/get/totalnumbers', async (req, res) => {
    const totalNumber = await Order.aggregate([
        { $group: { _id: null, totalnumbers: { $sum: '$number' } } },
    ])

    console.log(totalNumber)

    if (!totalNumber) {
        return res.status(codes.BAD_REQUEST).json({
            success: false,
            message: 'Total sales cannot be generated.',
        })
    }

    res.send({ totalnumbers: totalNumber.pop().totalnumbers })
})

router.get(`/get/count`, async (req, res) => {
    const treatmentCount = await TreatmentEntry.countDocuments((count) => count)

    if (!treatmentCount) {
        res.status(codes.BAD_REQUEST).json({ success: false })
    }
    res.send({ treatmentCount })
})

router.get(`/get/usertreatments/:userid`, async (req, res) => {
    const { userid } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(userid, res)

    const userTreatmentList = await Treatment.find({ user: userid })
        .populate({
            path: 'treatmentEntries',
            populate: {
                path: 'patient',
                populate: 'status',
            },
        })
        .sort({ dateOrdered: -1 })

    if (!userTreatmentList) {
        res.status(codes.INTERNAL_SERVER_ERROR).json({ success: false })
    }
    res.send(userTreatmentList)
})

module.exports = router
