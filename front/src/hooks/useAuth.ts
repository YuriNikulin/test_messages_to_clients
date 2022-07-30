import { api } from 'api';
import { endpoints } from 'constants/endpoints';
import { useCallback, useState } from 'react'

export const useAuth = () => {
    const [state, setState] = useState({
        isLogged: false,
        user: null
    })

    const authorize = useCallback(async (data: { login: string; password: string }) => {
        const res = await api.post(endpoints.login, {
            body: data
        })

        return res
    }, [])

    return {
        isLogged: state.isLogged,
        authorize
    }
}