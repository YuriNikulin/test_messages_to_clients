import { Radio as BPRadio, RadioProps } from '@blueprintjs/core'
import { useCallback } from 'react'
import { Error } from '../error'
import { IRadioProps } from './radio-types'

export const Radio: FunctionComponent<IRadioProps> = (props) => {
    const { meta, input, ...rest } = props
    
    return (
        <div>
            <BPRadio
                {...rest}
                {...input}
            />
            <Error meta={meta} />
        </div>
    )
}
