import { ComponentProps, useCallback } from 'react'
import { Field, Form } from 'react-final-form'
import { FormGroup, InputGroup, InputGroupProps } from '@blueprintjs/core'
import { Input } from 'components/form'
import { FormField } from 'components/form-field'

const LoginForm: FunctionComponent = (props) => {
    const handleSubmit: FormSubmitHandler = useCallback((value) => {
        console.log(value)
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            {props => {
                console.log(props)
                return (
                    <FormGroup>
                        <FormField
                            name="login"
                            component={Input}
                            componentProps={{
                                placeholder: "Логин",
                            }}
                        />
                        <FormField
                            name="password"
                            component={Input}
                            componentProps={{
                                placeholder: "Пароль",
                                isPassword: true
                            }}
                        />
                    </FormGroup>
                )
            }}
        </Form>
    )
}

export { LoginForm }