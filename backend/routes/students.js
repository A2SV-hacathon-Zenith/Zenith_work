const express = require('express')
const router = express.Router()
const {getStudents, getStudent, createStudent, deleteStudent, updateStudent, uploadStudentPhoto} = require('../controller/students')

// advanced result
const Student = require('../models/Students')
const advancedResults = require('../middleware/advancedResult')


router.route('/:id/photo').put(uploadStudentPhoto)

// .post(createStudent)
router.route('/').get(advancedResults(Student), getStudents)
router.route('/:id').put(updateStudent).delete(deleteStudent).get(getStudent)

module.exports = router