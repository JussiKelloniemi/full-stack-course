import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import assignmentService from './assignmentService'

const initialState = {
    assignments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createAssignment = createAsyncThunk('assignments/create', async (assignmentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await assignmentService.createAssignment(assignmentData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAssignments = createAsyncThunk('assignments/getAll', async (courseId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await assignmentService.getAssignments(courseId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteAssignment = createAsyncThunk('assignments/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await assignmentService.deleteAssignment(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateAssignment = createAsyncThunk('assignments/update', async ({ id, data }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await assignmentService.updateAssignment(id, data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.assignments.push(action.payload)
            })
            .addCase(createAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAssignments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAssignments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.assignments = action.payload
            })
            .addCase(getAssignments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.assignments = state.assignments.filter((assignment) => assignment._id !== action.payload.id)
            })
            .addCase(deleteAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAssignment.fulfilled, (state, action) => {
                const updatedAssignment = action.payload.updateAssignment

                state.isLoading = false
                state.isSuccess = true

                state.assignments = state.assignments.map((assignment) => assignment._id === updatedAssignment._id ? updatedAssignment : assignment)
            })
            .addCase(updateAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer