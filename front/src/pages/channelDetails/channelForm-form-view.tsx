import { Button } from "@blueprintjs/core"
import { keyboard } from "@testing-library/user-event/dist/keyboard"
import { Textarea, Radio } from "components/form"
import { FormField } from "components/form-field"
import React, { useCallback, useMemo } from "react"
import { FieldRenderProps, Form } from "react-final-form"
import { getValidator } from "utils/validator"
import { ChannelButtons } from "./channelDetails-buttons"
import { FIELDS } from "./channelDetails-constants"
import { ChannelFormViewProps } from "./channelForm-types"
import css from './channelForm.module.scss'

const ChannelFormView: FunctionComponent<ChannelFormViewProps> = React.memo(({ config, onSubmit }) => {
    const { inline, standart } = config.keyboardConfigs

    const initialValues = useMemo(() => {
        const result: Record<string, any> = {}
        if (standart.isSupported !== false) {
            result[FIELDS.keyboardType.id] = FIELDS.keyboardType.variants.standart.id
        } else if (inline.isSupported !== false) {
            result[FIELDS.keyboardType.id] = FIELDS.keyboardType.variants.inline.id
        }

        return result
    }, [inline, standart])

    const shouldRenderKeyboardSettings = useMemo(() => {
        return !(
            inline.isSupported === false &&
            standart.isSupported === false
        )
    }, [inline, standart])

    const validator = useMemo(() => {
        return getValidator({
            [FIELDS.text.id as keyof Message]: {
                required: true,
                maxLength: config.textMaxLength
            }
        })
    }, [config])

    
    return (
        <Form onSubmit={onSubmit} initialValues={initialValues} validate={validator as any}>
            {(props) => {
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
                        {shouldRenderKeyboardSettings && (
                            <>
                                <h5 className="bp4-heading mt-6">
                                    Настройка клавиатуры
                                </h5>
                                <h5 className="bp4-heading mt-6">
                                    {FIELDS.keyboardType.label}
                                </h5>
                                <FormField
                                    name={FIELDS.keyboardType.id}
                                    type="radio"
                                    component={Radio}
                                    value={FIELDS.keyboardType.variants.standart.id}
                                    label={FIELDS.keyboardType.variants.standart.label}
                                    showLabel={false}
                                    disabled={standart.isSupported === false}
                                />
                                <FormField
                                    name={FIELDS.keyboardType.id}
                                    type="radio"
                                    component={Radio}
                                    value={FIELDS.keyboardType.variants.inline.id}
                                    label={FIELDS.keyboardType.variants.inline.label}
                                    showLabel={false}
                                    disabled={inline.isSupported === false}
                                />
                                
                                <FormField
                                    name={FIELDS.buttons.id}
                                >
                                    {() => {
                                        return (
                                            <ChannelButtons
                                                change={props.form.change}
                                                value={props.values[FIELDS.buttons.id as 'buttons']}
                                                config={
                                                    props.values[FIELDS.keyboardType.id as keyof Message['content']] === FIELDS.keyboardType.variants.inline.id
                                                    ?
                                                        inline
                                                    :
                                                        standart
                                                }
                                            />
                                        )
                                    }}
                                </FormField>
                            </>
                        )}
                        <div className={css.submitPanel}>
                            <Button
                                large
                                intent="primary"
                                type="submit"
                                onClick={props.handleSubmit}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </form>
                )
            }}
        </Form>
    )
})

export { ChannelFormView }