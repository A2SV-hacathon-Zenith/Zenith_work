const asyncHandler = require('../middleware/async')
const Review = require('../models/Review')
const Student = require('../models/Students')
// @desc Add Review for student
// @route POST /api/v1/students/:studentsId/reviews
// @access public
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.student = req.params.studentsId

    const student = await Student.findById(req.params.studentsId)

    if (!student) {
        return next(new ErrorResponse(`No student with id of ${req.params.studentsId}`, 404))
    }

    const review = await Review.create(req.body)

    res.status(200).json({success:true, data: review})
})


// @desc get Review for student
// @route GET /api/v1/students/:studentsId/reviews
// @access public
exports.getReview = asyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.studentsId)

    if (!student) {
        return next(new ErrorResponse(`No student with id of ${req.params.studentsId}`, 404))
    }

    res.status(200).json(res.advancedResults)
})