import { Switch } from "@blueprintjs/core"
import React from "react"
import { ChannelsListProps } from "./channels-types"

const ChannelsList: FunctionComponent<ChannelsListProps> = React.memo((props) => {
    return (
        <ul>
            {props.channels.map((channel) => {
                return (
                    <li key={channel.id} className="mb-6">
                        <Switch
                            label={channel.name}
                            large
                            onChange={() => props.onChannelToggle(channel.id)}
                            checked={!!props.selectedChannels[channel.id]}
                        />
                    </li>
                )
            })}
        </ul>
    )
})

export { ChannelsList }