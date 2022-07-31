import { SyntheticEvent } from "react";
import { FormRenderProps } from "react-final-form";

export interface ChannelFormContainerProps {
    config: ChannelContentConfig;
}

export interface ChannelFormViewProps {
    onSubmit: FormSubmitHandler;
    config: ChannelContentConfig;
}

export interface ChannelButtonsProps {
    config: ChannelKeyboardConfig;
    change: FormRenderProps['form']['change']
    value: MessageButton[]
}

export interface ChannelButtonFormProps {
    onSubmit: FormSubmitHandler;
    initialValues?: MessageButton;
}