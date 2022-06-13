import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import firebase

const initialState = {
  users: localStorage.getItem('registeredUsers')
    ? JSON.parse(localStorage.getItem('registeredUsers'))
    : [],
  currentUser: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser'))
    : {
        userName: '',
        userId: '',
        isVerified: '',
        isLogged: false,
      },

  userLogged: window.localStorage.getItem('isLogged')
    ? JSON.parse(window.localStorage.getItem('isLogged'))
    : false,
};

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addRegisteredUser: (state, action) => {
      // add to localstorage
      state.users.push(action.payload);

      window.localStorage.setItem(
        'registeredUsers',
        JSON.stringify(state.users)
      );
    },
    userStatus: (state, action) => {
      state.userLogged = action.payload;

      window.localStorage.setItem('isLogged', JSON.stringify(action.payload));
    },
    loggedUser: (state, action) => {
      state.currentUser = action.payload;

      window.localStorage.setItem(
        'currentUser',
        JSON.stringify(action.payload)
      );
    },
    loggoutUser: (state, action) => {
      state.currentUser = action.payload;

      window.localStorage.setItem(
        'currentUser',
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { addRegisteredUser, loggedUser, loggoutUser, userStatus } =
  userReducer.actions;

export default userReducer.reducer;
