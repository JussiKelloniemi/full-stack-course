import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {deleteCourse} from '../features/courses/courseSlice'
import {getAssignments} from '../features/assignments/assignmentSlice'
import AssignmentForm from './AssignmentForm'
import AssignmentItem from './AssignmentItem'
import {FaTrash} from 'react-icons/fa'


function CourseItem({course}) {
    const dispatch = useDispatch()
    const {assignments} = useSelector((state) => state.assignments) 

    useEffect(() => {
        dispatch(getAssignments(course._id))
    }, [dispatch, course._id])

    const courseAssignment = assignments.filter(assignment => assignment.course === course._id)

  return (
    <div className='course'>
        <div className="course-items">
             <div>
                {new Date(course.createdAt).toLocaleString('en-US')}
            </div>
                <h2>{course.courseName}</h2>
                <button type='button' onClick={() => dispatch(deleteCourse(course._id))} className="close"><FaTrash /></button>

                <AssignmentForm courseId={course._id} />
        </div>
       <div className="course-assignments">
            {courseAssignment.map((assignment) => 
                <AssignmentItem key={assignment._id} assignment={assignment} />
            )}
        </div>
    </div>
  )
}

export default CourseItem