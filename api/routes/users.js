require('dotenv').config()
const express = require('express')
const User = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const codes = require('../helpers/error.codes')
const helpers = require('../helpers/helpers')

const router = express.Router()

/**
 * Hash env variable
 */

const HASH_SECRET = Number(process.env.HASH_SECRET)

/**
 * Get all [users]. In the context of this application, a [user] includes [nurses]; and [nurses]
 * include [doctors] and [others] authorised to use the application.
 */

router.get('/', async (req, res) => {
    const patients = await User.find().select(' -hash -__v ')

    if (!patients) {
        return res.status(codes.INTERNAL_SERVER_ERROR).json({ success: false })
    }

    res.status(codes.OK).send(patients)
})

/**
 * Get [user] based on [id].
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    const user = await User.findById(id).select(' -hash -__v ')

    if (!user) {
        return res.status(codes.NOT_FOUND).json({ success: false })
    }

    res.status(codes.OK).send(user)
})

/**
 * Create new [user].
 * @method addUser
 * @param {name}, @param {email}, @param {phone}, @param {department}, @param {password} of @param {user}
 * @param {isNurse} sets priviliges to the @param {user}
 */

router.post('/register', async (req, res) => {
    const { name, email, phone, department, password, isNurse } = req.body
    if (!password) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'Password field is required.' })
    }
    let user = new User({
        name,
        email,
        phone,
        department,
        hash: bcrypt.hashSync(password, HASH_SECRET),
        isNurse
    })

    user = await user.save()

    if (!user) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'User not created.' })
    }

    res.status(codes.OK).send(user)
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const secret = process.env.SECRET
    if (!user) {
        return res.status(codes.BAD_REQUEST).send('The user not found.')
    }

    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isNurse: user.isNurse
            },
            secret,
            { expiresIn: '1d' }
        )
        res.status(codes.OK).send({ user: user.email, token })
    } else {
        res.status(codes.BAD_REQUEST).send('password is wrong!')
    }
})

/**
 * Create new [user].
 * @method updateUser
 * @param {name}, @param {email}, @param {phone}, @param {department}, @param {password} of @param {user}
 * @param {isNurse} sets priviliges to the @param {user}
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params
    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    const { name, email, phone, department, password, isNurse } = req.body
    let currPassword
    const currUser = await User.findById(id)
    if (password) {
        currPassword = await bcrypt.hash(password, 10)
    } else {
        currPassword = currUser.hash
    }

    const user = await User.findByIdAndUpdate(
        id,
        {
            name,
            email,
            phone,
            department,
            isNurse,
            hash: currPassword
        },
        { new: true }
    )

    if (!user) {
        return res
            .status(codes.BAD_REQUEST)
            .json({ success: false, message: 'Error updating user.' })
    }

    res.status(codes.OK).send(user)
})

/**
 * Create new [user].
 * @method deleteUser
 * @param {id} of @param {user}
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    // validate ID: responds with error-message otherwise
    helpers.validateID(id, res)

    User.findByIdAndRemove(id)
        .then((user) => {
            if (user) {
                return res
                    .status(codes.OK)
                    .json({ success: true, message: 'User deleted.' })
            } else {
                return res
                    .status(codes.NOT_FOUND)
                    .json({ success: false, message: 'User not found.' })
            }
        })
        .catch((err) => {
            res.status(codes.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: err
            })
        })
})

router.get('/get/count', async (req, res) => {
    const count = await User.countDocuments((count) => count)

    if (!count)
        return res.status(codes.INTERNAL_SERVER_ERROR).json({ success: false })

    res.status(codes.OK).send({ count })
})

module.exports = router
