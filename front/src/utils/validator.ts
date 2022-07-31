import { declOfNum } from "./common"

export const getValidator = (config: ValidatorConfig) => (values: Record<string, unknown>) => {
    const errors: Record<string, string> = {}

    for (let key in config) {
        const currentField = config[key]
        const currentValue = values[key]
        if (currentField.required && !currentValue) {
            errors[key] = 'Поле обязательно для заполнения'
            continue
        }

        if (currentField.maxLength && `${currentValue}`.replaceAll(' ', '').length > currentField.maxLength) {
            errors[key] =
                `Длина поля не может составлять более ${currentField.maxLength} ${declOfNum(
                    currentField.maxLength,
                    ['символа', 'символов', 'символов']
                )}`
            continue
        }

        if (currentField.rules) {
            for (let rule of currentField.rules) {
                const err = rule.validator(currentValue, values)
                if (err) {
                    errors[key] = err
                    break
                }
            }
        }
    }

    return errors
}