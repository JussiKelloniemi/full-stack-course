import asyncHandler from 'express-async-handler'
import assignmentModel from '../models/assignmentModel.js'

// @desc    Get assignment
// @route   GET /api/assignments
// @access  Private
const getAssignment = asyncHandler(async (req, res) => {
    const assignment = await assignmentModel.find({ 
        user: req.user.id,
        course: req.query.courseId
    })

    res.status(200).json({assignment})
})

// @desc    Set assignment
// @route   POST /api/assingments
// @access  Private
const setAssignment = asyncHandler(async (req, res) => {
    if(!req.body.assignment || !req.body.dueDate || !req.body.courseId)  {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const assignment = await assignmentModel.create({
        user: req.user.id,
        course: req.body.courseId,
        assignment: req.body.assignment,
        dueDate: req.body.dueDate,
        completed: false
    })

    res.status(200).json(assignment)
})

// @desc    Update assignment
// @route   PUT /api/assingments/:id
// @access  Private

const updateAssignment = asyncHandler(async (req, res) => {
    const assignment = await assignmentModel.findById(req.params.id)

    if(!assignment) {
        res.status(400)
        throw new Error('Assignment not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(assignment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateAssignment = await assignmentModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({updateAssignment})
})

// @desc    Delete assignment
// @route   Delete /api/assignments/:id
// @access  Private
const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await assignmentModel.findById(req.params.id)

    if(!assignment) {
        res.status(400)
        throw new Error('Assignment not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(assignment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await assignmentModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        id: req.params.id
    })
})


export { getAssignment, setAssignment, updateAssignment, deleteAssignment }