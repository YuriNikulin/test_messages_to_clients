import { Auth } from './Auth'
import { Router } from './Router'

const Root: FunctionComponent = (props) => {
    return (
        <Auth>
            <Router />
        </Auth>
    )
}

export { Root }