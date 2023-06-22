import { httpService } from './http.service';

export const authService = {
    login: async (payload) => {
        try {
            const { data } = await httpService.post('/auth/login', payload)
            return data
        } catch (err) {
            console.error(err);
            return { name: err.name, code: err.code, message: err.response.data.message }
        }
    },
    signup: async (payload) => {
        try {
            const { data } = await httpService.post('/auth/register', payload)
            return data
        } catch (err) {
            console.error(err);
            return { name: err.name, code: err.code, message: err.response.data.message }
        }
    },
    me: async () => {
        try {
            const { data } = await httpService.get('/auth/me')
            return data
        } catch (err) {
            if (err.response.data.message === 'Нет доступа') {
                return null
            }
            return { name: err.name, code: err.code, message: err.response.data.message }
        }
    }
}