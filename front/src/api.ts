import { API_V1, BACKEND_HOST } from "constants/common"
import { ResponseType } from "types"

const actions = ['get', 'post'] as const

type action = typeof actions[number]

const makeRequest = (method: action) => async (endpoint: Endpoint, config: ApiConfig = {}) => {
    let url = `${BACKEND_HOST}/${API_V1}/${endpoint.url}`
    try {
        const payload: RequestInit = {
            method
        }

        if (config.body) {
            payload.body = JSON.stringify(config.body)
        }

        payload.headers = {
            "Content-Type": "application/json"
        }

        const res = await fetch(url, payload)
        if (config.returnRawResponse) {
            return res
        }

        const resJson = await res.json()
        return { 
            type: res.ok ? ResponseType.SUCCESS : ResponseType.ERRROR,
            status: res.status,
            data: resJson
        } as ApiResponse
        
    } catch(e) {
        console.log(e)
    }
}

const api = actions.reduce<Record<action, ReturnType<typeof makeRequest>>>((acc, curr) => {
    return {
        ...acc,
        [curr]: makeRequest(curr)
    }
}, {} as any)


export { api }