const express = require('express')
const {addReview, getReview} = require('../controller/review')
const router = express.Router({mergeParams: true})

// advanced middleware
const review = require('../models/Review')
const advancedResult = require('../middleware/advancedResult')

router.route('/').post(addReview).get(advancedResult(review, {
    path: 'user',
    select: 'name _id email'
}, {
    path: 'student',
    select: 'name _id email'
}), getReview)

module.exports = router