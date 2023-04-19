const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add name']
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
      required: [true, 'Please add phone number'],
      unique: true
    },
    averageRating: {
      type: Number
    },
    photo: {
      type: String,
      default: '/uploads/default.jpg'
    },
    email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ],
        unique: true,
        required: [true, 'Please add an email']
      },
      address: {
        type: String,
        required: [true, 'Please add an address']
      },
      location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },
      skills: {
          type: [String],
          required: [true, 'please add a minmum skill'],
          enum: ["Web Development", "UI/UX", "Business", 'web design', 'web development', 'graphic design', 'digital marketing'
          , 'seo', 'data alalysis', 'mobile development', 'video editing', 'translation', "Data Science", "Business", "Mobile Development",]
      },
      dob: {
        type: Date,
        required: [true, 'please enter a date']
      },
      department: {
        type: String,
        required: [true, 'please enter a department'],
        enum: ['Software Engeenering', 'chemical engineering', 'civil engineering', 'electrical engineering', "mechanical engineering"]
      },
      university: String,
      password: {
        type: String,
        required: [true, 'please add a password'],
        minlength: 6,
        select: false
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt:{
        type: Date,
        default: Date.now
      }
})

// Encrypt password using bcrypt
StudentSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
StudentSchema.methods.getSignedJwtToken = function name(params) {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// match user entered password to hashed password in database
StudentSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('Student', StudentSchema)