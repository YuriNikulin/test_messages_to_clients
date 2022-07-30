import { InputGroup } from '@blueprintjs/core'
import { IInputProps } from './input-types'

export const Input: FunctionComponent<IInputProps> = (props) => {
    const { meta, input, ...rest } = props
    
    return (
        <div>
            <InputGroup {...rest} />
        </div>
    )
}
