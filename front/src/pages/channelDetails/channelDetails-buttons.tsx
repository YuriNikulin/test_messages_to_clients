import { Button, Classes, Dialog, Popover } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React, { useCallback, useMemo, useState } from "react";
import { showNotification } from "utils/common";
import { getValidator } from "utils/validator";
import { ButtonsForm } from "./channelDetails-buttons-form";
import { FIELDS, FIELDS_BUTTON_FORM, TEXT_BUTTON_CREATE, TEXT_BUTTON_EDIT } from "./channelDetails-constants";
import { ChannelButtonsProps } from "./channelForm-types";
import css from './channelForm.module.scss'

const ChannelButtons: FunctionComponent<ChannelButtonsProps> = React.memo((props) => {
    const value = useMemo(() => {
        let result = props.value || []
        return result.map((button, i) => {
            return {
                ...button,
                id: `${button.text}_${button.url}_${i}`
            }
        })
    }, [props.value])

    const buttonsCounts = useMemo(() => {
        return {
            total: value.length,
            links: value.filter(v => v.isLink).length
        }
    }, [value])

    const [state, setState] = useState<{
        editedButton: MessageButton | null;
        buttonFormIsOpen: boolean;
    }>({
        editedButton: null,
        buttonFormIsOpen: false
    })

    const toggleButtonFormDialog = useCallback(() => {
        setState({
            ...state,
            buttonFormIsOpen: !state.buttonFormIsOpen
        })
    }, [state])

    const handleButtonFormSubmit: FormSubmitHandler = useCallback((values) => {
        props.change('buttons', value.concat({
            id: values.id,
            text: values.text,
            url: values.url,
            isLink: values.isLink
        }))
        
        if (!values.addOneMore) {
            toggleButtonFormDialog()
        } else {
            showNotification('Кнопка добавлена', {
                type: 'success'
            })
        }
    }, [props.change, value, toggleButtonFormDialog])

    const handleButtonDelete = useCallback((id: string) => {
        props.change('buttons', value.filter(v => v.id !== id))
    }, [value])

    const validator = useMemo(() => {
        const { config } = props
        // config.
        const validator = getValidator({
            [FIELDS_BUTTON_FORM.text.id]: {
                required: true,
                maxLength: config.buttonTextMaxLength
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

        return validator
    }, [props.config])

    const restrictions = useMemo(() => {
        const { config } = props
        return {
            canAddButtons:
                (!config.buttonsMaxCount || (buttonsCounts.total < config.buttonsMaxCount)),
            canAddLinkButtons:
                config.buttonsLinksAreSupported && 
                (!config.buttonsLinksMaxCount || (buttonsCounts.links < config.buttonsLinksMaxCount)),
            canAddNextButton: !config.buttonsMaxCount || config.buttonsMaxCount - buttonsCounts.total > 1,
            freeSlotsForButtons: !!config.buttonsMaxCount ? config.buttonsMaxCount - buttonsCounts.total : undefined 
        }
    }, [buttonsCounts, props])

    return (
        <div className={css.buttons}>
            <div className={css.buttonsHeader}>
                <h5 className="bp4-heading">
                    {FIELDS.buttons.label}
                </h5>
                <Button
                    large
                    intent="primary"
                    icon="add"
                    onClick={toggleButtonFormDialog}
                    disabled={!restrictions.canAddButtons}
                >
                    Добавить кнопку
                    {!!restrictions.freeSlotsForButtons && restrictions.freeSlotsForButtons > 0 &&
                        ` (доступно ${restrictions.freeSlotsForButtons})`}
                </Button>
            </div>
            <div className={css.buttonsList}>
                {value.map((button) => {
                    return (
                        <Popover2
                            interactionKind="hover"
                            content=
                                {
                                    (
                                        <div className={css.buttonsPopover}>
                                            <Button intent="success">
                                                Редактировать
                                            </Button>
                                            <Button intent="danger" onClick={() => handleButtonDelete(button.id)}>
                                                Удалить
                                            </Button>
                                        </div>
                                    )
                                }
                        >
                            <Button key={button.id} icon={button.isLink ? 'link' : undefined}>
                                {button.text}
                            </Button>
                        </Popover2>
                    )
                })}
            </div>
            <Dialog
                isOpen={state.buttonFormIsOpen}
                onClose={toggleButtonFormDialog}
                title={state.editedButton ? TEXT_BUTTON_EDIT : TEXT_BUTTON_CREATE}
            >
                <div className={Classes.DIALOG_BODY}>
                    <ButtonsForm
                        onSubmit={handleButtonFormSubmit}
                        validator={validator}
                        canAddButtonLinks={restrictions.canAddLinkButtons}
                        canAddNextButton={restrictions.canAddNextButton}
                    />
                </div>
            </Dialog>
        </div>
    )
})

export { ChannelButtons }