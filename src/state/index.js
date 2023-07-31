import { createSlice } from "@reduxjs/toolkit";

//this will be the state that is store in the Global state
//so, it will be accessable throughtout the entire application
const initialState = {
    mode: "light",
    user: null, //"", //this do something
    token: null, //"",
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    //this action/fucntion:
    //the modify the Global state in the initialState code above
    reducers: {
        setMode: (state) => {
            //this will take cake of switching mode if it's LIGHT switch it to DARK
            //if it's DARK switch it to LIGHT
            //Note: this 'state.mode' reference to the current 'mode: "light" line within initialSate above'
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            //this the info from 'user' parameter from 'action' parameter/payload
            //console.log("This is from state/index.js: " + action);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        //when the user hit the 'Log out Button': 'state' will be reset to have nothing in there
        setLogOut: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User Friend Non-Existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        //this is most complicated one
        setPost: (state, action) => {
            //grasping a list of post and map through each one
            const updatedPosts = state.posts.map((post) => {
                //                  current post that is sent thorugh this function
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.post = updatedPosts;
        },
    },
});

//this is the part of Redux toolkits
export const { setMode, setLogin, setLogOut, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;

//Note: this will be the entire "State"