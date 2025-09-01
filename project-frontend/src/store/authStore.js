import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice"
import userReducer from "./userSlice"
const store = configureStore({
    reducer: {
        video: videoReducer,
        user: userReducer,
    }
})

export default store;