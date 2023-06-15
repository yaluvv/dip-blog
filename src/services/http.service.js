import axios from "axios";

const baseURL = 'http://localhost:4444'

const http = axios.create({
    baseURL
})

http.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export const httpService = {
    get: http.get,
    post: http.post
}