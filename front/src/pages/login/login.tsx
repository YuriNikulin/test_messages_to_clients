import { Dialog, Classes, Spinner } from '@blueprintjs/core'
import { FORM_ERROR } from 'final-form'
import { useAuth } from 'hooks/useAuth'
import { useLoading } from 'hooks/useLoading'
import { useCallback } from 'react'
import { useForm } from 'react-final-form'
import { ResponseType } from 'types'
import { sleep } from 'utils/common'
import { LoginForm } from './login-form'

const Login: FunctionComponent = () => {
    const { authorize } = useAuth()
    const { executeAsyncOperation, isLoading } = useLoading()
    
    const handleSubmit: FormSubmitHandler = useCallback(async (values, form) => {
        const res = await executeAsyncOperation(() => authorize({
            login: values.login,
            password: values.password
        }))

        if (res?.type === ResponseType.ERRROR) {
            return res.data
        }
    }, [authorize, executeAsyncOperation])

    return (
        <Dialog isOpen title="Авторизация" isCloseButtonShown={false}>
            <div className={Classes.DIALOG_BODY}>
                <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </Dialog>
    )
}

export { Login }