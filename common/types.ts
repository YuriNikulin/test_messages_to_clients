export type KeyboardType = 'inline' | 'standart'

export interface ChannelKeyboardConfig {
    isSupported?: boolean;
    buttonsMaxCount?: number;
    buttonTextMaxLength?: number;
    buttonsLinksAreSupported?: boolean;
    buttonsLinksMaxCount?: number;
}

export interface ChannelContentConfig {
    textMaxLength?: number;
    keyboardConfigs: {
        [key in KeyboardType]: ChannelKeyboardConfig
    }
}

interface CommonButton {
    isLink?: boolean;
    id?: string;
    url?: string;
    text: string;
}

interface SimpleButton extends CommonButton {
    isLink: true;
}

interface LinkButton extends CommonButton {
    isLink: false;
    url: string;
}

type MessageButton = SimpleButton | LinkButton

export interface Message {
    content: {
        text: string;
        buttons: Array<MessageButton>;
        keyboardType: KeyboardType;
    }
    channelId: string;
}