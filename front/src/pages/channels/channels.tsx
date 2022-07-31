import { api } from "api"
import { endpoints } from "constants/endpoints"
import { useCallback, useEffect, useState } from "react"
import { IChannel } from "types"
import { routes } from "constants/routes"
import { useLoading } from "hooks/useLoading"
import { Spinner } from "@blueprintjs/core"
import { isObject } from "utils/common"

let persistedChannels: IChannel[] = []

const Channels: FunctionComponent = () => {
    const [channels, setChannels] = useState(persistedChannels)
    const { executeAsyncOperation, isLoading} = useLoading()

    const getChannels = async () => {
        const res = await executeAsyncOperation(() => api.makeRequest(endpoints.channels))
        console.log(res)
        if (res && isObject(res.data) && res.data.channels) {
            setChannels(res.data.channels as IChannel[])
        }
    }

    useEffect(() => {
        console.log(persistedChannels)
        if (!channels.length) {
            getChannels()
        }
    }, [])

    return (
        <div>
            <h2 className="bp4-heading page-title">{routes.channels.title}</h2>
            {isLoading && <Spinner />}
            {channels.map((i) => {
                return i.name
            })}
        </div>
    )
}

export { Channels }