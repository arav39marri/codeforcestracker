// import { createSlice } from '@reduxjs/toolkit'
// const initialState = {
//     value: []
//   }
//   export const mySlice = createSlice({
//     name:'mySlice',
//     initialState,
//     reducers:{
//         setData: (state, action) => {
//             state.items.push(action.payload);
//           }
        
//     }
//   });
//   export const { setData } = mySlice.actions;
//   export default mySlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // Global store array for fetched data
};

export const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.items = action.payload; // Replace the entire array with fetched data
    }
  }
});

export const { setData } = mySlice.actions;
export default mySlice.reducer;

