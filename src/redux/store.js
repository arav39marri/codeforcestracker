    import { configureStore } from '@reduxjs/toolkit'
    import mySliceReducer from './features/fetch';
    export const store = configureStore({
    reducer: {
        mySlice: mySliceReducer 
    },
    })