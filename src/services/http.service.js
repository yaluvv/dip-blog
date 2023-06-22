import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const http = axios.create({
    baseURL
})

http.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export const httpService = {
    get: http.get,
    post: http.post,
    patch: http.patch,
    delete: http.delete
}