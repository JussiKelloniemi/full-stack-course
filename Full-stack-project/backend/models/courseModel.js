import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },
    courseName: {
        type: String,
        required : true
    },
    completed: {
        type: Boolean,
        required: false
    }
},{
    timestamps: true
})

const courseModel = mongoose.model('courseModel', courseSchema)

export default courseModel