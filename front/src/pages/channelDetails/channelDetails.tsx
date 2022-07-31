import { Spinner } from "@blueprintjs/core"
import { api } from "api"
import { endpoints } from "constants/endpoints"
import { useLoading } from "hooks/useLoading"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { IChannel, ResponseType } from "types"
import { getChannelTitle, isChannel, isObject } from "utils/common"
import { ChannelFormContainer } from './channelDetails-form-container'

const ChannelDetails: FunctionComponent = () => {
    const params = useParams()
    const { executeAsyncOperation, isLoading } = useLoading()
    const [channelInfo, setChannelInfo] = useState<IChannel | null>(null)
    const [config, setConfig] = useState(null)

    const getDetails = async (id: string) => {
        const res = await executeAsyncOperation(() => api.makeRequest(endpoints.getChannelDetails, {
            body: { id }
        }))
        if (res.type === ResponseType.SUCCESS && isObject(res.data) && isChannel(res.data.channel)) {
            console.log(res)
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

    const title = useMemo(() => {
        return getChannelTitle(channelInfo || '')
    }, [channelInfo])

    useEffect(() => {
        document.title = title
    }, [title])
    
    return (
        <div>
            <h2 className="bp4-heading page-title">{title}</h2>
            {channelInfo && 
                <h5 className="bp4-heading page-title page-subtitle">
                    Настройте сообщение, которое будет отправляться вашим клиентам в {channelInfo.name || ''}
                </h5>
            }
            <ChannelFormContainer />
            {isLoading && <Spinner />}
        </div>
    )
}

export { ChannelDetails }