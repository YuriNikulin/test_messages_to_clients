export const FIELDS = {
    text: {
        id: 'text',
        label: 'Текст сообщения'
    },
    keyboardType: {
        id: 'keyboardType',
        label: 'Тип клавиатуры',
        variants: {
            inline: {
                id: 'inline',
                label: 'Inline-отображение'
            },
            standart: {
                id: 'standart',
                label: 'Стандартное отображение'
            }
        }
    },
    buttons: {
        id: 'buttons',
        label: 'Настройка кнопок'
    }
}

export const FIELDS_BUTTON_FORM = {
    text: {
        id: 'text',
        label: 'Текст кнопки'
    },
    isLink: {
        id: 'isLink',
        label: 'Кнопка-ссылка'
    },
    url: {
        id: 'url',
        label: 'Адрес ссылки'
    },
    addOneMore: {
        id: 'addOneMore'
    }
}

export const TEXT_BUTTON_EDIT = 'Редактирование кнопки'
export const TEXT_BUTTON_CREATE = 'Добавление кнопки'