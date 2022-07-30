import { useCallback, useRef, useState } from "react"

export const useDebouncedState = (initialValue: any, delay = 500) => {
    const [value, setValue] = useState<any>(initialValue)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const timeoutHandler = useCallback((_value: any) => {
        if (_value !== value) {
            setValue(_value)
        }
    }, [value])

    const setDebouncedState = useCallback((_value: any) => {
        if (_value !== value) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => timeoutHandler(_value), delay)
        } else if (_value === initialValue) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            setValue(_value)
        }
    }, [value, setValue, delay, timeoutHandler, initialValue])

    return [value, setDebouncedState]
}