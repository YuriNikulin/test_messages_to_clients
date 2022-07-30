import { useState } from 'react'

export const useAuth = () => {
    const [state, setState] = useState({
        isLogged: false,
        user: null
    })

    return {
        isLogged: state.isLogged
    }
}