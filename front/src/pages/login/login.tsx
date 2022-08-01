import { Dialog, Classes } from '@blueprintjs/core'
import { useAuth } from 'containers/Auth'
import { useLoading } from 'hooks/useLoading'
import { useCallback, useEffect, useState } from 'react'
import { ResponseType } from 'types'
import { TEXT_AUTHORIZATION, TEXT_REGISTRATION } from './login-constants'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

const Login: FunctionComponent = () => {
    const { authorize, register } = useAuth()
    const { executeAsyncOperation, isLoading } = useLoading()
    const [ isRegistration, setIsRegistration ] = useState(false)

    const toggleRegistration = useCallback(() => {
        setIsRegistration(!isRegistration)
    }, [isRegistration])

    useEffect(() => {
        document.title = isRegistration ? TEXT_REGISTRATION : TEXT_AUTHORIZATION
    }, [isRegistration])
    
    const handleSubmit = useCallback(async (values: Record<string, any>, type: 'login' | 'register') => {
        const fn = type === 'login' ? authorize : register
        const res = await executeAsyncOperation(() => fn({
            login: values.login,
            password: values.password
        }))

        if (res?.type === ResponseType.ERRROR) {
            return res.data
        }
    }, [authorize, register, executeAsyncOperation])

    return (
        <Dialog
            isOpen
            title={isRegistration ? TEXT_REGISTRATION : TEXT_AUTHORIZATION}
            isCloseButtonShown={false}
            key={`${isRegistration}`}
        >
            <div className={Classes.DIALOG_BODY}>
                {
                    isRegistration
                    ? 
                        <RegisterForm
                            onSubmit={(v) => handleSubmit(v, 'register')}
                            isLoading={isLoading}
                            onAlternativeButtonClick={toggleRegistration}
                        />
                    :
                        <LoginForm
                            onSubmit={(v) => handleSubmit(v, 'login')}
                            isLoading={isLoading}
                            onAlternativeButtonClick={toggleRegistration}
                        />
                }
            </div>
        </Dialog>
    )
}

export { Login }