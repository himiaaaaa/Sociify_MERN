import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: JSON.parse(window?.localStorage.getItem("theme")) ?? "light",
}

console.log(initialState)

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action){
            state.theme = action.payload;
            localStorage.setItem("theme", JSON.stringify(action.payload))
        }
    }
})

export default themeSlice.reducer;

// Define an action creator function called 'SetTheme'
export function SetTheme(value) {
    // Return a function that takes 'dispatch' as an argument
    return (dispatch) => {
        // Dispatch the 'setTheme' action from the themeSlice with the provided 'value'
        dispatch(themeSlice.actions.setTheme(value));
    };
}