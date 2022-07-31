import { Input, Textarea, Radio } from "components/form"
import { FormField } from "components/form-field"
import { useCallback } from "react"
import { Form } from "react-final-form"
import { FIELDS } from "./channelDetails-constants"
import { ChannelFormViewProps } from "./channelForm-types"
import css from './channelForm.module.scss'

const initialValues = {
    [FIELDS.keyboardType.id]: FIELDS.keyboardType.variants.standart.id
}

const ChannelFormView: FunctionComponent<ChannelFormViewProps> = (props) => {
    const handleSubmit: FormSubmitHandler = useCallback(() => {

    }, [])
    
    return (
        <Form onSubmit={props.onSubmit} initialValues={initialValues}>
            {(props) => {
                console.log(props.values)
                return (
                    <form onSubmit={props.handleSubmit}>
                        <h5 className="bp4-heading">{FIELDS.text.label}</h5>
                        <FormField
                            name={FIELDS.text.id}
                            component={Textarea}
                            componentProps={{
                                className: css.textarea,
                            }}
                        />
                        <h5 className="bp4-heading mt-6">
                            Настройка клавиатуры
                        </h5>
                        <FormField
                            name={FIELDS.keyboardType.id}
                            type="radio"
                            component={Radio}
                            value={FIELDS.keyboardType.variants.standart.id}
                            label={FIELDS.keyboardType.variants.standart.label}
                            showLabel={false}
                            // defaultValue={FIELDS.keyboardType.variants.standart.id}
                        />
                        <FormField
                            name={FIELDS.keyboardType.id}
                            type="radio"
                            component={Radio}
                            value={FIELDS.keyboardType.variants.inline.id}
                            label={FIELDS.keyboardType.variants.inline.label}
                            showLabel={false}
                        />
                    </form>
                )
            }}
        </Form>
    )
}

export { ChannelFormView }