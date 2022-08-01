import { ChannelContentConfig, Message, UserModel } from 'types'
import { getTextRawLength, returnMessage } from '../utils'
import { config } from '../config'




class MessageServiceClass {
    async validateMessage(content: Message['content'], config: ChannelContentConfig) {
        try {
            const errors = {}

            if (!content.text) {
                return returnMessage('Необходимо ввести текст сообщения')
            }


            const textLength = getTextRawLength(content.text)
            if (config.textMaxLength && textLength > config.textMaxLength) {
                return returnMessage(`Длина сообщения не может превышать ${config.textMaxLength} (передано ${textLength}).`)
            }

            const keyboardConfig = config.keyboardConfigs[content.keyboardType]
            if (content.buttons && (!keyboardConfig ||  keyboardConfig.isSupported === false)) {
                return returnMessage(`Этот тип отображения не поддерживает кнопки`)
            }

            if (content.buttons) {
                let buttonsTotalCount = 0
                let buttonsLinksCount = 0
                for (const button of content.buttons) {
                    buttonsTotalCount += 1
                    if (keyboardConfig.buttonsMaxCount && buttonsTotalCount > keyboardConfig.buttonsMaxCount) {
                        return returnMessage(
                            `Максимальное количество кнопок - ${keyboardConfig.buttonsMaxCount} (передано ${content.buttons.length}).`
                        )
                    }

                    if (keyboardConfig.buttonTextMaxLength && getTextRawLength(button.text) > keyboardConfig.buttonTextMaxLength) {
                        return returnMessage(
                            `Максимальная длина текста кнопки - ${keyboardConfig.buttonTextMaxLength}.`
                        ) 
                    }

                    if (button.isLink) {
                        if (!keyboardConfig.buttonsLinksAreSupported) {
                            return returnMessage('Этот тип отображения не поддерживает кнопки-ссылки')
                        }
                        buttonsLinksCount += 1

                        if (keyboardConfig.buttonsLinksMaxCount && buttonsLinksCount > keyboardConfig.buttonsLinksMaxCount) {
                            return returnMessage(
                                `Максимальное количество кнопок-ссылок - ${keyboardConfig.buttonsLinksMaxCount}.`
                            )
                        }
                    }
                }
            }

        } catch(e) {
            return returnMessage(`Произошла ошибка при обработке сообщения. Проверьте формат сообщения. ${e}`)
        }
    }
}

export const MessageService = new MessageServiceClass()