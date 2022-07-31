import React, { useContext, useMemo } from 'react'
import { Spinner } from "@blueprintjs/core"
import { Login } from 'pages/login'
import { useCallback, useEffect, useState } from "react"
import { IUser, ResponseType } from 'types'
import { hasUserToken, isObject } from 'utils/common'
import { api } from 'api'
import { endpoints } from 'constants/endpoints'
import { saveToken } from 'utils/auth'
import { useDebouncedState } from 'hooks/useDebouncedState'

interface LoginParams {
    login: string;
    password: string;
}

type authAction = (data: { login: string, password: string }) => Promise<ApiResponse>

interface ContextState {
    isLogged: boolean;
    user: IUser | null;
    authorize: authAction;
    register: authAction;
    getUserInfo: () => any;
    usersChannels: Record<string, true>
}

export const AuthContext = React.createContext<ContextState>({
    isLogged: false,
    user: null,
    authorize: (() => {}) as any,
    register: (() => {}) as any,
    getUserInfo: () => {},
    usersChannels: {}
})

export const useAuth = () => useContext(AuthContext)

const Auth: FunctionComponent = ({ children }) => {
    const [state, setState] = useState<Pick<ContextState, 'isLogged' | 'user' | 'usersChannels'>>({
        isLogged: false,
        user: null,
        usersChannels: {}
    })
    const [isLoading, setIsLoading] = useDebouncedState(true)

    const generateUsersChannelsDict = (user: IUser) => {
        return user.channels.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
    }

    const getUserInfo = useCallback(async () => {
        if (hasUserToken()) {
            const userInfo = await api.makeRequest(endpoints.getUserInfo)
            if (isObject(userInfo.data) && userInfo.data.user) {
                const user = userInfo.data.user as IUser
                setState({
                    isLogged: true,
                    user: user,
                    usersChannels: generateUsersChannelsDict(user)
                })
                return userInfo.data.user
            }
        }

        return null
    }, [setState])

    const authorize = useCallback(async (data: LoginParams) => {
        const res = await api.makeRequest(endpoints.login, {
            body: { ...data },
        })

        if (res.type === ResponseType.SUCCESS && isObject(res.data) && res.data.token ) {
            saveToken(res.data.token as string)
            getUserInfo()
        }

        return res
    }, [getUserInfo])

    const register = useCallback(async (data: LoginParams) => {
        const res = await api.makeRequest(endpoints.register, {
            body: { ...data },
            showMessageFromBack: true
        })

        if (res.type === ResponseType.SUCCESS) {
            authorize(data)
        }

        return res
    }, [authorize])


    const checkUserInfo = useCallback(async () => {
        await getUserInfo()
        setIsLoading(false)
    }, [getUserInfo, setIsLoading])

    useEffect(() => {
        checkUserInfo()
    }, [])

    const contextValue = useMemo(() => {
        return {
            isLogged: state.isLogged,
            user: state.user,
            usersChannels: state.usersChannels,
            authorize,
            register,
            getUserInfo,
        }
    }, [state, authorize, register, getUserInfo])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {state.isLogged ? children : <Login />}
        </AuthContext.Provider>
    )
}

export { Auth }