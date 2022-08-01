import { API_V1, BACKEND_HOST, LOCAL_STORAGE_TOKEN_KEY } from "constants/common"
import { ResponseType } from "types"
import { isObject, showNotification } from "utils/common"
import { Storage } from "utils/localStorage"


const makeRequest = async (endpoint: Endpoint, config: ApiConfig = {}) => {
    let url = `${BACKEND_HOST}/${API_V1}/${endpoint.url}`
    let result
    try {
        const payload: RequestInit = {
            method: endpoint.method
        }

        if (config.body) {
            payload.body = JSON.stringify(config.body)
        }

        payload.headers = {
            "Content-Type": "application/json"
        }

        const token = Storage.get(LOCAL_STORAGE_TOKEN_KEY)
        if (token) {
            payload.headers.Authorization = `Bearer ${token}`
        }

        const res = await fetch(url, payload)
        let resJson
        try {
            resJson = await res.json()
        } catch(e) {
            resJson = {
                message: `Произошла ошибка при выполнении запроса ${endpoint.url}`
            }
        }
        result = { 
            type: res.ok ? ResponseType.SUCCESS : ResponseType.ERRROR,
            status: res.status,
            data: resJson
        } as ApiResponse
        
    } catch(e) {
        result = {
            type: ResponseType.ERRROR,
            data: e
        }
    }

    if (
        result.type === ResponseType.ERRROR &&
        config.showMessageFromBack !== false &&
        isObject(result.data) &&
        result.data.message
    ) {
        showNotification(result.data.message as string, { type: 'error' })
    }

    return result
}

const api = {
    makeRequest
}


export { api }