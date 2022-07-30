import React from 'react'
import { FieldProps } from 'react-final-form'

// По какой-то причине Omit превращает тип в any
type GenerateComponentProps<P> = {
    [key in keyof P as key extends 'meta' | 'input' ? never : key]: P[key];
}

export type IFormFieldProps<Component extends React.ElementType = any, V = any> =
FieldProps<V, any> & {
    component: Component;
    componentProps: GenerateComponentProps<React.ComponentProps<Component>>
}

