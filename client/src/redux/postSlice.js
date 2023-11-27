import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: {}
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducer: {
        getPosts(state, action) {
            state.posts = action.payload;
        },
    }
})

export default postSlice.reducer;

export function GetPosts(post) {
    return(dispatch, getState) => {
        dispatch(postSlice.actions.getPosts(post))
    }
}