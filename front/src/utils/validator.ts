export const getValidator = (config: ValidatorConfig) => (values: Record<string, unknown>) => {
    const errors: Record<string, string> = {}

    for (let key in config) {
        const currentField = config[key]
        const currentValue = values[key]
        if (currentField.required && !currentValue) {
            errors[key] = 'Поле обязательно для заполнения'
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