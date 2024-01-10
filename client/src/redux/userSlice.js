/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
//import { user } from "../assets/data";

const initialState = {
    user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
    edit: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logout(state) {
            state.user = null;
            localStorage?.removeItem("user")
        },
        updateAProfile(state,action){
            state.edit = action.payload;
        }
    }
})

// export default userSlice.reducer
// export const { login, logout, updateAProfile } = userSlice.actions
// export const UserLogin = (user) => {
//     return (dispatch) => {
//       dispatch(login(user));
//     };
// }

// export const UserLogout = () => {
//     return (dispatch) => {
//       dispatch(logout())
//     };
//   }

// export const updateProfile = (val) => {
//     return(dispatch)=>{
//       dispatch(updateAProfile(val))
//     }
//   }



export default userSlice.reducer;

// Define an action creator function called 'UserLogin'
export function UserLogin(user) {
  // Return a function that takes 'dispatch' and 'getState' as arguments
  return (dispatch, getState) => {
    // Dispatch the 'login' action from the userSlice with the provided 'user' data
    dispatch(userSlice.actions.login(user));
  };
}

// Define an action creator function called 'UserLogout'
export function UserLogout() {
  // Return a function that takes 'dispatch' and 'getState' as arguments
  return (dispatch, getState) => {
    // Dispatch the 'logout' action from the userSlice
    dispatch(userSlice.actions.logout());
  };
}
export function updateProfile(val){
  return(dispatch, getState)=>{
    dispatch(userSlice.actions.updateAProfile(val));
  }
}