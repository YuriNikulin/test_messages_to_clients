import { Spinner } from "@blueprintjs/core"
import { api } from "api"
import { endpoints } from "constants/endpoints"
import { useAuth } from "containers/Auth"
import { useLoading } from "hooks/useLoading"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { IChannel, ResponseType } from "types"
import { getChannelTitle, isChannel, isObject, showNotification } from "utils/common"
import { ChannelFormContainer } from './channelDetails-form-container'
import { ChannelFormView } from "./channelForm-form-view"

const ChannelDetails: FunctionComponent = () => {
    const params = useParams()
    const { executeAsyncOperation, isLoading } = useLoading()
    const [state, setState] = useState<{
        channelInfo: IChannel | null;
        config: ChannelContentConfig | null;
        content?: Message['content']
    }>({
        channelInfo: null,
        config: null
    })
    const { usersChannels } = useAuth()

    const getDetails = async (id: string) => {
        const res = await executeAsyncOperation(() => api.makeRequest(endpoints.getChannelDetails, {
            body: { id }
        }))
        if (res.type === ResponseType.SUCCESS && isObject(res.data) && isChannel(res.data.channel)) {
            setState({
                channelInfo: res.data.channel,
                config: res.data.config as ChannelContentConfig,
                content: res.data.content as Message['content']
            })
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
        if (res.type === ResponseType.SUCCESS) {
            showNotification('Сохранение прошло успешно', { type: 'success' })
            getDetails(params.id as string)
        }
    }, [params])
    
    useEffect(() => {
        if (params.id && usersChannels[params.id]) {
            getDetails(params.id)
        }
    }, [params])

    const title = useMemo(() => {
        return getChannelTitle(state.channelInfo || '')
    }, [state])

    useEffect(() => {
        document.title = title
    }, [title])

    if (!usersChannels[params.id as string] || !state.config) {
        return null
    }
    
    return (
        <div className="content-inner">
            <h2 className="bp4-heading page-title">{title}</h2>
            {state.channelInfo && 
                <h5 className="bp4-heading page-title page-subtitle">
                    Настройте сообщение, которое будет отправляться вашим клиентам в {state.channelInfo.name || ''}
                </h5>
            }
            <ChannelFormView config={state.config} onSubmit={handleSubmit} initialValues={state.content} />
            {isLoading && (
                <div className="spinner-overlay">
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export { ChannelDetails }