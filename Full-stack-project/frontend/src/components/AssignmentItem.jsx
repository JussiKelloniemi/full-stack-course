import {useDispatch} from 'react-redux'
import {deleteAssignment, updateAssignment} from '../features/assignments/assignmentSlice'
import {FaTrash} from 'react-icons/fa'

function AssignmentItem({assignment}) {
    const dispatch = useDispatch()

    const completed = () => {dispatch (updateAssignment({
        id: assignment._id,
        data: {completed: !assignment.completed}
    }))}

    const dueDate = new Date(assignment.dueDate).toLocaleDateString()

  return (
    <div className={`assignment ${assignment.completed ? 'completed' : ''}`} onDoubleClick={completed} style={{cursor: 'pointer'}} >
        <div>
            <h3>{assignment.assignment}</h3>
            <p></p>
            <p>Due Date: {dueDate}</p>
        </div>

        <button className='close' onClick={() => dispatch(deleteAssignment(assignment._id))} type='button' ><FaTrash/></button>
    </div>
  )
}

export default AssignmentItem