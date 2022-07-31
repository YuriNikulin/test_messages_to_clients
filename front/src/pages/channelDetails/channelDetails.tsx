import { Spinner } from "@blueprintjs/core"
import { api } from "api"
import { endpoints } from "constants/endpoints"
import { useLoading } from "hooks/useLoading"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { IChannel, ResponseType } from "types"
import { getChannelTitle, isChannel, isObject } from "utils/common"

const ChannelDetails: FunctionComponent = () => {
    const params = useParams()
    const { executeAsyncOperation, isLoading } = useLoading()
    const [channelInfo, setChannelInfo] = useState<IChannel | null>(null)

    const getDetails = async (id: string) => {
        const res = await executeAsyncOperation(() => api.makeRequest(endpoints.getChannelDetails, {
            body: { id }
        }))
        if (res.type === ResponseType.SUCCESS && isObject(res.data) && isChannel(res.data.channel)) {
            setChannelInfo(res.data.channel)
        }
    }
    
    useEffect(() => {
        if (params.id) {
            getDetails(params.id)

            return () => {
                setChannelInfo(null)
            }
        }
    }, [params])
    
    return (
        <div>
            <h2 className="bp4-heading page-title">{getChannelTitle(channelInfo || '')}</h2>
            {isLoading && <Spinner />}
        </div>
    )
}

export { ChannelDetails }