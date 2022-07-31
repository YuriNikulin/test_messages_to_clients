import { useCallback, memo } from "react"
import { ChannelFormView } from './channelForm-form-view'
import { ChannelFormContainerProps } from "./channelForm-types"

const ChannelFormContainer: FunctionComponent<ChannelFormContainerProps> = memo((props) => {
    const handleSubmit: FormSubmitHandler = useCallback((values) => {
        console.log(values)
    }, [])

    return (
        <ChannelFormView onSubmit={handleSubmit} config={props.config} />
    )
})

export { ChannelFormContainer }