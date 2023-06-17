import { httpService } from "./http.service";

export const postService = {
    getAllPosts: async (params) => {
        try {
            const { data } = await httpService.get('/posts', {
                params,
            })
            return data
        } catch (err) {
            console.warn(err);
            return { name: err.name, code: err.code, message: err.message }
        }
    },
    getUserPosts: async (params) => {
        try {
            const { data } = await httpService.get('/me/posts', params)
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

    },
    updatePostId: async (id, postData) => {
        try {
            const { data } = await httpService.patch(`/posts/${id}`, postData)
            return data
        } catch (err) {
            console.warn(err);
        }

    },
    createPost: async (postData) => {
        try {
            const { data } = await httpService.post('/posts', postData)
            return data
        } catch (err) {
            console.warn(err);
            return { name: err.name, code: err.code, message: err.message }
        }
    },
}