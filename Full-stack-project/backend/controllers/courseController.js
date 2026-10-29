import asyncHandler from 'express-async-handler'
import courseModel from '../models/courseModel.js'

// @desc    Get course
// @route   GET /api/courses
// @access  Private
const getCourse = asyncHandler(async (req, res) => {
    const courses = await courseModel.find({ user: req.user.id })

    res.status(200).json({courses})
})

// @desc    Set course
// @route   POST /api/courses
// @access  Private
const setCourse = asyncHandler(async (req, res) => {
    if(!req.body.courseName) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const course = await courseModel.create({
        user: req.user.id,
        courseName: req.body.courseName,
        completed: false
    })

    res.status(200).json(course)
})

// @desc    Update course
// @route   PUT /api/course/:id
// @access  Private

const updateCourse = asyncHandler(async (req, res) => {
    const course = await courseModel.findById(req.params.id)

    if(!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(course.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateCourse = await courseModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({updateCourse})
})

// @desc    Delete course
// @route   Delete /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await courseModel.findById(req.params.id)

    if(!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(course.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await courseModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        id: req.params.id
    })
})


export { getCourse, setCourse, updateCourse, deleteCourse }