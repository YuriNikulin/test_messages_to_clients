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
            editedButton: null,
            buttonFormIsOpen: !state.buttonFormIsOpen
        })
    }, [state])

    const handleButtonFormSubmit: FormSubmitHandler = useCallback((values) => {
        let newValue: MessageButton[] = []
        if (state.editedButton) {
            let existedButtonIndex = value.findIndex(v => v.id === state.editedButton?.id)
            if (existedButtonIndex !== -1) {
                newValue = [
                    ...value.slice(0, existedButtonIndex),
                    {
                        ...values as MessageButton,
                        id: state.editedButton.id
                    },
                    ...value.slice(existedButtonIndex + 1)
                ]
                showNotification('???????????? ??????????????????????????????', {
                    type: 'success'
                })
            }
        } else {
            newValue = value.concat({
                id: values.id,
                text: values.text,
                url: values.url,
                isLink: values.isLink
            })
        }
        props.change('buttons', newValue)
        
        if (!values.addOneMore) {
            toggleButtonFormDialog()
        } else {
            showNotification('???????????? ??????????????????', {
                type: 'success'
            })
        }
    }, [props.change, value, toggleButtonFormDialog, state])

    const handleButtonDelete = useCallback((id: string) => {
        props.change('buttons', value.filter(v => v.id !== id))
    }, [value])

    const handleButtonEdit = useCallback((button: MessageButton) => {
        setState({
            buttonFormIsOpen: true,
            editedButton: button
        })
    }, [state])

    const validator = useMemo(() => {
        const { config } = props
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
                                return '???????? ?????????????????????? ?????? ????????????????????'
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
                (!config.buttonsLinksMaxCount ||
                (buttonsCounts.links < config.buttonsLinksMaxCount) ||
                (state.editedButton?.isLink)
                ),
            canAddNextButton: !config.buttonsMaxCount || config.buttonsMaxCount - buttonsCounts.total > 1,
            freeSlotsForButtons: !!config.buttonsMaxCount ? config.buttonsMaxCount - buttonsCounts.total : undefined 
        }
    }, [buttonsCounts, props, state])

    return (
        <div className={css.buttons}>
            <div className={css.buttonsHeader}>
                <h5 className="bp4-heading">
                    {FIELDS.buttons.label}
                </h5>
                <Button
                    large
                    icon="add"
                    onClick={toggleButtonFormDialog}
                    disabled={!restrictions.canAddButtons}
                >
                    ???????????????? ????????????
                    {!!restrictions.freeSlotsForButtons && restrictions.freeSlotsForButtons > 0 &&
                        ` (???????????????? ${restrictions.freeSlotsForButtons})`}
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
                                            <Button intent="success" onClick={() => handleButtonEdit(button)}>
                                                ??????????????????????????
                                            </Button>
                                            <Button intent="danger" onClick={() => handleButtonDelete(button.id)}>
                                                ??????????????
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
                        initialValues={state.editedButton || undefined}
                    />
                </div>
            </Dialog>
        </div>
    )
})

export { ChannelButtons }