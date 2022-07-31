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