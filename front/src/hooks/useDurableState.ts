import { useCallback, useRef, useState } from "react"

export const useDurableState = (initialValue: any, minDuration = 1000) => {
    const [value, setValue] = useState<any>(initialValue)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const timeoutHandler = useCallback((_value: any) => {
        if (_value !== value) {
            setValue(_value)
        }
    }, [value])

    const useDurableState = useCallback((_value: any) => {
        if (_value !== value) {
            timer.current = setTimeout(() => timeoutHandler, minDuration)
        }
    }, [value, setValue, minDuration, timeoutHandler, initialValue])

    return [value, useDurableState]
}