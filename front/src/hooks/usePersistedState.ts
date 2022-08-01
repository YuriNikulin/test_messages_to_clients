import { useEffect, useState } from "react"
import { StorageType } from "types"
import { Storage } from "utils/localStorage"

const usePersistedState = <V extends any = any>(defaultValue: any, config: {
    storageType: StorageType,
    storageKey: string
}) => {
    const [value, setValue] = useState<V>(Storage.get(
        config.storageKey,
        { storageType: config.storageType }
    ) || defaultValue)

    useEffect(() => {
        Storage.save(config.storageKey, value, { storageType: config.storageType })
    }, [value, config])

    return [value, setValue] as [V, typeof setValue]
}

export { usePersistedState }