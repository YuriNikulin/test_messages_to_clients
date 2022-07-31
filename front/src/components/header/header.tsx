import { Button, Divider } from "@blueprintjs/core"
import { useAuth } from "containers/Auth"

const Header: FunctionComponent  = () => {
    const { user, unauthorize } = useAuth()
    return (
        <header className="header">
            <div className="flex flex-grow-1 justify-end">
                {user && 
                    <div className="flex align-center">
                        <span>
                            Вы авторизованы как <strong>{user.login}</strong>
                        </span>
                        <Divider className="align-self-stretch mhor-2"/>
                        <Button intent="danger" onClick={unauthorize}>
                            Выйти
                        </Button>
                    </div>
                }
            </div>
        </header>
    )
}

export { Header }