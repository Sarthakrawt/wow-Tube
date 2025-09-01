import { createSlice } from "@reduxjs/toolkit";


const videoSlice = createSlice({
    name:"video",
    initialState: {
        videoId: "",
    },
   
    reducers:
    {
    addVideo: (state,action)=>{
       state.videoId = action.payload.videoId;
    },
    deleteVideo:(state) =>{
        state.videoId = "";
    }}
})
export const {addVideo, deleteVideo}  = videoSlice.actions
export default videoSlice.reducer;
