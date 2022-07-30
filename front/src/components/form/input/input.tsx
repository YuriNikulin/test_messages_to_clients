import { InputGroup } from '@blueprintjs/core'
import { Error } from '../error'
import { IInputProps } from './input-types'

export const Input: FunctionComponent<IInputProps> = (props) => {
    const { meta, input, isPassword, ...rest } = props
    
    return (
        <div>
            <InputGroup
                {...rest}
                {...input}
                type={isPassword ? 'password' : rest.type}
            />
            <Error meta={meta} />
        </div>
    )
}
