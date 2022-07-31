import { Button, Switch } from "@blueprintjs/core"
import { Input } from "components/form"
import { FormField } from "components/form-field"
import { useCallback, useMemo } from "react"
import { FieldRenderProps, Form } from "react-final-form"
import { getValidator } from "utils/validator"
import { FIELDS_BUTTON_FORM } from "./channelDetails-constants"
import { ChannelButtonFormProps } from "./channelForm-types"



const ButtonsForm: FunctionComponent<ChannelButtonFormProps> = ( props ) => {
    const isEdit = !!props.initialValues
    return (
        <Form onSubmit={props.onSubmit as any} initialValues={props.initialValues} validate={props.validator}>
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
                                    placeholder: FIELDS_BUTTON_FORM.text.label,
                                    autoFocus: true
                                }}
                            />
                        </div>
                        {props.canAddButtonLinks &&
                            <>
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
                                                    defaultChecked={props.initialValues?.isLink}
                                                    large
                                                />
                                            )
                                        }}
                                    </FormField>
                                </div>
                            </>
                        }
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
                        {!isEdit && props.canAddNextButton &&
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
                        }
                    </form>
                )
            }}
        </Form>
    )
}

export { ButtonsForm }