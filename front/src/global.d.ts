import React from 'react'
import { FormProps } from 'react-final-form'
import { ResponseType } from 'types';
import { HTTPMethods } from './types'
import {
    ChannelContentConfig as CommonChannelContentConfig,
    ChannelKeyboardConfig as CommonChannelKeyboardConfig,
    KeyboardType as CommonKeyboardType,
    Message as CommonMessage
} from '../../common/types'

declare global {
    type FunctionComponent<P = {}> = React.FunctionComponent<P & {
        children?: React.ReactElement
    }>;
    
    type FormSubmitHandler = FormProps['onSubmit'];
    type ChannelContentConfig = CommonChannelContentConfig
    type ChannelKeyboardConfig = CommonChannelKeyboardConfig
    type KeyboardType = CommonKeyboardType
    type Message = CommonMessage
    type MessageButton = Message['content']['buttons'][number]

    interface ValidatorConfig {
        [key: string]: {
            required?: boolean;
            rules?: Array<
                {
                    validator: (value: any, formValues: Record<string, any>) => string | void;
                }
            >
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
