import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        calendars: [],
    },
    reducers: {}
})

export default calendarSlice.reducer;