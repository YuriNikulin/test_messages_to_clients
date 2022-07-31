import { Spinner } from "@blueprintjs/core"
import { api } from "api"
import { endpoints } from "constants/endpoints"
import { useAuth } from "containers/Auth"
import { useLoading } from "hooks/useLoading"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { IChannel, ResponseType } from "types"
import { getChannelTitle, isChannel, isObject } from "utils/common"
import { ChannelFormContainer } from './channelDetails-form-container'

const ChannelDetails: FunctionComponent = () => {
    const params = useParams()
    const { executeAsyncOperation, isLoading } = useLoading()
    const [channelInfo, setChannelInfo] = useState<IChannel | null>(null)
    const { usersChannels } = useAuth()
    const [config, setConfig] = useState<ChannelContentConfig | null>(null)

    const getDetails = async (id: string) => {
        const res = await executeAsyncOperation(() => api.makeRequest(endpoints.getChannelDetails, {
            body: { id }
        }))
        if (res.type === ResponseType.SUCCESS && isObject(res.data) && isChannel(res.data.channel)) {
            setChannelInfo(res.data.channel)
            setConfig(res.data.config as ChannelContentConfig)
        }
    }

    const handleSubmit = useCallback(async (values: Message['content']) => {
        const body: Message = {
            channelId: params.id as string,
            content: values
        }
        const res = await api.makeRequest(endpoints.editMessage, {
            body: body as any
        })
    }, [params])
    
    useEffect(() => {
        if (params.id && usersChannels[params.id]) {
            getDetails(params.id)
        }
    }, [params])

    const title = useMemo(() => {
        return getChannelTitle(channelInfo || '')
    }, [channelInfo])

    useEffect(() => {
        document.title = title
    }, [title])

    if (!usersChannels[params.id as string] || !config) {
        return null
    }
    
    return (
        <div className="content-inner">
            <h2 className="bp4-heading page-title">{title}</h2>
            {channelInfo && 
                <h5 className="bp4-heading page-title page-subtitle">
                    Настройте сообщение, которое будет отправляться вашим клиентам в {channelInfo.name || ''}
                </h5>
            }
            <ChannelFormContainer config={config} onSubmit={handleSubmit} />
            {isLoading && (
                <div className="spinner-overlay">
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export { ChannelDetails }