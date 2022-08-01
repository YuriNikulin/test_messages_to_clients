import { memo } from "react"
import { ChannelFormView } from './channelForm-form-view'
import { ChannelFormContainerProps } from "./channelForm-types"

const ChannelFormContainer: FunctionComponent<ChannelFormContainerProps> = memo((props) => {
    return (
        <ChannelFormView onSubmit={props.onSubmit} config={props.config} />
    )
})

export { ChannelFormContainer }