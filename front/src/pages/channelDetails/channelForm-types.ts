import { FormRenderProps } from "react-final-form";
import { getValidator } from "utils/validator";

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
    validator: ReturnType<typeof getValidator>
    canAddButtonLinks?: boolean;
    canAddNextButton?: boolean;
}