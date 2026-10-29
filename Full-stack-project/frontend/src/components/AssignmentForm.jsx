import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createAssignment} from '../features/assignments/assignmentSlice'

import React from 'react'

function AssignmentForm({courseId}) {
    const [assignment, setAssignment] = useState('')
    const [dueDate, setDueDate] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createAssignment({assignment, dueDate, courseId}))

        setAssignment('')
        setDueDate('')
    }

  return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor='text'>Enter assignment</label>
            <input type='text' id='text' value={assignment} onChange={(e) => setAssignment(e.target.value)} required/>
        </div>
        <div className="form-group">
            <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
        </div>
        <div className="form-group">
            <button className='btn btn-block' type='submit'>Add Assignment</button>
        </div>
    </form>
)
}

export default AssignmentForm