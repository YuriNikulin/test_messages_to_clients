import { memo } from 'react'
import { Form } from 'react-final-form'
import { Button } from '@blueprintjs/core'
import { Input } from 'components/form'
import { FormField } from 'components/form-field'
import { LoginFormProps } from './login-form-types'
import { getValidator } from 'utils/validator'
import { TEXT_LOGIN, TEXT_PASSWORD, TEXT_PASSWORD_REPEAT } from './login-constants'

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
                                label={TEXT_LOGIN}
                                componentProps={{
                                    placeholder: TEXT_LOGIN,
                                    large: true
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <FormField
                                name="password"
                                component={Input}
                                label={TEXT_PASSWORD}
                                componentProps={{
                                    placeholder: TEXT_PASSWORD,
                                    isPassword: true,
                                    large: true
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <FormField
                                name="password2"
                                component={Input}
                                label={TEXT_PASSWORD_REPEAT}
                                componentProps={{
                                    placeholder: TEXT_PASSWORD_REPEAT,
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