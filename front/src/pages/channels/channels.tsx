import { api } from "api"
import { endpoints } from "constants/endpoints"
import { useCallback, useEffect, useState } from "react"
import { IChannel, ResponseType } from "types"
import { routes } from "constants/routes"
import { useLoading } from "hooks/useLoading"
import { Spinner } from "@blueprintjs/core"
import { isObject, showNotification } from "utils/common"
import { LOCAL_STORAGE_CHANNELS_KEY } from "constants/common"
import { usePersistedState } from "hooks/usePersistedState"
import { ChannelsList } from "./channels-list"
import { useAuth } from "containers/Auth"

const Channels: FunctionComponent = () => {
    const [channels, setChannels] = usePersistedState<IChannel[]>([], {
        storageKey: LOCAL_STORAGE_CHANNELS_KEY,
        storageType: 'sessionStorage'
    })
    const { executeAsyncOperation, isLoading} = useLoading()
    const { usersChannels, getUserInfo } = useAuth()

    const getChannels = async () => {
        const res = await executeAsyncOperation(() => api.makeRequest(endpoints.channels))
        if (res && isObject(res.data) && res.data.channels) {
            setChannels(res.data.channels as IChannel[])
        }
    }

    const handleChannelToggle = useCallback(async (id: string) => {
        const res = await api.makeRequest(endpoints.toggleChannel, {
            body: { id }
        })
        if (res.type === ResponseType.SUCCESS) {
            getUserInfo()
            if (isObject(res.data) && isObject(res.data.channel)) {
                showNotification(
                    `Канал ${res.data.channel.name} ${res.data.action === 'added'
                        ? 'добавлен в список каналов'
                        : 'удалён из списка каналов'
                    }`,
                    { type: 'success' }
                )
            }
        }
    }, [])

    useEffect(() => {
        document.title = routes.channels.title
        if (!channels.length) {
            getChannels()
        }
    }, [])

    return (
        <div>
            <h2 className="bp4-heading page-title">{routes.channels.title}</h2>
            {isLoading && <Spinner />}
            <ChannelsList
                channels={channels}
                onChannelToggle={handleChannelToggle}
                selectedChannels={usersChannels}
            />
        </div>
    )
}

export { Channels }