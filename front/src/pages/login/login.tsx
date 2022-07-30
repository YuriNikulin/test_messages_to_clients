import { Dialog, Classes, Spinner } from '@blueprintjs/core'
import { FORM_ERROR } from 'final-form'
import { useAuth } from 'hooks/useAuth'
import { useCallback } from 'react'
import { useForm } from 'react-final-form'
import { ResponseType } from 'types'
import { sleep } from 'utils/common'
import { LoginForm } from './login-form'

const Login: FunctionComponent = () => {
    const { authorize } = useAuth()
    
    const handleSubmit: FormSubmitHandler = useCallback(async (values, form) => {
        // if (1) {
        //     return new Promise((resolve) => {
        //         sleep(5000).then(() => {
        //             console.log('gonna resolve')
        //             return resolve({
        //                 login: 'error',
        //                 [FORM_ERROR]: 'error too'
        //             })
        //         })
        //     })
        // }
        const res = await authorize({
            login: values.login,
            password: values.password
        })

        if (res?.type === ResponseType.ERRROR) {
            return res.data
        }
    }, [authorize])

    return (
        <Dialog isOpen title="Авторизация" isCloseButtonShown={false}>
            <div className={Classes.DIALOG_BODY}>
                <LoginForm onSubmit={handleSubmit} />
            </div>
        </Dialog>
    )
}

export { Login }