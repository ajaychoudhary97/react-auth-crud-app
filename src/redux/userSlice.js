import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    setUser(state, action) {
      const myUserPayload = {
        ...action.payload,
        is_admin: String(action.payload.is_admin),
      };
      state.userData = myUserPayload;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
