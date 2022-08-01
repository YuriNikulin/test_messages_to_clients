import { Sidebar } from "components/sidebar"
import { routes } from "constants/routes"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Header } from "components/header"

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
            <div className="container">
                <Header />
                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export { Layout }