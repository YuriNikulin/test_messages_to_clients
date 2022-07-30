export const getValidator = (config: ValidatorConfig) => (values: Record<string, unknown>) => {
    const errors: Record<string, string> = {}

    for (let key in config) {
        const currentField = config[key]
        if (currentField.required && !values[key]) {
            errors[key] = 'Поле обязательно для заполнения'
        }
    }

    return errors
}