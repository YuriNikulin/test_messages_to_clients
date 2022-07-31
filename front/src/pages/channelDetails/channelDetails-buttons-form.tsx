import { Button, Switch } from "@blueprintjs/core"
import { Input } from "components/form"
import { FormField } from "components/form-field"
import { useCallback } from "react"
import { FieldRenderProps, Form } from "react-final-form"
import { getValidator } from "utils/validator"
import { FIELDS_BUTTON_FORM } from "./channelDetails-constants"
import { ChannelButtonFormProps } from "./channelForm-types"

const validator = getValidator({
    [FIELDS_BUTTON_FORM.text.id]: {
        required: true
    },
    [FIELDS_BUTTON_FORM.url.id]: {
        rules: [
            {
                validator(value, formValues) {
                    if (formValues.isLink && !value) {
                        return 'Поле обязательно для заполнения'
                    }
                },
            }
        ]
    }
})

const ButtonsForm: FunctionComponent<ChannelButtonFormProps> = (props) => {
    return (
        <Form onSubmit={props.onSubmit as any} initialValues={props.initialValues} validate={validator}>
            {(formProps) => {
                return (
                    <form onSubmit={formProps.handleSubmit}>
                        <div className="mb-3">
                            <FormField
                                name={FIELDS_BUTTON_FORM.text.id}
                                label={FIELDS_BUTTON_FORM.text.label}
                                component={Input}
                                required
                                componentProps={{
                                    placeholder: FIELDS_BUTTON_FORM.text.label
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <FormField
                                name={FIELDS_BUTTON_FORM.url.id}
                                label={FIELDS_BUTTON_FORM.url.label}
                                component={Input}
                                disabled={!formProps.values.isLink}
                                componentProps={{
                                    placeholder: FIELDS_BUTTON_FORM.url.label
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <FormField
                                name={FIELDS_BUTTON_FORM.isLink.id}
                                label={FIELDS_BUTTON_FORM.isLink.label}
                                componentProps={{
                                    large: true,
                                    label: ''
                                }}
                            >
                                {(isLinkProps: FieldRenderProps<any>) => {
                                    return (
                                        <Switch
                                            {...isLinkProps.input}
                                            large
                                        />
                                    )
                                }}
                            </FormField>
                        </div>
                        <Button
                            large
                            type="submit"
                            onClick={(e) => {
                                formProps.form.change(FIELDS_BUTTON_FORM.addOneMore.id, false)
                                formProps.handleSubmit(e)
                            }}
                            intent="primary"
                        >
                            Сохранить
                        </Button>
                        <Button
                            large
                            type="submit"
                            onClick={(e) => {
                                formProps.form.change(FIELDS_BUTTON_FORM.addOneMore.id, true)
                                formProps.handleSubmit(e)
                            }}
                            className="ml-3"
                        >
                            Сохранить и не закрывать окно
                        </Button>
                    </form>
                )
            }}
        </Form>
    )
}

export { ButtonsForm }