import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice(
    {
        name: "user",
        initialState: {
           userLoading: false,
           loading : true,
          
        },
        reducers:{
         addUser : (state,action)=>{
             state.userLoading = action.payload.userLoading;
         },
         setLoading: (state,action)=>{
            state.loading = action.payload.loading;
         }
         ,
         removeUser: (state)=>{
            state.userLoading = false;
         }
        }
    })

    export const {addUser, removeUser,setLoading} = authSlice.actions;

    export default authSlice.reducer;