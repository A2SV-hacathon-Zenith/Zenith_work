const Student = require('../models/Students')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Jobs = require('../models/Jobs')
const path = require('path')

// @desc Get all students
// @route Get /api/v1/students
// @access public 
exports.getStudents = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc Get single students
// @route Get /api/v1/students/:id
// @access public 
exports.getStudent = asyncHandler(async (req, res, next) => {
    const stud = await Student.findById(req.params.id)

    if (!stud){
        return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: stud})
})

// @desc create new students
// @route POST /api/v1/students
// @access private 
exports.createStudent = asyncHandler(async (req, res, next) => {
    const stud = await Student.create(req.body)
    res.status(201).json({success: true, data: stud})
})

// @desc update stud
// @route PUT /api/v1/students/:id
// @access private 
exports.updateStudent = asyncHandler(async (req, res, next) => {
    const stud = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!stud){
        return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: stud})
})

// @desc delete stud
// @route DELETE /api/v1/students/:id
// @access private 
exports.deleteStudent = asyncHandler(async (req, res, next) => {
    const stud = await Student.findByIdAndDelete(req.params.id);

    if (!stud) {
        return next(
        new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
        );
    }

    // delete stud dependencies
    // Cascade delete courses when a stud is deleted
    await Jobs.deleteMany({stud: stud._id})

    res.status(200).json({ success: true, data: {} });
})


// @desc upload photo for stud
// @route PUT /api/v1/students/:id/photo
// @access private 
exports.uploadStudentPhoto = asyncHandler(async (req, res, next) => {
    const stud = await Student.findById(req.params.id);

    if (!stud) {
        return next(
        new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
        );
    }

    if (!req.files){
        return next(
            new ErrorResponse(`Please upload a file ${req.params.id}`, 400)
            );
    }

    const file = req.files.file

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')){
        return next(
            new ErrorResponse(`Please upload an image file ${req.params.id}`, 400)
            );
    }

    // check file size

    if (file.size > process.env.MAX_FILE_UPLOAD){
        return next(
            new ErrorResponse(`Please upload an image less than 
            ${process.env.MAX_FILE_UPLOAD/1000000} mv ${req.params.id}`, 400)
            );
    }

    // Create custom file name
    file.name = `photo_${stud.id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            return next(
                new ErrorResponse(`Problem with uploading ${req.params.id}`, 500)
                );
        }
        await Student.findByIdAndUpdate(req.params.id, {photo: `/uploads/${file.name}`})
        res.status(200).json({
            success: true,
            data: `/uploads/${file.name}`
        })
    })
})