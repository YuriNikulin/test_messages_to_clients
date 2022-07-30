import { Dialog, Classes } from '@blueprintjs/core'
import { LoginForm } from './login-form'

const Login: FunctionComponent = () => {
    return (
        <Dialog isOpen title="Авторизация" isCloseButtonShown={false}>
            <div className={Classes.DIALOG_BODY}>
                <LoginForm />
            </div>
        </Dialog>
    )
}

export { Login }