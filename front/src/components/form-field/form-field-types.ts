import React from 'react'
import { FieldProps } from 'react-final-form'

export type IFormFieldProps<Component extends React.ElementType = any, V = any, RP = any> =
FieldProps<V, any> & {
    component: Component
    componentProps: React.ComponentProps<Component>
}