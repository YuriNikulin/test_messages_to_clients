import { useCallback, useState } from "react"
import { useDebouncedState } from "./useDebouncedState"

export const useLoading = () => {
    const [ isLoading, setIsLoading ] = useDebouncedState(false)

    const executeAsyncOperation = useCallback(async (fn: () => Promise<any>) => {
        setIsLoading(true)
        try {
            const result = await fn()
            return result
        } catch(e) {
            throw new Error(e as any)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        executeAsyncOperation,
        isLoading
    }
}