import { Sidebar } from "components/sidebar"
import { routes } from "constants/routes"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const Layout: FunctionComponent = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!children) {
            navigate(routes.channels.path)
        }
    }, [])

    return (
        <div>
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export { Layout }