import { httpService } from "./http.service";

export const postService = {
    getAllPosts: async () => {
        try {
            const { data } = await httpService.get('/posts')
            return data
        } catch (err) {
            console.warn(err);
            return { name: err.name, code: err.code, message: err.message }
        }
    },
    getUserPosts: async (params) => {
        try {
            const { data } = await httpService.get('/me/posts', params)
            console.log(params);
            return data
        } catch (err) {
            console.warn(err);
        }
    },
    getAllTags: async () => {
        try {
            const { data } = await httpService.get('/tags')
            return data
        } catch (err) {
            console.warn(err);
            return { name: err.name, code: err.code, message: err.message }
        }
    },
    getPostId: async (id) => {
        try {
            const { data } = await httpService.get(`/posts/${id}`)
            return data
        } catch (err) {
            console.warn(err);
        }

    }
}