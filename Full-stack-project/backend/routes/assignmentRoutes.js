import express from 'express'
import { getAssignment, setAssignment, updateAssignment, deleteAssignment } from '../controllers/assignmentController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAssignment).post(protect, setAssignment)
router.route('/:id').delete(protect, deleteAssignment).put(protect, updateAssignment)

export default router