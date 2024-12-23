import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      addUser: (state, action) => action.payload, // Sets the state to the dispatched payload
      removeUser: () => null, // Resets the state to null
    },
  });
  
  export const { addUser, removeUser } = userSlice.actions;
  export default userSlice.reducer;
  