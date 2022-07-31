import { IChannel } from "types";

export interface ChannelsListProps {
    channels: IChannel[]
    onChannelToggle: (chanelId: string) => void;
    selectedChannels: Record<string, any>
}