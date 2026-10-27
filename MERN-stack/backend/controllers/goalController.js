import asyncHandler from 'express-async-handler'
import goalModel from '../models/goalModel.js'

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find()

    res.status(200).json({goals})
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await goalModel.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await goalModel.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({updatedGoal})
})

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await goalModel.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await goalModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        id: req.params.id
    })
})



export { getGoals, setGoal, updateGoal, deleteGoal }