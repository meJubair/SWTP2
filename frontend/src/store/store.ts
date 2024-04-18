import {configureStore} from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        calendar: calendarReducer,
        user: userReducer
    }
})