import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user, loading } = useSelector(state => state.auth)

    const isAuth = Boolean(localStorage.getItem('token')) || Boolean(user)
    const isAdmin = user?.role === 'Admin'

    console.log(Boolean(localStorage.getItem('token')) || Boolean(user));


    return {
        isAuth,
        loading,
        user,
        isAdmin
    }
}