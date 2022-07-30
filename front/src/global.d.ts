import React from 'react'
import { FormProps, Field } from 'react-final-form'

declare global {
    type FunctionComponent<P = {}> = React.FunctionComponent<P & {
        children?: React.ReactElement
    }>;
    
    type FormSubmitHandler = FormProps['onSubmit'];
    type Field = any
}