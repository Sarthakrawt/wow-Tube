import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom"
import LoginPage from './page/LoginPage.jsx'
import HomePage from './page/HomePage.jsx'
import SignupPage from './page/SignupPage.jsx'
import ProfilePage from './page/ProfilePage.jsx'
import VideoUploadPage from './page/VideoUploadPage.jsx'
import IndivisualChannel from './page/IndivisualChannel.jsx'
import { Provider } from 'react-redux'
import store from './store/authStore.js'
import ChannelProfiles from './page/ChannelProfiles.jsx'
import ProfileUpdatePage from "./page/ProfileUpdatePage.jsx"
import PlayListpage from './page/PlayListpage.jsx'
import WatchHistory from './component/WatchHistory.jsx'
import About from './component/About.jsx'
import AddTweet from './component/AddTweet.jsx'
import Tweet from './component/Tweet.jsx'
import Setting from './component/Setting.jsx'
import ChangePassword from './component/ChangePassword.jsx'
let router = createBrowserRouter(
  [
   {
     path:"/",
  element : <App/>,
  children: [
   { 
    path: "home",
    element: <HomePage/>
  },
    {
      path: "/login",
      element:<LoginPage/>
    },
    {
      path: "/signup",
      element:<SignupPage/>
    },{
      path:"/profile",
      element:<ProfilePage/>
    },{
      path:"/video-upload",
      element:<VideoUploadPage/>
    },{
      path:"/video",
      element:<IndivisualChannel/>
    },{
      path:"/channel-profile",
      element:<ChannelProfiles/>
    },{
      path:"/profile-update",
      element:<ProfileUpdatePage/>
    },{
      path:"/playlist",
      element:<PlayListpage/>
    },{
      path:"/watch-history",
      element:<WatchHistory/>
    },{
      path:"/about",
      element:<About/>
    },{
      path: "/tweet",
      element: <AddTweet/>
    },{
      path:"/all-tweets",
      element:<Tweet/>
    },{
      path:"/setting",
      element:<Setting/>
    },{
      path:"/change-password",
      element:<ChangePassword/>
    }
  ]}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
 <RouterProvider router={router}></RouterProvider>
    </Provider>
   
    
  </StrictMode>,
)
