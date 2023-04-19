const express = require('express')
const router = express.Router()
const {getUsers, getUser, createUser, deleteUser, updateUser, uploadUserPhoto} = require('../controller/users')

// advanced result
const User = require('../models/User')
const advancedResults = require('../middleware/advancedResult')

const jobsRouter = require('./jobs')
router.use('/:usersId/jobs', jobsRouter)

router.route('/:id/photo').put(uploadUserPhoto)

router.route('/').get(advancedResults(User, 'jobs'), getUsers).post(createUser)
router.route('/:id').put(updateUser).delete(deleteUser).get(getUser)

module.exports = router