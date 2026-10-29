import express from 'express'
import { getCourse, setCourse, updateCourse, deleteCourse } from '../controllers/courseController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getCourse).post(protect, setCourse)
router.route('/:id').delete(protect, deleteCourse).put(protect, updateCourse)

export default router