import { memo, useEffect } from 'react'
import { Form } from 'react-final-form'
import { Button } from '@blueprintjs/core'
import { Input } from 'components/form'
import { FormField } from 'components/form-field'
import { LoginFormProps } from './login-form-types'
import { getValidator } from 'utils/validator'
import { TEXT_LOGIN, TEXT_PASSWORD } from './login-constants'

const validate = getValidator({
    login: {
        required: true
    },
    password: {
        required: true
    }
})

const LoginForm: FunctionComponent<LoginFormProps> = memo((props) => {
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
                        <div className="mb-6">
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
                        <div className="flex justify-space-between">
                            <Button type="submit" large loading={props.isLoading}>
                                Войти
                            </Button>
                            <Button minimal onClick={props.onAlternativeButtonClick}>
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>
                )
            }}
            >
        </Form>
    )
})

export { LoginForm }