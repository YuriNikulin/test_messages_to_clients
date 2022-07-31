import { TextArea } from '@blueprintjs/core'
import { Error } from '../error'
import { ITextareaProps } from './textarea-types'

export const Textarea: FunctionComponent<ITextareaProps> = (props) => {
    const { meta, input, inputRef, ...rest } = props
    
    return (
        <div>
            <TextArea
                {...rest}
                {...input}
            />
            <Error meta={meta} />
        </div>
    )
}
