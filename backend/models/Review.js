const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, 'enter user id']
    },
    comment: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 3,
        maxlength: 5,
        minlength: 1
    }
})

// Static method to get average of course ratings
ReviewSchema.statics.getAverageCost = async function(studentId) {
  
    const arr = await this.aggregate([
      {
        $match: {student: studentId}
      },
      {
        $group: {
          _id: '$student',
          averageRating: { $avg: '$rating'}
        }
      }
    ])
    try {
        await this.model('Student').findByIdAndUpdate(studentId, {
            averageRating: arr[0].averageRating
        })
    } catch (err) {
        console.error(err)
    }
  }
  
  // call getAverageRating after save
  ReviewSchema.post('save', function(){
    this.constructor.getAverageCost(this.student)
  })

module.exports = mongoose.model('Review', ReviewSchema)