import mongoose from 'mongoose'

const assignmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },
    assignment: {
        type: String,
        required: [true, 'Please add a text value']
    },
    dueDate: {
        type: Date,
        required: [true, 'Please add a date']
    },
    completed: {
        type: Boolean
    }
}, {
    timestamps: true
})

const assignmentModel = mongoose.model('assignmentModel', assignmentSchema)

export default assignmentModel