import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import courseReducer from '../features/courses/courseSlice'
import assignmentReducer from '../features/assignments/assignmentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    assignments: assignmentReducer
  },
});
