import React from 'react'
import { Field } from 'react-final-form'
import { IFormFieldProps } from './form-field-types'

const FormField = <Component extends React.ElementType<any>,>(props: IFormFieldProps<Component>) => {
    const { componentProps, showLabel = true, ...rest } = props

    return ( 
        <div>
            {rest.label && showLabel && (
                <label className="label" htmlFor={rest.name}>
                    {rest.label}
                </label>
            )}
            <Field
                { ...rest }
                { ...componentProps }
                id={rest.name}
            />
        </div>
    )
}

const FormFieldMemo  = React.memo(FormField) as typeof FormField

export { FormFieldMemo as FormField }