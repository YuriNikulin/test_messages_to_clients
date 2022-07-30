import { useAuth } from "hooks/useAuth"
import { Login } from 'pages/login'

const Auth: FunctionComponent = ({ children }) => {
    const { isLogged } = useAuth()
    return (
        <div>
            {isLogged ? children : <Login />}
        </div>
    )
}

export { Auth }