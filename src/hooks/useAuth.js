import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user, loading } = useSelector(state => state.auth)
    const isAuth = Boolean(user)
    const isAdmin = isAuth && user.role === 'Admin'


    return {
        isAuth,
        loading,
        user,
        isAdmin
    }
}