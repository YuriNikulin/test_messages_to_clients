import { LOCAL_STORAGE_TOKEN_KEY } from "constants/common"
import { Storage } from "./localStorage"

export const saveToken = (token: string) => {
    Storage.save(LOCAL_STORAGE_TOKEN_KEY, token)
}