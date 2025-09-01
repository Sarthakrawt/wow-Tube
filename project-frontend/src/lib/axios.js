import axios from "axios"

export const axiosInstance = axios.create({
     baseURL: "http://localhost:8000/api/v1/users",
    withCredentials: true
})
export const axiosInstanceDashboard = axios.create({
    baseURL:"http://localhost:8000/api/v1/dashboard",
    withCredentials: true
})
export const axiosInstanceVideo = axios.create({
    baseURL:"http://localhost:8000/api/v1/videos",
    withCredentials: true
})
export const axiosInstanceSub = axios.create({
    baseURL: "http://localhost:8000/api/v1/subscribe",
    withCredentials: true
})
export const axiosInstancelike = axios.create({
    baseURL:"http://localhost:8000/api/v1/like",
    withCredentials: true
})
export const axiosInstancePlaylist = axios.create({
    baseURL:"http://localhost:8000/api/v1/playlist",
    withCredentials: true
})
export const axiosInstanceComment = axios.create({
    baseURL:"http://localhost:8000/api/v1/comment",
    withCredentials: true
})
export const axiosInstanceTweet = axios.create({
    baseURL:"http://localhost:8000/api/v1/tweet",
    withCredentials: true
})
