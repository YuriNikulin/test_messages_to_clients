import { ChannelContentConfig } from './types'

const config: Record<string, ChannelContentConfig> = {
    vk: {
        textMaxLength: 4096,
        keyboardConfigs: {
            standart: {
                buttonsLinksAreSupported: true,
                buttonsMaxCount: 40,
            },
            inline: {
                buttonsLinksAreSupported: true,
                buttonsMaxCount: 10
            }
        }
    },
    whatsapp: {
        textMaxLength: 1000,
        keyboardConfigs: {
            standart: {
                buttonsMaxCount: 10,
                buttonTextMaxLength: 20
            },
            inline: {
                buttonsLinksAreSupported: true,
                buttonsMaxCount: 3,
                buttonTextMaxLength: 20,
                buttonsLinksMaxCount: 1
            }
        }
    },
    tg: {
        textMaxLength: 4096,
        keyboardConfigs: {
            standart: {
                
            },
            inline: {
                buttonsLinksAreSupported: true,
                buttonTextMaxLength: 64
            }
        }
    },
    sms: {
        keyboardConfigs: {
            inline: { isSupported: false },
            standart: { isSupported: false }
        }
    }
}

export default config