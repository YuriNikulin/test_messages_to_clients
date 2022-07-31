import { Switch } from "@blueprintjs/core"
import { ChannelsListProps } from "./channels-types"

const ChannelsList: FunctionComponent<ChannelsListProps> = (props) => {
    return (
        <ul>
            {props.channels.map((channel) => {
                return (
                    <li key={channel.id}>
                        <Switch
                            label={channel.id}
                            large
                            onChange={() => props.onChannelToggle(channel.id)}
                            checked={!!props.selectedChannels[channel.id]}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export { ChannelsList }