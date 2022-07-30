import { memo } from 'react'
import { Form } from 'react-final-form'
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
    },
    password2: {
        required: true,
        rules: [{
            validator(value, formValues) {
                if (value !== formValues.password) {
                    return 'Пароли должны совпадать'
                }
            },
        }]
    }
})

const RegisterForm: FunctionComponent<LoginFormProps> = memo((props) => {
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
                        <div className="mb-3">
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
                        <div className="mb-6">
                            <FormField
                                name="password2"
                                component={Input}
                                componentProps={{
                                    placeholder: "Повторите пароль",
                                    isPassword: true,
                                    large: true
                                }}
                            />
                        </div>
                        <div className="flex justify-space-between">
                            <Button type="submit" large loading={props.isLoading}>
                                Зарегистрироваться
                            </Button>
                            <Button minimal onClick={props.onAlternativeButtonClick}>
                                Вернуться к авторизации
                            </Button>
                        </div>
                    </form>
                )
            }}
            >
        </Form>
    )
})

export { RegisterForm }