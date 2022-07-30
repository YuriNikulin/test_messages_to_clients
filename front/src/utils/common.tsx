import { toast, ToastOptions } from "react-toastify"
import { Icon } from '@blueprintjs/core'
import { IconNames, iconNameToPathsRecordKey } from '@blueprintjs/icons'
import { Storage } from "./localStorage"
import { LOCAL_STORAGE_TOKEN_KEY } from "constants/common"

export const sleep = (ms: number, shouldReject?: boolean) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                return reject()
            }

            return resolve()
        }, ms)
    })
}

export const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object'

export const showNotification = (message: string, options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
        type: 'info',
        autoClose: 2000
    }

    const _options = { ...defaultOptions, ...options } 
    toast(message, {
        position: 'bottom-right',
        hideProgressBar: true,
        icon: IconNames[iconNameToPathsRecordKey(_options.type as any)]
            ? <Icon icon={_options.type as any} />
            : undefined,
        ..._options
    })
}

export const hasUserToken = () => !!Storage.get(LOCAL_STORAGE_TOKEN_KEY)