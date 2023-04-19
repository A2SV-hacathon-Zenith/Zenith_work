const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'please add a course title']
    },
    description: {
        type: String, 
        required: [true, 'please add description']
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      required: [true, 'Please add phone number']
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ],
      required: [true, 'Please add email address']
    },
    skillsRequired: {
        type: [String],
        required: [true, 'please add a minmum skill']
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    paymentAmount: {
      type: Number,
      required: [true, 'Please add an amount']
    },
    deadline: {
        type: Date,
        default: new Date().getTime() + (86400000)*5
    },
    jobType: {
        type: [String],
        required: [true, 'please enter job type']
    },
    jobCategory: {
        type: String,
        required: [true, 'please enter the job category']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Job', JobSchema)