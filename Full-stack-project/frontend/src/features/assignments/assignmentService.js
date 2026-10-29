import axios from 'axios'

const API_URL = '/api/assignments/'


// Creates course and returns the course data
const createAssignment = async (assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, assignmentData, config)

    return response.data
}

const getAssignments = async (courseId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // gets the course assignment is apart of
    const response = await axios.get(`${API_URL}?courseId=${courseId}`, config)

    return response.data.assignment
}

const updateAssignment = async (assignmentId, assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + assignmentId, assignmentData, config)
    return response.data
}

const deleteAssignment = async (assignmentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + assignmentId, config)

    return response.data
}

const assignmentService = {
    createAssignment,
    getAssignments,
    deleteAssignment,
    updateAssignment
}

export default assignmentService