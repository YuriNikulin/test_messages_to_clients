import { FormRenderProps } from "react-final-form";
import { getValidator } from "utils/validator";

export interface ChannelFormContainerProps {
    onSubmit: (values: Message['content']) => any;
    config: ChannelContentConfig;
    initialValues?: Message['content'];
}

export interface ChannelFormViewProps {
    onSubmit: (values: Message['content']) => any;
    config: ChannelContentConfig;
    initialValues?: Message['content'];
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