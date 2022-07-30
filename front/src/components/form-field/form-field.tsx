import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { IFormFieldProps } from './form-field-types'

const FormField = <Component extends React.ElementType<any>,>(props: IFormFieldProps<Component>) => {
    const { componentProps, ...rest } = props

    return ( 
        <Field
            { ...rest }
            { ...componentProps }
        />
    )
}

export { FormField }