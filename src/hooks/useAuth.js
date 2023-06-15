import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user, loading } = useSelector(state => state.auth)
    const isAuth = Boolean(user)

    return {
        isAuth,
        loading,
        user
    }
}