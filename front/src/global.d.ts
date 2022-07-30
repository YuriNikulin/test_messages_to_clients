import React from 'react'
import { FormProps, Field } from 'react-final-form'
import { ResponseType } from 'types';
import { HTTPMethods } from './types'

declare global {
    type FunctionComponent<P = {}> = React.FunctionComponent<P & {
        children?: React.ReactElement
    }>;
    
    type FormSubmitHandler = FormProps['onSubmit'];
    type Field = any

    interface ValidatorConfig {
        [key: string]: {
            required?: boolean;
        }
    }

    interface ApiConfig {
        body?: Record<string, unknown>;
        returnRawResponse?: boolean;
        showMessageFromBack?: boolean;
    }

    interface ApiResponse {
        status?: number;
        type: ResponseType;
        data: unknown;
    }

    interface Endpoint {
        url: string;
        method: HTTPMethods
    }
}
