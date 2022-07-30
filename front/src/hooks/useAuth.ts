import { api } from 'api';
import { endpoints } from 'constants/endpoints';
import { useCallback, useState } from 'react'
import { IUser, ResponseType } from 'types';
import { saveToken } from 'utils/auth';
import { isObject } from 'utils/common';

export const useAuth = () => {
    const [state, setState] = useState<{
        isLogged: boolean;
        user: IUser | null;
    }>({
        isLogged: false,
        user: null
    })

    const authorize = useCallback(async (data: { login: string; password: string }) => {
        const res = await api.makeRequest(endpoints.login, {
            body: data,
        })

        if (res.type === ResponseType.SUCCESS && isObject(res.data) && res.data.token ) {
            saveToken(res.data.token as string)
            const userInfo = await api.makeRequest(endpoints.getUserInfo)
            if (isObject(userInfo.data) && userInfo.data.user) {
                setState({
                    isLogged: true,
                    user: userInfo.data.user as IUser
                })
            }
        }

        return res
    }, [state])

    return {
        isLogged: state.isLogged,
        authorize
    }
}