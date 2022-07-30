import { useCallback } from 'react'
import { Field, Form, useForm } from 'react-final-form'
import { Button } from '@blueprintjs/core'
import { Input } from 'components/form'
import { FormField } from 'components/form-field'
import { LoginFormProps } from './login-form-types'
import { getValidator } from 'utils/validator'

const validate = getValidator({
    login: {
        required: true
    },
    password: {
        required: true
    }
})

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
    return (
        <Form 
            onSubmit={props.onSubmit}
            validate={validate}
            render={({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} name="login">
                        <div className="mb-3">
                            <FormField
                                name="login"
                                component={Input}
                                componentProps={{
                                    placeholder: "Логин",
                                    large: true
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <FormField
                                name="password"
                                component={Input}
                                componentProps={{
                                    placeholder: "Пароль",
                                    isPassword: true,
                                    large: true
                                }}
                            />
                        </div>
                        <div className="flex justify-space-between">
                            <Button type="submit" large loading={props.isLoading}>
                                Войти
                            </Button>
                            <Button minimal>
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>
                )
            }}
            >
        </Form>
    )
}

export { LoginForm }