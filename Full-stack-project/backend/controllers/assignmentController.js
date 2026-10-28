import asyncHandler from 'express-async-handler'
import assignmentModel from '../models/assignmentModel.js'

// @desc    Get assignment
// @route   GET /api/goals
// @access  Private
const getAssignment = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({ user: req.user.id })

    res.status(200).json({goals})
})

// @desc    Get assignment
// @route   GET /api/goals
// @access  Private
const setAssignment = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({ user: req.user.id })

    res.status(200).json({goals})
})

// @desc    Get assignment
// @route   GET /api/goals
// @access  Private

const updateAssignment = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({ user: req.user.id })

    res.status(200).json({goals})
})

// @desc    Get assignment
// @route   GET /api/goals
// @access  Private
const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await assignmentModel.findById(req.params.id)

    if(!assignment) {
        res.status(400)
        throw new Error('Goal not found')
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