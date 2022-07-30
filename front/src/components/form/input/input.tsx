import { InputGroup } from '@blueprintjs/core'
import { IInputProps } from './input-types'

export const Input: FunctionComponent<IInputProps> = (props) => {
    const { meta, input, isPassword, ...rest } = props
    
    return (
        <div>
            <InputGroup {...rest} type={isPassword ? 'password' : rest.type} />
        </div>
    )
}
